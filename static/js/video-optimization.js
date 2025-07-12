// Оптимізація відео для максимальної продуктивності
document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('.section-video');

    if (!videos.length) return;

    videos.forEach(video => {
        initVideoOptimization(video);
    });
});

function initVideoOptimization(video) {
    const isMobile = window.innerWidth <= 768;

    // Спрощена перевірка завантаження відео
    function shouldLoadVideo() {
        // Перевірка на зменшену анімацію
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
        
        // Перевірка на обмежений трафік
        if (navigator.connection && navigator.connection.saveData) return false;

        return true;
    }

    // Перевірка чи це правильне відео для поточного пристрою
    function isCorrectVideoForDevice() {
        const isDesktopVideo = video.classList.contains('desktop-video');
        const isMobileVideo = video.classList.contains('mobile-video');

        if (isMobile && isDesktopVideo) return false;
        if (!isMobile && isMobileVideo) return false;

        return true;
    }

    // Якщо це не правильне відео для пристрою, приховуємо його
    if (!isCorrectVideoForDevice()) {
        video.style.display = 'none';
        return;
    }

    // Ледаче завантаження відео
    function lazyLoadVideo() {
        if (!shouldLoadVideo()) {
            video.style.display = 'none';
            return;
        }

        // Intersection Observer для завантаження тільки коли відео видиме
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const videoElement = entry.target;

                    // Завантажуємо відео тільки коли воно в viewport
                    if (videoElement.readyState === 0) {
                        videoElement.load();
                    }

                    // Відтворюємо відео з затримкою для плавності
                    setTimeout(() => {
                        videoElement.play().catch(e => {
                            console.log('Відео не може бути відтворено:', e);
                        });
                    }, isMobile ? 200 : 100);

                    observer.unobserve(videoElement);
                }
            });
        }, {
            rootMargin: isMobile ? '100px' : '50px'
        });

        observer.observe(video);
    }

    // Оптимізація відтворення
    video.addEventListener('loadedmetadata', function () {
        // Встановлюємо низьку якість для початку тільки для великих відео
        if (!isMobile && video.videoWidth > 1920) {
            video.style.filter = 'blur(1px)';
            setTimeout(() => {
                video.style.filter = 'none';
                video.style.transition = 'filter 0.3s ease';
            }, 1000);
        }
    });

    // Призупинити відео коли воно не видиме
    const pauseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                video.pause();
            } else if (shouldLoadVideo()) {
                video.play().catch(e => console.log('Не вдалося відтворити відео'));
            }
        });
    });

    pauseObserver.observe(video);

    // Призупинити відео при втраті фокусу
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            video.pause();
        } else if (shouldLoadVideo()) {
            video.play().catch(e => console.log('Не вдалося відтворити відео'));
        }
    });

    // Ініціалізація
    lazyLoadVideo();
}

