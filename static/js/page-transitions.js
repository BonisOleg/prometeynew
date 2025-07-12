// Слайд переходи між сторінками
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // --- ДОДАНО: Прибрати overlay одразу після завантаження сторінки ---
    const overlay = document.querySelector('.page-overlay');
    const body = document.body;
    if (overlay) {
        overlay.classList.remove('active', 'fade-out');
        overlay.style.display = 'none';
        body.classList.remove('page-loading');
        body.classList.add('page-loaded');
    }

    // Ініціалізація переходів
    initPageTransitions();

    function initPageTransitions() {
        const overlay = document.querySelector('.page-overlay');
        const navLinks = document.querySelectorAll('.nav-link');
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');

        if (!overlay) return;

        setupLinkHandlers();
        setupBrowserNavigation();
        setupPreloading();
    }

    // Обробка внутрішніх посилань
    function setupLinkHandlers() {
        // Знаходимо всі внутрішні посилання
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], .nav-link');

        internalLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Пропускаємо якщо це якірне посилання
                if (href.startsWith('#')) return;

                // Пропускаємо якщо це зовнішнє посилання
                if (href.startsWith('http')) return;

                // Пропускаємо якщо це файл
                if (href.match(/\.(pdf|doc|docx|xls|xlsx|zip|rar)$/i)) return;

                e.preventDefault();

                // Додаємо стан завантаження
                this.classList.add('loading');

                // Запускаємо перехід
                performPageTransition(href);
            });
        });
    }

    // Виконання переходу між сторінками
    function performPageTransition(url) {
        const overlay = document.querySelector('.page-overlay');
        const body = document.body;

        // Показуємо overlay
        overlay.classList.add('active');
        body.classList.add('page-loading');

        // Попередньо завантажуємо сторінку
        preloadPage(url).then(() => {
            // Затримка для плавності анімації
            setTimeout(() => {
                // Переходимо на нову сторінку
                window.location.href = url;
            }, 600);
        }).catch(error => {
            console.error('Помилка завантаження сторінки:', error);
            // Переходимо звичайним способом у разі помилки
            setTimeout(() => {
                window.location.href = url;
            }, 600);
        });
    }

    // Попереднє завантаження сторінки
    function preloadPage(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error('Помилка завантаження: ' + xhr.status));
                }
            };
            xhr.onerror = function () {
                reject(new Error('Помилка мережі'));
            };
            xhr.send();
        });
    }

    // Обробка навігації браузера
    function setupBrowserNavigation() {
        // Обробка кнопок назад/вперед
        window.addEventListener('popstate', function (event) {
            const overlay = document.querySelector('.page-overlay');
            const body = document.body;

            // Показуємо overlay
            overlay.classList.add('active');
            body.classList.add('page-loading');

            // Затримка для анімації
            setTimeout(() => {
                location.reload();
            }, 600);
        });
    }

    // Попереднє завантаження сторінок
    function setupPreloading() {
        const preloadLinks = new Set();

        // Функція для додавання посилання до prefetch
        function addToPrefetch(url) {
            if (preloadLinks.has(url)) return;

            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
            preloadLinks.add(url);
        }

        // Префетч при наведенні на посилання
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], .nav-link');
        internalLinks.forEach(link => {
            link.addEventListener('mouseenter', function () {
                const href = this.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('http')) {
                    addToPrefetch(href);
                }
            });

            // Для touch пристроїв
            link.addEventListener('touchstart', function () {
                const href = this.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('http')) {
                    addToPrefetch(href);
                }
            });
        });
    }

    // Обробка завантаження сторінки
    function handlePageLoad() {
        const overlay = document.querySelector('.page-overlay');
        const body = document.body;
        const loadingLinks = document.querySelectorAll('.loading');

        // Приховуємо overlay з анімацією
        setTimeout(() => {
            overlay.classList.add('fade-out');
            body.classList.remove('page-loading');
            body.classList.add('page-loaded');

            // Видаляємо стан завантаження з посилань
            loadingLinks.forEach(link => {
                link.classList.remove('loading');
            });

            // Повністю приховуємо overlay
            setTimeout(() => {
                overlay.classList.remove('active', 'fade-out');
            }, 600);
        }, 100);
    }

    // Обробка помилок завантаження
    function handleLoadError() {
        console.error('Помилка завантаження сторінки');
        // Просто перенаправляємо на сторінку при помилці
        setTimeout(() => {
            overlay.classList.add('fade-out');
            body.classList.remove('page-loading');

            setTimeout(() => {
                overlay.classList.remove('active', 'fade-out');
            }, 600);
        }, 5000);
    }

    // Утиліти для переходів
    const transitionUtils = {
        // Швидкий перехід без анімації
        quickTransition: function (url) {
            window.location.href = url;
        },

        // Перехід з кастомною анімацією
        customTransition: function (url, duration = 600) {
            const overlay = document.querySelector('.page-overlay');
            const body = document.body;

            overlay.style.transitionDuration = duration + 'ms';
            overlay.classList.add('active');
            body.classList.add('page-loading');

            setTimeout(() => {
                window.location.href = url;
            }, duration);
        },

        // Перевірка підтримки History API
        supportsHistoryAPI: function () {
            return !!(window.history && history.pushState);
        }
    };

    // Експортуємо утиліти
    window.transitionUtils = transitionUtils;

    // Обробка завантаження сторінки
    window.addEventListener('load', handlePageLoad);
    window.addEventListener('error', handleLoadError);

    // Обробка для односторінкових додатків (SPA)
    if (window.history && history.pushState) {
        // Функція для SPA навігації
        function navigateToPage(url, title) {
            history.pushState(null, title, url);
            // Тут можна додати логіку для завантаження контенту через AJAX
        }

        // Експортуємо функцію навігації
        window.navigateToPage = navigateToPage;
    }

    // Покращена підтримка для мобільних пристроїв
    if ('ontouchstart' in window) {
        // Додаємо обробку для swipe жестів
        let touchStartX = 0;
        let touchStartY = 0;

        document.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', function (e) {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Swipe right (перехід назад)
            if (deltaX > 50 && Math.abs(deltaY) < 50) {
                if (window.history.length > 1) {
                    window.history.back();
                }
            }
        });
    }

    // Додаємо CSS для кастомних переходів
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        .nav-link.loading::after {
            width: 100%;
            background: #3498db;
        }
        
        .page-overlay.custom-duration {
            transition-duration: var(--custom-duration, 0.6s);
        }
        
        /* Покращена анімація для мобільних */
        @media (max-width: 768px) {
            .page-overlay {
                transform: translateY(100%);
            }
            
            .page-overlay.active {
                transform: translateY(0);
            }
            
            .page-overlay.fade-out {
                transform: translateY(-100%);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Page Transitions ініціалізовано');
}); 