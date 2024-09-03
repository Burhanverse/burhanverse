document.addEventListener('DOMContentLoaded', function() {
    var music = document.getElementById('backgroundMusic');
    var controlBtn = document.getElementById('musicControlBtn');
    // Autoplay music
    music.play();
    // Update button to show the "pause" icon
    controlBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>'; // Pause icon

    controlBtn.addEventListener('click', function() {
        if (music.paused) {
            music.play();
            // Change button to show the "pause" icon
            this.innerHTML = '<i class="fa-regular fa-circle-pause"></i>'; // Pause icon
        } else {
            music.pause();
            // Change button to show the "play" icon
            this.innerHTML = '<i class="fa-regular fa-circle-play"></i>'; // Play icon
        }
    });
});
