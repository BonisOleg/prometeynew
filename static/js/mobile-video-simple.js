// Максимально простий скрипт для мобільних відео
document.addEventListener('DOMContentLoaded', function () {
    console.log('🎬 Простий тест мобільних відео запущено');

    const isMobile = window.innerWidth <= 768;
    console.log('📱 Це мобільний пристрій:', isMobile);
    console.log('📐 Ширина екрану:', window.innerWidth);

    // Знаходимо всі відео
    const allVideos = document.querySelectorAll('video');
    console.log('🎥 Всього відео знайдено:', allVideos.length);

    allVideos.forEach((video, index) => {
        const isDesktop = video.classList.contains('desktop-video');
        const isMobileVideo = video.classList.contains('mobile-video');

        console.log(`Відео ${index + 1}:`, {
            desktop: isDesktop,
            mobile: isMobileVideo,
            display: getComputedStyle(video).display,
            src: video.querySelector('source')?.src || 'немає src'
        });

        // Простий тест відтворення
        if (isMobile && isMobileVideo) {
            console.log(`🎯 Спробуємо запустити мобільне відео ${index + 1}`);
            video.load();
            video.play().then(() => {
                console.log(`✅ Мобільне відео ${index + 1} запущено успішно!`);
            }).catch(error => {
                console.error(`❌ Помилка мобільного відео ${index + 1}:`, error);
            });
        } else if (!isMobile && isDesktop) {
            console.log(`🖥️ Спробуємо запустити десктопне відео ${index + 1}`);
            video.load();
            video.play().then(() => {
                console.log(`✅ Десктопне відео ${index + 1} запущено успішно!`);
            }).catch(error => {
                console.error(`❌ Помилка десктопного відео ${index + 1}:`, error);
            });
        }
    });

    // Показуємо інформацію про CSS
    const mobileVideos = document.querySelectorAll('.mobile-video');
    const desktopVideos = document.querySelectorAll('.desktop-video');

    console.log('📊 Статистика:');
    console.log('- Мобільних відео:', mobileVideos.length);
    console.log('- Десктопних відео:', desktopVideos.length);

    if (isMobile) {
        console.log('📱 Мобільний режим - перевіряємо CSS:');
        mobileVideos.forEach((video, i) => {
            console.log(`  Мобільне відео ${i + 1} display:`, getComputedStyle(video).display);
        });
        desktopVideos.forEach((video, i) => {
            console.log(`  Десктопне відео ${i + 1} display:`, getComputedStyle(video).display);
        });
    }
}); 