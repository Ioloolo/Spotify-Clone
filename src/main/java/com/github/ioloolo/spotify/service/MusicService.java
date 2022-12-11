package com.github.ioloolo.spotify.service;

import com.github.ioloolo.spotify.model.MusicModel;
import com.github.kiulian.downloader.YoutubeDownloader;
import com.github.kiulian.downloader.downloader.request.RequestSearchResult;
import com.github.kiulian.downloader.downloader.request.RequestVideoFileDownload;
import com.github.kiulian.downloader.downloader.request.RequestVideoInfo;
import com.github.kiulian.downloader.model.search.SearchResult;
import com.github.kiulian.downloader.model.videos.VideoInfo;
import com.github.kiulian.downloader.model.videos.formats.AudioFormat;
import kong.unirest.Unirest;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

@Component
@Slf4j
public class MusicService {
    static {
        Unirest.config()
                .defaultBaseUrl("https://shazam-core.p.rapidapi.com/v1")
                .addDefaultHeader("X-RapidAPI-Key", "c06fc61cbbmsha1e16c143a66792p10445bjsn7aa128d7ce16")
                .addDefaultHeader("X-RapidAPI-Host", "shazam-core.p.rapidapi.com");

        log.info("[Service] Set Shazam API Header");
    }

    public ResponseEntity<Object> search(String query) {
        ArrayList<MusicModel> musicList = new ArrayList<>() {{
            JSONArray tracks = Unirest
                    .get(String.format("/search/multi?search_type=SONGS&query=%s", query))
                    .asJson()
                    .getBody()
                    .getObject()
                    .getJSONObject("tracks")
                    .getJSONArray("hits");

            tracks.forEach(o -> {
                JSONObject track = ((JSONObject) o).getJSONObject("track");

                MusicModel music = new MusicModel();
                music.setKey(track.getString("key"));
                music.setTitle(track.getString("title"));
                music.setSubtitle(track.getString("subtitle"));
                music.setAlbumPhotoUrl(track.getJSONObject("images").getString("coverart"));

                add(music);
            });
        }};

        return new ResponseEntity<>(musicList, HttpStatus.OK);
    }

    public ResponseEntity<Object> chart() {
        ArrayList<MusicModel> musicList = new ArrayList<>() {{
            JSONArray tracks = Unirest
                    .get("/charts/country?country_code=KR")
                    .asJson()
                    .getBody()
                    .getArray();

            log.warn(tracks.toString());

            tracks.forEach(o -> {
                JSONObject track = (JSONObject) o;

                MusicModel music = new MusicModel();
                music.setKey(track.getString("key"));
                music.setTitle(track.getString("title"));
                music.setSubtitle(track.getString("subtitle"));
                music.setAlbumPhotoUrl(track.getJSONObject("images").getString("coverart"));

                add(music);
            });
        }};

        return new ResponseEntity<>(musicList, HttpStatus.OK);
    }

    @SneakyThrows
    public ResponseEntity<Object> audio(String key) {
        Optional<File> exist = Arrays.stream(new File("./audio").listFiles())
                .filter(file -> file.getName().startsWith(key))
                .findFirst();

        if (exist.isEmpty()) {
            JSONObject info = Unirest
                    .get(String.format("/tracks/details?track_id=%s", key))
                    .asJson()
                    .getBody()
                    .getObject();

            String title = info.getString("title");
            String subtitle = info.getString("subtitle");

            YoutubeDownloader downloader = new YoutubeDownloader();

            RequestSearchResult request1 = new RequestSearchResult(title + " " + subtitle + " lyrics");
            SearchResult searchResult = downloader.search(request1).data();

            for (int i = 0; i < 10; i++) {
                try {
                    String videoId = searchResult.videos().get(i).videoId();

                    RequestVideoInfo request2 = new RequestVideoInfo(videoId);
                    VideoInfo videoInfo = downloader.getVideoInfo(request2).data();
                    AudioFormat audioFormat = videoInfo.bestAudioFormat();

                    RequestVideoFileDownload request3 = new RequestVideoFileDownload(audioFormat)
                            .saveTo(new File("./audio"))
                            .renameTo(key)
                            .overwriteIfExists(true);

                    downloader.downloadVideoFile(request3);

                    log.info(String.format("[Service] Download audio file. (%s)", title));

                    break;
                } catch (Throwable ignored) {}
            }
        }

        File file = Arrays.stream(new File("./audio").listFiles())
                .filter(f -> f.getName().startsWith(key))
                .findFirst()
                .get();

        String result = "";
        try (FileInputStream fis = new FileInputStream(file); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            int len;
            byte[] buf = new byte[1024];

            while ((len = fis.read(buf)) != -1)
                baos.write(buf, 0, len);

            result = new String(Base64.getEncoder().encode(baos.toByteArray()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
