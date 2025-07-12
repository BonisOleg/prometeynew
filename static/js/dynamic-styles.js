// Застосування динамічних стилів через data атрибути
document.addEventListener('DOMContentLoaded', function () {
    // Застосовуємо кольори фону та тексту для секцій
    const sections = document.querySelectorAll('.page-section[data-bg-color], .page-section[data-text-color]');

    sections.forEach(section => {
        const bgColor = section.getAttribute('data-bg-color');
        const textColor = section.getAttribute('data-text-color');

        if (bgColor) {
            section.style.setProperty('--bg-color', bgColor);
        }

        if (textColor) {
            section.style.setProperty('--text-color', textColor);
            section.style.color = textColor;
        }
    });

    // Застосовуємо кольори фону для section-background
    const backgrounds = document.querySelectorAll('.section-background[data-bg-color]');

    backgrounds.forEach(bg => {
        const bgColor = bg.getAttribute('data-bg-color');
        if (bgColor) {
            bg.style.backgroundColor = bgColor;
        }
    });

    console.log('✅ Динамічні стилі застосовано для', sections.length, 'секцій');
}); 