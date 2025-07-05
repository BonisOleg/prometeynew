// Sticky Scroll Navigation JavaScript
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Ініціалізація sticky scroll
    initStickyScroll();

    function initStickyScroll() {
        const sections = document.querySelectorAll('.page-section');
        const container = document.querySelector('.page-container');

        if (!sections.length || !container) return;

        setupSectionObserver();
        setupScrollAnimations();
        setupParallaxEffects();
        setupSectionTransitions();
    }

    // Спостерігач за секціями
    function setupSectionObserver() {
        const sections = document.querySelectorAll('.page-section');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0.1, 0.5, 0.9]
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const section = entry.target;
                const sectionId = section.dataset.sectionId;

                if (entry.isIntersecting) {
                    // Додаємо клас для активної секції
                    section.classList.add('section-active');

                    // Оновлюємо навігацію якщо є
                    updateNavigationState(sectionId);

                    // Запускаємо анімації для контенту
                    animateContent(section);
                } else {
                    section.classList.remove('section-active');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Анімації для контенту
    function animateContent(section) {
        const content = section.querySelector('.section-content');
        if (!content) return;

        // Затримка для плавної анімації
        setTimeout(() => {
            content.classList.add('animate-in');

            // Анімуємо дочірні елементи з затримкою
            const childElements = content.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .content-title, .content-subtitle, .content-body');
            childElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('fade-in');
                }, index * 100);
            });
        }, 200);
    }

    // Оновлення стану навігації
    function updateNavigationState(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Знаходимо відповідний навігаційний елемент
        const currentLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }

    // Анімації скролу
    function setupScrollAnimations() {
        let ticking = false;

        function updateScrollAnimations() {
            const scrollTop = window.pageYOffset;
            const sections = document.querySelectorAll('.page-section');

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const progress = Math.max(0, Math.min(1, (scrollTop - sectionTop) / sectionHeight));

                // Оновлюємо CSS змінні для анімацій
                section.style.setProperty('--scroll-progress', progress);

                // Паралакс ефект для фону
                const background = section.querySelector('.section-background');
                if (background) {
                    const parallaxSpeed = 0.5;
                    const yPos = -(progress * 100 * parallaxSpeed);
                    background.style.transform = `translateY(${yPos}px)`;
                }
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        });
    }

    // Паралакс ефекти
    function setupParallaxEffects() {
        const sections = document.querySelectorAll('.page-section');

        sections.forEach(section => {
            const background = section.querySelector('.section-background');
            if (background) {
                // Додаємо data-атрибут для паралакс швидкості
                background.dataset.parallaxSpeed = '0.5';
            }
        });
    }

    // Переходи між секціями
    function setupSectionTransitions() {
        const sections = document.querySelectorAll('.page-section');

        sections.forEach((section, index) => {
            // Додаємо обробники для hover ефектів
            section.addEventListener('mouseenter', () => {
                section.classList.add('section-hover');
            });

            section.addEventListener('mouseleave', () => {
                section.classList.remove('section-hover');
            });

            // Обробка кліку по секції
            section.addEventListener('click', (e) => {
                if (e.target.closest('a, button, input')) return;

                // Плавний скрол до наступної секції
                const nextSection = sections[index + 1];
                if (nextSection) {
                    nextSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Утиліти для scroll
    const scrollUtils = {
        // Плавний скрол до елемента
        scrollToElement: function (element, offset = 0) {
            if (!element) return;

            const elementTop = element.offsetTop - offset;
            window.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
        },

        // Отримання поточної позиції скролу
        getScrollPosition: function () {
            return window.pageYOffset || document.documentElement.scrollTop;
        },

        // Перевірка чи елемент у viewport
        isInViewport: function (element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Відсоток прокрутки сторінки
        getScrollPercentage: function () {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            return (scrollTop / docHeight) * 100;
        }
    };

    // Експортуємо утиліти для використання в інших скриптах
    window.scrollUtils = scrollUtils;

    // Обробка зміни розміру вікна
    window.addEventListener('resize', window.utils?.debounce(() => {
        // Перерахунок позицій секцій
        const sections = document.querySelectorAll('.page-section');
        sections.forEach(section => {
            // Оновлюємо висоту секції
            section.style.height = '100vh';
        });
    }, 300));

    // Обробка зміни орієнтації на мобільних
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Оновлюємо висоту секцій після зміни орієнтації
            const sections = document.querySelectorAll('.page-section');
            sections.forEach(section => {
                section.style.height = '100vh';
            });
        }, 500);
    });

    // Покращена підтримка для iOS Safari
    if (navigator.userAgent.match(/iPad|iPhone|iPod/)) {
        // Виправлення для viewport одиниць
        function updateViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        updateViewportHeight();
        window.addEventListener('resize', updateViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(updateViewportHeight, 500);
        });
    }

    // Додаємо CSS анімації динамічно
    const style = document.createElement('style');
    style.textContent = `
        .section-content.animate-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section-hover .section-shadow {
            opacity: 0.1;
        }
        
        .section-active .section-content {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Покращена плавність для мобільних */
        @media (max-width: 768px) {
            .page-section {
                height: 100vh;
                height: calc(var(--vh, 1vh) * 100);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Sticky Scroll ініціалізовано');
}); 