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

    // Перевірка підтримки відео та продуктивності пристрою
    function shouldLoadVideo() {
        // Перевірка на дуже слабкий пристрій
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 2) return false;

        // Перевірка на дуже повільне з'єднання
        if (navigator.connection) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g') {
                return false;
            }

            // Перевірка на обмежений трафік
            if (connection.saveData) return false;
        }

        // Перевірка на зменшену анімацію
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

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

// Preload критичних ресурсів
document.addEventListener('DOMContentLoaded', function () {
    // Визначаємо яке відео потрібно завантажити на основі поточної сторінки
    const currentPath = window.location.pathname;
    const isMobile = window.innerWidth <= 768;
    let videoSrc = '';

    if (currentPath === '/' || currentPath === '/home/') {
        videoSrc = isMobile ? '/static/video/mainmobile.mp4' : '/static/video/main.mp4';
    } else if (currentPath === '/portfolio/') {
        videoSrc = isMobile ? '/static/video/portfoliomobile.mp4' : '/static/video/portfolio.mp4';
    } else if (currentPath === '/prices/') {
        videoSrc = isMobile ? '/static/video/pricemobile.mp4' : '/static/video/price.mp4';
    } else if (currentPath === '/education/') {
        videoSrc = isMobile ? '/static/video/studymobile.mp4' : '/static/video/study.mp4';
    } else if (currentPath === '/blog/') {
        videoSrc = isMobile ? '/static/video/blogmobile.mp4' : '/static/video/blog.mp4';
    } else if (currentPath === '/faq/') {
        videoSrc = isMobile ? '/static/video/faqmobile.mp4' : '/static/video/faq.mp4';
    } else if (currentPath === '/contacts/') {
        videoSrc = isMobile ? '/static/video/contactsmobile.mp4' : '/static/video/contacts.mp4';
    }

    if (videoSrc) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = videoSrc;
        link.type = 'video/mp4';
        document.head.appendChild(link);
    }
}); 