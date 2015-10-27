// MODEL DEFINITION
// Music model
function Music(data) {
  this.pk = ko.observable(data.pk);
  this.music_id = ko.observable(data.music_id);
  this.name = ko.observable(data.name);
  this.thumbnail = ko.observable(data.thumbnail);
  this.count = ko.observable(data.count || data.views);
  this.duration = ko.observable(data.duration);
  this.timer_start = ko.observable(data.timer_start);
  this.timer_end = ko.observable(data.timer_end);
  this.url = ko.observable(data.url);
  this.room_id = ko.observable(data.room_id);
  this.source = ko.observable(data.source);
  this.channel_name = ko.observable(data.channel_name);
  this.description = ko.observable(data.description);
}
// Playlist model
function PlaylistTrack(data) {
  this.pk = ko.observable(data.pk);
  this.order = ko.observable(data.order);
  this.music = ko.observable(new Music(data.music));
}
// Room model
function Room(data) {
  this.name = ko.observable(data.name);
  this.currentMusic = ko.observable(data.current_music ? new Music(data.current_music) : null);
  this.shuffle = ko.observable(data.shuffle);
  this.can_adjust_volume = ko.observable(data.can_adjust_volume);
  this.count_left = ko.observable(data.count_left);
  this.time_left = ko.observable(data.time_left);
  this.current_time_left = ko.observable(data.current_time_left);
  this.current_time_past = ko.observable(data.current_time_past);
  this.current_time_past_percent = ko.observable(data.current_time_past_percent);
}
// Source model
function Source(data) {
  this.name = ko.observable(data.capitalize());
}
