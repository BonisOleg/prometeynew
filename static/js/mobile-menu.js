// Мобільне меню
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Ініціалізація мобільного меню
    initMobileMenu();

    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const body = document.body;

        if (!menuToggle || !navMenu) return;

        setupMenuToggle();
        setupMenuLinks();
        setupOutsideClick();
        setupSwipeGestures();
        setupKeyboardNavigation();
    }

    // Налаштування кнопки меню
    function setupMenuToggle() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;

        menuToggle.addEventListener('click', function () {
            const isOpen = navMenu.classList.contains('active');

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Функція відкриття меню
        function openMenu() {
            navMenu.classList.add('active');
            menuToggle.classList.add('active');
            body.classList.add('menu-open');

            // Заборона скролу
            body.style.overflow = 'hidden';

            // Фокус на першому елементі меню
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 300);
            }

            // Додаємо атрибут для доступності
            menuToggle.setAttribute('aria-expanded', 'true');
            navMenu.setAttribute('aria-hidden', 'false');
        }

        // Функція закриття меню
        function closeMenu() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');

            // Відновлюємо скрол
            body.style.overflow = '';

            // Повертаємо фокус на кнопку меню
            menuToggle.focus();

            // Оновлюємо атрибути для доступності
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        }

        // Експортуємо функції для глобального використання
        window.openMobileMenu = openMenu;
        window.closeMobileMenu = closeMenu;
    }

    // Налаштування посилань меню
    function setupMenuLinks() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                // Закриваємо меню при кліку на посилання
                if (window.innerWidth <= 768) {
                    window.closeMobileMenu();
                }
            });
        });
    }

    // Закриття меню при кліку поза ним
    function setupOutsideClick() {
        document.addEventListener('click', function (e) {
            const navMenu = document.querySelector('.nav-menu');
            const menuToggle = document.querySelector('.mobile-menu-toggle');

            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                window.closeMobileMenu();
            }
        });
    }

    // Обробка swipe жестів для закриття меню
    function setupSwipeGestures() {
        if (!('ontouchstart' in window)) return;

        const navMenu = document.querySelector('.nav-menu');
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        navMenu.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        navMenu.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Swipe left для закриття меню
            if (deltaX < -50 && Math.abs(deltaY) < 50) {
                window.closeMobileMenu();
            }
        });
    }

    // Клавіатурна навігація
    function setupKeyboardNavigation() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelectorAll('.nav-link');

        // Обробка клавіши Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                window.closeMobileMenu();
            }
        });

        // Обробка Tab навігації
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Tab' && navMenu.classList.contains('active')) {
                const focusableElements = navMenu.querySelectorAll('.nav-link');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });

        // Обробка стрілок для навігації по меню
        navMenu.addEventListener('keydown', function (e) {
            if (!navMenu.classList.contains('active')) return;

            const focusableElements = Array.from(navMenu.querySelectorAll('.nav-link'));
            const currentIndex = focusableElements.indexOf(document.activeElement);

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % focusableElements.length;
                    focusableElements[nextIndex].focus();
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
                    focusableElements[prevIndex].focus();
                    break;

                case 'Enter':
                case ' ':
                    e.preventDefault();
                    if (document.activeElement) {
                        document.activeElement.click();
                    }
                    break;
            }
        });
    }

    // Обробка зміни розміру вікна
    function handleResize() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const body = document.body;

        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            // Закриваємо мобільне меню на великих екранах
            window.closeMobileMenu();
        }
    }

    // Обробка зміни орієнтації
    function handleOrientationChange() {
        const navMenu = document.querySelector('.nav-menu');

        if (navMenu.classList.contains('active')) {
            // Закриваємо меню при зміні орієнтації
            window.closeMobileMenu();
        }
    }

    // Додаємо обробники
    window.addEventListener('resize', window.utils?.debounce(handleResize, 300) || handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Утиліти для мобільного меню
    const mobileMenuUtils = {
        // Перевірка чи меню відкрите
        isMenuOpen: function () {
            const navMenu = document.querySelector('.nav-menu');
            return navMenu.classList.contains('active');
        },

        // Перемикання меню
        toggleMenu: function () {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (menuToggle) {
                menuToggle.click();
            }
        },

        // Додавання нового елемента до меню
        addMenuItem: function (text, href, position = 'append') {
            const navMenu = document.querySelector('.nav-menu');
            const newItem = document.createElement('li');
            const newLink = document.createElement('a');

            newLink.href = href;
            newLink.textContent = text;
            newLink.classList.add('nav-link');
            newItem.appendChild(newLink);

            if (position === 'prepend') {
                navMenu.insertBefore(newItem, navMenu.firstChild);
            } else {
                navMenu.appendChild(newItem);
            }

            // Додаємо обробник для нового елемента
            newLink.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    window.closeMobileMenu();
                }
            });
        },

        // Видалення елемента з меню
        removeMenuItem: function (href) {
            const link = document.querySelector(`.nav-link[href="${href}"]`);
            if (link && link.parentElement) {
                link.parentElement.remove();
            }
        }
    };

    // Експортуємо утиліти
    window.mobileMenuUtils = mobileMenuUtils;

    // Додаємо початкові атрибути для доступності
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'nav-menu');
        menuToggle.setAttribute('aria-label', 'Відкрити меню навігації');

        navMenu.setAttribute('id', 'nav-menu');
        navMenu.setAttribute('aria-hidden', 'true');
        navMenu.setAttribute('role', 'menu');

        // Додаємо роль для елементів меню
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.setAttribute('role', 'menuitem');
        });
    }

    // Додаємо стилі для анімації
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-toggle {
            position: relative;
            z-index: 1001;
        }
        
        .mobile-menu-toggle span {
            display: block;
            transition: all 0.3s ease;
        }
        
        .nav-menu {
            transition: left 0.3s ease;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-link {
            transition: all 0.3s ease;
        }
        
        .nav-link:focus {
            outline: 2px solid #3498db;
            outline-offset: 2px;
        }
        
        .body.menu-open {
            overflow: hidden;
        }
        
        /* Покращена анімація для iOS */
        @supports (-webkit-overflow-scrolling: touch) {
            .nav-menu {
                -webkit-transition: left 0.3s ease;
                -webkit-overflow-scrolling: touch;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Mobile Menu ініціалізовано');
}); 