from django.db import models
from django.utils.translation import gettext_lazy as _
from .constants import PAGE_CHOICES, BLOCK_TYPES, DEFAULT_BACKGROUND_COLOR, DEFAULT_TEXT_COLOR


class PageBlock(models.Model):
    """Модель для блоків сторінок"""
    
    page = models.CharField(
        max_length=20,
        choices=PAGE_CHOICES,
        verbose_name='Сторінка'
    )
    
    block_type = models.CharField(
        max_length=20,
        choices=BLOCK_TYPES,
        verbose_name='Тип блока'
    )
    
    title = models.CharField(
        max_length=200,
        verbose_name='Заголовок'
    )
    
    subtitle = models.CharField(
        max_length=300,
        blank=True,
        verbose_name='Підзаголовок'
    )
    
    content = models.TextField(
        verbose_name='Контент'
    )
    
    background_color = models.CharField(
        max_length=7,
        default=DEFAULT_BACKGROUND_COLOR,
        verbose_name='Колір фону'
    )
    
    text_color = models.CharField(
        max_length=7,
        default=DEFAULT_TEXT_COLOR,
        verbose_name='Колір тексту'
    )
    
    order = models.PositiveIntegerField(
        default=0,
        verbose_name='Порядок'
    )
    
    is_active = models.BooleanField(
        default=True,
        verbose_name='Активний'
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Створено'
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Оновлено'
    )
    
    class Meta:
        ordering = ['page', 'order']
        verbose_name = 'Блок сторінки'
        verbose_name_plural = 'Блоки сторінок'
    
    def __str__(self):
        return f"{self.get_page_display()} - {self.title}"


class PageMeta(models.Model):
    """Метадані для сторінок"""
    
    page = models.CharField(
        max_length=20,
        choices=PAGE_CHOICES,
        unique=True,
        verbose_name='Сторінка'
    )
    
    title = models.CharField(
        max_length=200,
        verbose_name='SEO заголовок'
    )
    
    description = models.TextField(
        max_length=500,
        verbose_name='SEO опис'
    )
    
    keywords = models.CharField(
        max_length=300,
        blank=True,
        verbose_name='SEO ключові слова'
    )
    
    class Meta:
        verbose_name = 'Метадані сторінки'
        verbose_name_plural = 'Метадані сторінок'
    
    def __str__(self):
        return f"Метадані - {self.get_page_display()}"
