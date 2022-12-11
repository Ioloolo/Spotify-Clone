package com.github.ioloolo.spotify.controller;

import com.github.ioloolo.spotify.service.MusicService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@Slf4j
@RequestMapping(path = "/api/music")
public class MusicController {

    private final  MusicService musicService;

    @GetMapping(path = "/search")
    public ResponseEntity<Object> search(
            @RequestParam String query) {

        log.info(String.format("[Controller] search with query(%s)", query));

        return musicService.search(query);
    }

    @GetMapping(path = "/chart")
    public ResponseEntity<Object> chart() {
        log.info("[Controller] getChart");

        return musicService.chart();
    }

    @GetMapping(path = "/audio")
    public ResponseEntity<Object> audio(
            @RequestParam String key) {

        log.info(String.format("[Controller] getAudio with key(%s)", key));

        return musicService.audio(key);
    }
}
