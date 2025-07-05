from django.core.management.base import BaseCommand
from django.db import transaction
from prometey.models import PageBlock, PageMeta


class Command(BaseCommand):
    help = 'Додає початкові дані для всіх сторінок'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Початок додавання початкових даних...'))
        
        with transaction.atomic():
            # Спочатку видаляємо всі існуючі дані
            PageBlock.objects.all().delete()
            PageMeta.objects.all().delete()
            
            # Додаємо метадані для всіх сторінок
            self.create_page_meta()
            
            # Додаємо блоки для всіх сторінок
            self.create_home_blocks()
            self.create_portfolio_blocks()
            self.create_prices_blocks()
            self.create_education_blocks()
            self.create_faq_blocks()
            self.create_blog_blocks()
            self.create_contacts_blocks()
            
        self.stdout.write(self.style.SUCCESS('Початкові дані успішно додані!'))

    def create_page_meta(self):
        """Створюємо метадані для всіх сторінок"""
        meta_data = [
            {
                'page': 'home',
                'title': 'Prometey - Головна сторінка',
                'description': 'Prometey - інноваційні рішення для вашого бізнесу',
                'keywords': 'prometey, бізнес, інновації, технології'
            },
            {
                'page': 'portfolio',
                'title': 'Prometey - Портфоліо',
                'description': 'Наші роботи та проекти - портфоліо Prometey',
                'keywords': 'портфоліо, проекти, роботи, кейси'
            },
            {
                'page': 'prices',
                'title': 'Prometey - Ціни',
                'description': 'Ціни на наші послуги - доступні тарифи',
                'keywords': 'ціни, тарифи, послуги, вартість'
            },
            {
                'page': 'education',
                'title': 'Prometey - Навчання',
                'description': 'Курси та навчальні програми від Prometey',
                'keywords': 'навчання, курси, освіта, тренінги'
            },
            {
                'page': 'faq',
                'title': 'Prometey - Часті запитання',
                'description': 'Відповіді на часті запитання про наші послуги',
                'keywords': 'faq, запитання, відповіді, довідка'
            },
            {
                'page': 'blog',
                'title': 'Prometey - Блог',
                'description': 'Блог Prometey - статті про технології та бізнес',
                'keywords': 'блог, статті, новини, технології'
            },
            {
                'page': 'contacts',
                'title': 'Prometey - Контакти',
                'description': 'Наші контакти - зв\'яжіться з нами',
                'keywords': 'контакти, адреса, телефон, email'
            }
        ]
        
        for meta in meta_data:
            PageMeta.objects.create(**meta)

    def create_home_blocks(self):
        """Створюємо блоки для головної сторінки"""
        blocks = [
            {
                'page': 'home',
                'block_type': 'hero',
                'title': 'Ласкаво просимо до Prometey',
                'subtitle': 'Інноваційні рішення для вашого бізнесу',
                'content': 'Ми створюємо унікальні цифрові продукти, які допомагають бізнесу рости та розвиватися. Наша команда професіоналів готова втілити ваші ідеї в реальність.',
                'background_color': '#667eea',
                'text_color': '#ffffff',
                'order': 1
            },
            {
                'page': 'home',
                'block_type': 'features',
                'title': 'Чому обирають нас',
                'subtitle': 'Наші переваги',
                'content': 'Професійна команда • Індивідуальний підхід • Сучасні технології • Гарантія якості • Підтримка 24/7',
                'background_color': '#f8f9fa',
                'text_color': '#333333',
                'order': 2
            },
            {
                'page': 'home',
                'block_type': 'cta',
                'title': 'Готові розпочати?',
                'subtitle': 'Зв\'яжіться з нами сьогодні',
                'content': 'Отримайте безкоштовну консультацію та дізнайтеся, як ми можемо допомогти вашому бізнесу.',
                'background_color': '#28a745',
                'text_color': '#ffffff',
                'order': 3
            }
        ]
        
        for block in blocks:
            PageBlock.objects.create(**block)

    def create_portfolio_blocks(self):
        """Створюємо блоки для сторінки портфоліо"""
        blocks = [
            {
                'page': 'portfolio',
                'block_type': 'hero',
                'title': 'Наше портфоліо',
                'subtitle': 'Проекти, якими ми пишаємося',
                'content': 'Ознайомтеся з нашими роботами та переконайтеся в якості наших рішень.',
                'background_color': '#6c757d',
                'text_color': '#ffffff',
                'order': 1
            },
            {
                'page': 'portfolio',
                'block_type': 'content',
                'title': 'Веб-розробка',
                'subtitle': 'Сучасні веб-сайти та додатки',
                'content': 'Ми створюємо адаптивні веб-сайти, інтернет-магазини та веб-додатки, які працюють швидко та надійно.',
                'background_color': '#ffffff',
                'text_color': '#333333',
                'order': 2
            },
            {
                'page': 'portfolio',
                'block_type': 'content',
                'title': 'Мобільні додатки',
                'subtitle': 'iOS та Android розробка',
                'content': 'Розробляємо мобільні додатки для iOS та Android з використанням найсучасніших технологій.',
                'background_color': '#e9ecef',
                'text_color': '#333333',
                'order': 3
            }
        ]
        
        for block in blocks:
            PageBlock.objects.create(**block)

    def create_prices_blocks(self):
        """Створюємо блоки для сторінки цін"""
        blocks = [
            {
                'page': 'prices',
                'block_type': 'hero',
                'title': 'Наші ціни',
                'subtitle': 'Прозорі тарифи для кожного проекту',
                'content': 'Ми пропонуємо гнучкі тарифи, що підходять для проектів будь-якого масштабу.',
                'background_color': '#17a2b8',
                'text_color': '#ffffff',
                'order': 1
            },
            {
                'page': 'prices',
                'block_type': 'content',
                'title': 'Базовий пакет',
                'subtitle': 'Від 5000 грн',
                'content': 'Ідеальний варіант для стартапів та малих проектів. Включає основний функціонал та базову підтримку.',
                'background_color': '#ffffff',
                'text_color': '#333333',
                'order': 2
            },
            {
                'page': 'prices',
                'block_type': 'content',
                'title': 'Преміум пакет',
                'subtitle': 'Від 15000 грн',
                'content': 'Розширений функціонал для середніх та великих проектів. Включає повну підтримку та додаткові можливості.',
                'background_color': '#f8f9fa',
                'text_color': '#333333',
                'order': 3
            }
        ]
        
        for block in blocks:
            PageBlock.objects.create(**block)

    def create_education_blocks(self):
        """Створюємо блоки для сторінки навчання"""
        blocks = [
            {
                'page': 'education',
                'block_type': 'hero',
                'title': 'Навчання',
                'subtitle': 'Розвивайтеся разом з нами',
                'content': 'Ми пропонуємо курси та тренінги з веб-розробки, дизайну та цифрового маркетингу.',
                'background_color': '#fd7e14',
                'text_color': '#ffffff',
                'order': 1
            },
            {
                'page': 'education',
                'block_type': 'content',
                'title': 'Веб-розробка',
                'subtitle': 'Від основ до професійного рівня',
                'content': 'Навчіться створювати сучасні веб-сайти та додатки з нуля. Практичні завдання та реальні проекти.',
                'background_color': '#ffffff',
                'text_color': '#333333',
                'order': 2
            },
            {
                'page': 'education',
                'block_type': 'content',
                'title': 'UI/UX дизайн',
                'subtitle': 'Створюйте красиві та зручні інтерфейси',
                'content': 'Опануйте принципи дизайну, вивчіть Figma та Adobe Creative Suite. Створюйте дизайни, які користувачі люблять.',
                'background_color': '#f8f9fa',
                'text_color': '#333333',
                'order': 3
            }
        ]
        
        for block in blocks:
            PageBlock.objects.create(**block)

    def create_faq_blocks(self):
        """Створюємо блоки для сторінки FAQ"""
        blocks = [
            {
                'page': 'faq',
                'block_type': 'hero',
                'title': 'Часті запитання',
                'subtitle': 'Відповіді на популярні питання',
                'content': 'Тут ви знайдете відповіді на найчастіші запитання про наші послуги.',
                'background_color': '#6f42c1',
                'text_color': '#ffffff',
                'order': 1
            },
            {
                'page': 'faq',
                'block_type': 'content',
                'title': 'Скільки коштує розробка сайту?',
                'subtitle': 'Ціноутворення',
                'content': 'Вартість залежить від складності проекту, функціоналу та термінів. Базові сайти від 5000 грн, складні проекти - індивідуальна оцінка.',
                'background_color': '#ffffff',
                'text_color': '#333333',
                'order': 2
            },
            {
                'page': 'faq',
                'block_type': 'content',
                'title': 'Які терміни розробки?',
                'subtitle': 'Час виконання',
                'content': 'Прості сайти - 1-2 тижні, складні проекти - 1-3 місяці. Точні терміни обговорюємо на етапі планування.',
                'background_color': '#f8f9fa',
                'text_color': '#333333',
                'order': 3
            }
        ]
        
        for block in blocks:
            PageBlock.objects.create(**block)

    def create_blog_blocks(self):
        """Створюємо блоки для сторінки блогу"""
        blocks = [
            {
                'page': 'blog',
                'block_type': 'hero',
                'title': 'Наш блог',
                'subtitle': 'Цікаві статті та новини',
                'content': 'Читайте наші статті про технології, дизайн та тренди в індустрії.',
                'background_color': '#20c997',
                'text_color': '#ffffff',
                'order': 1
            },
            {
                'page': 'blog',
                'block_type': 'content',
                'title': 'Останні публікації',
                'subtitle': 'Свіжі статті',
                'content': 'Тенденції веб-розробки 2024 • Як обрати правильний дизайн • SEO оптимізація сайтів • Мобільна розробка',
                'background_color': '#ffffff',
                'text_color': '#333333',
                'order': 2
            },
            {
                'page': 'blog',
                'block_type': 'content',
                'title': 'Корисні поради',
                'subtitle': 'Практичні рекомендації',
                'content': 'Ділимося досвідом та знаннями, які допоможуть вам в роботі та розвитку проектів.',
                'background_color': '#f8f9fa',
                'text_color': '#333333',
                'order': 3
            }
        ]
        
        for block in blocks:
            PageBlock.objects.create(**block)

    def create_contacts_blocks(self):
        """Створюємо блоки для сторінки контактів"""
        blocks = [
            {
                'page': 'contacts',
                'block_type': 'hero',
                'title': 'Контакти',
                'subtitle': 'Зв\'яжіться з нами',
                'content': 'Ми завжди готові відповісти на ваші запитання та обговорити ваш проект.',
                'background_color': '#dc3545',
                'text_color': '#ffffff',
                'order': 1
            },
            {
                'page': 'contacts',
                'block_type': 'content',
                'title': 'Наші контакти',
                'subtitle': 'Як з нами зв\'язатися',
                'content': 'Email: info@prometey.com\nТелефон: +380 (67) 123-45-67\nАдреса: м. Київ, вул. Хрещатик, 1',
                'background_color': '#ffffff',
                'text_color': '#333333',
                'order': 2
            },
            {
                'page': 'contacts',
                'block_type': 'cta',
                'title': 'Напишіть нам',
                'subtitle': 'Розкажіть про ваш проект',
                'content': 'Заповніть форму, і ми зв\'яжемося з вами протягом 24 годин для обговорення деталей.',
                'background_color': '#007bff',
                'text_color': '#ffffff',
                'order': 3
            }
        ]
        
        for block in blocks:
            PageBlock.objects.create(**block) 