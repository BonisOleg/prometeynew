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
            
            # Додаємо дані через спрощені методи
            self.create_all_page_meta()
            self.create_all_blocks()
            
        self.stdout.write(self.style.SUCCESS('Початкові дані успішно додані!'))

    def create_all_page_meta(self):
        """Створює всі метадані одним методом"""
        meta_data = {
            'home': {
                'title': 'Prometey - Головна сторінка',
                'description': 'Prometey - інноваційні рішення для вашого бізнесу',
                'keywords': 'prometey, бізнес, інновації, технології'
            },
            'portfolio': {
                'title': 'Prometey - Портфоліо',
                'description': 'Наші роботи та проекти - портфоліо Prometey',
                'keywords': 'портфоліо, проекти, роботи, кейси'
            },
            'prices': {
                'title': 'Prometey - Ціни',
                'description': 'Ціни на наші послуги - доступні тарифи',
                'keywords': 'ціни, тарифи, послуги, вартість'
            },
            'education': {
                'title': 'Prometey - Навчання',
                'description': 'Курси та навчальні програми від Prometey',
                'keywords': 'навчання, курси, освіта, тренінги'
            },
            'faq': {
                'title': 'Prometey - Часті запитання',
                'description': 'Відповіді на часті запитання про наші послуги',
                'keywords': 'faq, запитання, відповіді, довідка'
            },
            'blog': {
                'title': 'Prometey - Блог',
                'description': 'Блог Prometey - статті про технології та бізнес',
                'keywords': 'блог, статті, новини, технології'
            },
            'contacts': {
                'title': 'Prometey - Контакти',
                'description': 'Наші контакти - зв\'яжіться з нами',
                'keywords': 'контакти, адреса, телефон, email'
            }
        }
        
        for page, data in meta_data.items():
            PageMeta.objects.create(page=page, **data)

    def create_all_blocks(self):
        """Створює всі блоки одним методом"""
        blocks_data = {
            'home': [
                ('hero', 'Ласкаво просимо до Prometey', 'Інноваційні рішення для вашого бізнесу', 
                 'Ми створюємо унікальні цифрові продукти, які допомагають бізнесу рости та розвиватися.', 
                 '#667eea', '#ffffff'),
                ('features', 'Чому обирають нас', 'Наші переваги', 
                 'Професійна команда • Індивідуальний підхід • Сучасні технології • Гарантія якості', 
                 '#f8f9fa', '#333333'),
                ('cta', 'Готові розпочати?', 'Зв\'яжіться з нами сьогодні', 
                 'Отримайте безкоштовну консультацію та дізнайтеся, як ми можемо допомогти.', 
                 '#28a745', '#ffffff'),
            ],
            'portfolio': [
                ('hero', 'Наше портфоліо', 'Проекти, якими ми пишаємося', 
                 'Ознайомтеся з нашими роботами та переконайтеся в якості наших рішень.', 
                 '#6c757d', '#ffffff'),
                ('content', 'Веб-розробка', 'Сучасні веб-сайти та додатки', 
                 'Ми створюємо адаптивні веб-сайти, інтернет-магазини та веб-додатки.', 
                 '#ffffff', '#333333'),
                ('content', 'Мобільні додатки', 'iOS та Android розробка', 
                 'Розробляємо мобільні додатки для iOS та Android з використанням сучасних технологій.', 
                 '#e9ecef', '#333333'),
            ],
            'prices': [
                ('hero', 'Наші ціни', 'Прозорі тарифи для кожного проекту', 
                 'Ми пропонуємо гнучкі тарифи, що підходять для проектів будь-якого масштабу.', 
                 '#17a2b8', '#ffffff'),
                ('content', 'Базовий пакет', 'Від 5000 грн', 
                 'Ідеальний варіант для стартапів та малих проектів.', 
                 '#ffffff', '#333333'),
                ('content', 'Преміум пакет', 'Від 15000 грн', 
                 'Розширений функціонал для середніх та великих проектів.', 
                 '#f8f9fa', '#333333'),
            ],
            'education': [
                ('hero', 'Навчання', 'Курси та тренінги від професіоналів', 
                 'Розвивайте свої навички з нашими експертами.', 
                 '#ffc107', '#000000'),
                ('content', 'Веб-розробка', 'Курс від новачка до професіонала', 
                 'Вивчіть сучасні технології веб-розробки.', 
                 '#ffffff', '#333333'),
            ],
            'faq': [
                ('hero', 'Часті запитання', 'Відповіді на популярні питання', 
                 'Знайдіть відповіді на найпопулярніші запитання.', 
                 '#6f42c1', '#ffffff'),
                ('content', 'Як замовити проект?', 'Процес замовлення', 
                 'Зв\'яжіться з нами будь-яким зручним способом.', 
                 '#ffffff', '#333333'),
            ],
            'blog': [
                ('hero', 'Наш блог', 'Статті про технології та бізнес', 
                 'Читайте корисні статті від наших експертів.', 
                 '#dc3545', '#ffffff'),
                ('content', 'Останні новини', 'Що нового в світі технологій', 
                 'Слідкуйте за останніми трендами.', 
                 '#ffffff', '#333333'),
            ],
            'contacts': [
                ('hero', 'Контакти', 'Зв\'яжіться з нами', 
                 'Ми готові відповісти на всі ваші запитання.', 
                 '#20c997', '#ffffff'),
                ('content', 'Наша адреса', 'Київ, вул. Прикладна 1', 
                 'Приходьте до нас в офіс для особистої зустрічі.', 
                 '#ffffff', '#333333'),
            ]
        }
        
        for page, blocks in blocks_data.items():
            for order, (block_type, title, subtitle, content, bg_color, text_color) in enumerate(blocks, 1):
                PageBlock.objects.create(
                    page=page,
                    block_type=block_type,
                    title=title,
                    subtitle=subtitle,
                    content=content,
                    background_color=bg_color,
                    text_color=text_color,
                    order=order
                ) 