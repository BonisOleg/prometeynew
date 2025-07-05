from django.contrib import admin
from .models import PageBlock, PageMeta


@admin.register(PageBlock)
class PageBlockAdmin(admin.ModelAdmin):
    list_display = ['title', 'page', 'block_type', 'order', 'is_active', 'created_at']
    list_filter = ['page', 'block_type', 'is_active']
    search_fields = ['title', 'content']
    list_editable = ['order', 'is_active']
    ordering = ['page', 'order']
    
    fieldsets = (
        ('Основна інформація', {
            'fields': ('page', 'block_type', 'title', 'subtitle', 'content')
        }),
        ('Налаштування дизайну', {
            'fields': ('background_color', 'text_color')
        }),
        ('Налаштування відображення', {
            'fields': ('order', 'is_active')
        }),
    )


@admin.register(PageMeta)
class PageMetaAdmin(admin.ModelAdmin):
    list_display = ['page', 'title']
    list_filter = ['page']
    search_fields = ['title', 'description']
    
    fieldsets = (
        ('SEO налаштування', {
            'fields': ('page', 'title', 'description', 'keywords')
        }),
    )
