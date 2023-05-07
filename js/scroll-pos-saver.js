// Store the current scroll position in localStorage when the page is about to be unloaded
window.addEventListener('beforeunload', function() {
  localStorage.setItem('scrollPosition', window.pageYOffset);
});

// Retrieve and set the stored scroll position when the new page loads
window.addEventListener('load', function() {
  document.body.style.visibility = "visible";
  var scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition !== null) {
      // Set the scroll position immediately on page load
      window.scrollTo(0, scrollPosition);
      // Remove the stored scroll position
      localStorage.removeItem('scrollPosition');
  }
});

// Get the video element
var videoElement = document.querySelector("header video");

// Store the current playback time in localStorage when the page is about to be unloaded
window.addEventListener('beforeunload', function() {
  localStorage.setItem('videoPlaybackTime', videoElement.currentTime);
});

// Retrieve and set the stored playback time when the new page loads
window.addEventListener('load', function() {
  var videoPlaybackTime = localStorage.getItem('videoPlaybackTime');
  if (videoPlaybackTime !== null) {
      // Set the playback time immediately on page load
      videoElement.currentTime = videoPlaybackTime;
      // Remove the stored playback time
      localStorage.removeItem('videoPlaybackTime');
  }
});

// Get the video element
var videoElement = document.querySelector(".shop-row video.video-background");

// Store the current playback time in localStorage when the page is about to be unloaded
window.addEventListener('beforeunload', function() {
  localStorage.setItem('videoPlaybackTime', videoElement.currentTime);
});

// Retrieve and set the stored playback time when the new page loads
window.addEventListener('load', function() {
  var videoPlaybackTime = localStorage.getItem('videoPlaybackTime');
  if (videoPlaybackTime !== null) {
      // Set the playback time immediately on page load
      videoElement.currentTime = videoPlaybackTime;
      // Remove the stored playback time
      localStorage.removeItem('videoPlaybackTime');
  }
});