package com.github.ioloolo.spotify.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MusicModel {
    private String key;
    private String title;
    private String subtitle;
    private String albumPhotoUrl;
}
