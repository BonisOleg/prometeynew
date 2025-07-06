// Простий тест для мобільних відео
document.addEventListener('DOMContentLoaded', function () {
    console.log('Тест мобільних відео запущено');

    const isMobile = window.innerWidth <= 768;
    console.log('Це мобільний пристрій:', isMobile);

    const allVideos = document.querySelectorAll('.section-video');
    console.log('Всього відео знайдено:', allVideos.length);

    const mobileVideos = document.querySelectorAll('.mobile-video');
    console.log('Мобільних відео знайдено:', mobileVideos.length);

    const desktopVideos = document.querySelectorAll('.desktop-video');
    console.log('Десктопних відео знайдено:', desktopVideos.length);

    mobileVideos.forEach((video, index) => {
        console.log(`Мобільне відео ${index + 1}:`, {
            display: getComputedStyle(video).display,
            src: video.querySelector('source')?.src,
            readyState: video.readyState,
            paused: video.paused
        });

        // Спробуємо запустити відео
        if (isMobile) {
            video.play().then(() => {
                console.log(`Мобільне відео ${index + 1} успішно запущено`);
            }).catch(e => {
                console.error(`Помилка запуску мобільного відео ${index + 1}:`, e);
            });
        }
    });

    desktopVideos.forEach((video, index) => {
        console.log(`Десктопне відео ${index + 1}:`, {
            display: getComputedStyle(video).display,
            src: video.querySelector('source')?.src
        });
    });
}); 