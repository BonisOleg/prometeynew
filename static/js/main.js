// Основний JavaScript файл
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Ініціалізація основних компонентів
    initializeApp();

    function initializeApp() {
        // Додаємо клас для JavaScript активності
        document.body.classList.add('js-enabled');

        // Ініціалізуємо компоненти
        setupLazyLoading();
        setupSmoothScroll();
        setupPreloader();
        setupPerformanceOptimization();
        setupAccessibility();
        setupScrollNavigation();
        setupViewportFix();

        // Відмічаємо що сторінка завантажилась
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100);
    }

    // Lazy loading для зображень
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Плавний скрол
    function setupSmoothScroll() {
        // Відключаємо стандартний скрол для внутрішніх посилань
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Прелоадер
    function setupPreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            });
        }
    }

    // Оптимізація продуктивності
    function setupPerformanceOptimization() {
        // Throttle функція для оптимізації подій
        function throttle(func, limit) {
            let inThrottle;
            return function () {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }

        // Debounce функція для оптимізації подій
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };

        // Експортуємо функції для використання в інших скриптах
        window.utils = {
            throttle: throttle,
            debounce: debounce
        };

        // Оптимізуємо scroll події
        let ticking = false;
        function updateScrollPosition() {
            // Оновлюємо позицію скролу
            document.documentElement.style.setProperty('--scroll-top', window.pageYOffset + 'px');
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        });
    }

    // Доступність
    function setupAccessibility() {
        // Обробка клавіатурної навігації
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', function () {
            document.body.classList.remove('keyboard-navigation');
        });

        // Показуємо skip link для користувачів з клавіатурою
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.focus();
                }
            });
        }
    }

    // Навігація при скролі
    function setupScrollNavigation() {
        const navigation = document.querySelector('.main-navigation');
        let isScrolled = false;

        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const shouldBeScrolled = scrollTop > 50;

            if (shouldBeScrolled && !isScrolled) {
                navigation.classList.add('scrolled');
                isScrolled = true;
            } else if (!shouldBeScrolled && isScrolled) {
                navigation.classList.remove('scrolled');
                isScrolled = false;
            }
        }

        // Використовуємо throttle для оптимізації
        const throttledHandleScroll = window.utils ? window.utils.throttle(handleScroll, 16) : handleScroll;

        window.addEventListener('scroll', throttledHandleScroll);

        // Перевіряємо початкову позицію
        handleScroll();
    }

    // Фікс для iOS Safari viewport
    function setupViewportFix() {
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setViewportHeight();

        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });
    }

    // Утиліти для роботи з localStorage
    const storage = {
        set: function (key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('LocalStorage не доступний:', e);
            }
        },
        get: function (key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.warn('Помилка читання з LocalStorage:', e);
                return null;
            }
        },
        remove: function (key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.warn('Помилка видалення з LocalStorage:', e);
            }
        }
    };

    // Експортуємо storage для використання в інших скриптах
    window.storage = storage;

    // Обробка помилок
    window.addEventListener('error', function (e) {
        console.error('JavaScript помилка:', e.error);
        // Можна додати відправку помилок на сервер
    });

    // Обробка нерозпізнаних промісів
    window.addEventListener('unhandledrejection', function (e) {
        console.error('Необроблена помилка Promise:', e.reason);
        // Можна додати відправку помилок на сервер
    });

    // Перевірка підтримки Service Worker
    if ('serviceWorker' in navigator) {
        // Можна додати реєстрацію Service Worker для кешування
        console.log('Service Worker підтримується');
    }

    // Перевірка підтримки Web Vitals
    if (window.performance && window.performance.getEntriesByType) {
        // Можна додати метрики продуктивності
        console.log('Web Vitals підтримуються');
    }

    // Повідомляємо що скрипт завантажився
    console.log('Prometey App ініціалізовано');
});

// Експортуємо основні функції для глобального використання
window.PrometeyApp = {
    version: '1.0.0',
    initialized: true
}; 