import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const Player = ({ activeSong, isPlaying, volume, seekTime, handlePlaying, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const [url, setUrl] = useState('');

  const ref = useRef(null);
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  useEffect(() => {
    (async () => {
      handlePlaying(false);

      const response = await axios.get(`http://localhost/api/music/audio?key=${activeSong.key}`);
      const b64 = response.data;

      const blobData = atob(b64);

      const arrayBuffer = new ArrayBuffer(blobData.length);
      const view = new Uint8Array(arrayBuffer);

      for (let i = 0; i < blobData.length; i++) {
        view[i] = blobData.charCodeAt(i) & 0xff;
      }

      const blob = new Blob([arrayBuffer], { type: 'audio/mp4' });

      setUrl(URL.createObjectURL(blob));
      handlePlaying(true);
    })();
  }, [activeSong]);

  return (
  // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio
      src={url}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
