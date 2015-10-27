var iframeElement = document.querySelector('iframe#soundcloudPlayer');
var iframeElementPreview = document.querySelector('iframe#soundcloudPreviewPlayer');
var soundcloudPlayer = SC.Widget(iframeElement);
var soundcloudPreviewPlayer = SC.Widget(iframeElementPreview);
soundcloudPlayer.initialized = false;
soundcloudPreviewPlayer.initialized = false;

soundcloudPlayer.bind(SC.Widget.Events.READY, function() {
  soundcloudPlayer.initialized = true;
  if(Cookies.get('playerOpen') && Cookies.get('playerOpen') === "true" && roomVM.room().currentMusic() && roomVM.room().currentMusic().source() === "soundcloud") {
    roomVM.openPlayer();
  }
});
soundcloudPreviewPlayer.bind(SC.Widget.Events.READY, function() {
  soundcloudPreviewPlayer.initialized = true;
});

soundcloudPlayer.bind(SC.Widget.Events.ERROR, function() {
  console.error("Soundcloud error occured");
});
soundcloudPreviewPlayer.bind(SC.Widget.Events.ERROR, function() {
  console.error("Soundcloud error occured");
});

var soundcloudPlayerControl = {
  play: function(options) {
    if(soundcloudPlayer.initialized) {
      $('#wrapper-soundcloud-player').stop().fadeIn(250);
      soundcloudPlayer.bind(SC.Widget.Events.PLAY, function() {
        soundcloudPlayer.seekTo(options.timer_start * 1000 || 0);
        soundcloudPlayer.unbind(SC.Widget.Events.PLAY);
      });
      soundcloudPlayer.load(
        'https://api.soundcloud.com/tracks/' + options.music_id,
        {
          buying: false,
          visual: true,
          hide_related: true,
          auto_play: true,
          callback: function() {
            soundcloudPlayer.setVolume(Cookies.get('volumePlayer') / 100);
          },
        }
        );
    }
  },
  stop: function() {
    if(soundcloudPlayer.initialized) {
      soundcloudPlayer.pause();
      $('#wrapper-soundcloud-player').stop().fadeOut(250);
    }
  },
  volumeUp: function() {
    if(soundcloudPlayer.initialized) {
      soundcloudPlayer.getVolume(function(volume) {
        soundcloudPlayer.setVolume(Math.min(volume + 0.1, 1));
      });
    }
  },
  volumeDown: function() {
    if(soundcloudPlayer.initialized) {
      soundcloudPlayer.getVolume(function(volume) {
        soundcloudPlayer.setVolume(Math.max(volume - 0.1, 0));
      });
    }
  },
  setVolume: function(volume) {
    if(soundcloudPlayer.initialized) {
      soundcloudPlayer.setVolume(volume / 100);
    }
  },
};

var soundcloudPlayerPreviewControl = {
  play: function(options) {
    if(soundcloudPreviewPlayer.initialized) {
      soundcloudPreviewPlayer.load(
        'https://api.soundcloud.com/tracks/' + options.music_id,
        {
          buying: false,
          visual: true,
          hide_related: true,
        }
      );
    }
  },
  stop: function() {
    if(soundcloudPreviewPlayer.initialized) {
      soundcloudPreviewPlayer.pause();
    }
  },
  seekTo: function(options) {
    if(soundcloudPreviewPlayer.initialized) {
      soundcloudPreviewPlayer.seekTo(options.secondes * 1000);
    }
  },
  getState: function() {
    return 1;
  }
};
