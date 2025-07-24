document.addEventListener('DOMContentLoaded', function () {
    let isTerminalDone = false;
    const audio = document.getElementById('myAudio');
    const video = document.getElementById('myVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const randomBtn = document.getElementById('randomBtn');

    let isPlaying = false;
    let isMuted = false;
    let previousVolume = 1;
    let currentMediaIndex = -1;

    const mediaPairs = [
        { video: "./assets/back/default.mp4", audio: "./assets/music/song1.mp3" },
        { video: "./assets/back/video2.mp4", audio: "./assets/music/song3.mp3" }
    ];

    function updatePlayButton() {
        const icon = playPauseBtn.querySelector('i');
        icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }

    function updateMuteButton() {
        const icon = muteBtn.querySelector('i');
        if (isMuted || audio.volume === 0) {
            icon.className = 'fas fa-volume-mute';
        } else if (audio.volume < 0.5) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
    }

    function playRandomSong(forcePlay = false) {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * mediaPairs.length);
    } while (randomIndex === currentMediaIndex && mediaPairs.length > 1);

    currentMediaIndex = randomIndex;
    const selected = mediaPairs[randomIndex];
    const wasPlaying = !audio.paused;
    const currentVolume = audio.volume;

    // Cập nhật video
    video.innerHTML = `<source src="${selected.video}" type="video/mp4">`;
    video.load();
    video.loop = true;

    // Cập nhật audio
    if (selected.audio) {
        audio.innerHTML = `<source src="${selected.audio}" type="audio/mpeg">`;
        audio.load();
        audio.volume = currentVolume;
        audio.loop = true;
    } else {
        audio.pause();
        audio.innerHTML = "";
    }

    // Phát nếu cần
    if (wasPlaying || forcePlay) {
        video.play().catch(err => console.error("Video play error:", err));
        if (selected.audio) {
            audio.play().catch(err => console.error("Audio play error:", err));
        }
    }

    // Nút hiệu ứng
    if (randomBtn) {
        randomBtn.style.transform = 'scale(0.9)';
        setTimeout(() => randomBtn.style.transform = 'scale(1)', 150);
    }
}


    playPauseBtn.addEventListener('click', function () {
        if (isPlaying) {
            audio.pause();
            video.pause();
        } else {
            audio.play().catch(err => console.error("Audio play failed:", err));
            video.play().catch(err => console.error("Video play failed:", err));
        }
    });

    muteBtn.addEventListener('click', function () {
        if (isMuted) {
            audio.volume = previousVolume;
            volumeSlider.value = previousVolume * 100;
            isMuted = false;
        } else {
            previousVolume = audio.volume;
            audio.volume = 0;
            volumeSlider.value = 0;
            isMuted = true;
        }
        updateMuteButton();
    });

    volumeSlider.addEventListener('input', function () {
        const volume = this.value / 100;
        audio.volume = volume;
        isMuted = volume === 0;
        if (!isMuted) previousVolume = volume;
        updateMuteButton();
    });

    audio.addEventListener('volumechange', function () {
        volumeSlider.value = audio.volume * 100;
        updateMuteButton();
    });

    randomBtn.addEventListener('click', function () {
        playRandomSong(true);
    });

    audio.addEventListener('play', function () {
        isPlaying = true;
        updatePlayButton();
    });

    audio.addEventListener('pause', function () {
        isPlaying = false;
        updatePlayButton();
    });

    audio.addEventListener('ended', function () {
        playRandomSong(true);
    });

    // Hàm gọi từ script.js nếu cần
    window.startMusicWithRandom = function () {
        playRandomSong(true);
    };

    // Khởi tạo nút ban đầu
    setTimeout(() => {
        isPlaying = !audio.paused;
        updatePlayButton();
        updateMuteButton();
        audio.volume = volumeSlider.value / 100;
    }, 500);

    // Toggle buttons logic
const toggleIcon = document.getElementById('toggleIcon');
let currentMode = 'music';

function switchToImageMode() {
  currentMode = 'image';
  video.innerHTML = `<source src="./assets/back/maomao.mp4" type="video/mp4">`;
  video.load();
  video.loop = true;
  video.play().catch(err => console.error("Video play error:", err));
  audio.pause();
  audio.innerHTML = "";
  toggleIcon.className = "fa-solid fa-video";
}

function switchToMusicMode() {
  currentMode = 'music';
  playRandomSong(true);
  toggleIcon.className = "fa-solid fa-image";
}

toggleIcon.addEventListener('click', function () {
  if (currentMode === 'music') {
    switchToImageMode();
  } else {
    switchToMusicMode();
  }
});

window.showMediaToggle = function () {
  const toggleBtn = document.getElementById('media-toggle-buttons');
  if (toggleBtn) toggleBtn.style.display = 'block';
};
});