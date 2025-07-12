from django.shortcuts import render
from django.views.generic import TemplateView
from .models import PageBlock, PageMeta


class PageView(TemplateView):
    """Базовий клас для всіх сторінок з автоматичним визначенням page_name"""
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        page_name = self.get_page_name()
        
        # Отримуємо блоки для сторінки
        context['blocks'] = PageBlock.objects.filter(
            page=page_name,
            is_active=True
        ).order_by('order')
        
        # Отримуємо метадані для сторінки
        try:
            context['page_meta'] = PageMeta.objects.get(page=page_name)
        except PageMeta.DoesNotExist:
            context['page_meta'] = None
            
        context['page_name'] = page_name
        return context
    
    def get_page_name(self):
        """Автоматично визначає назву сторінки з назви класу"""
        class_name = self.__class__.__name__.lower()
        if class_name.endswith('view'):
            return class_name[:-4]  # Видаляємо 'view' з кінця
        return class_name
    
    def get_template_names(self):
        """Автоматично визначає шаблон на основі назви сторінки"""
        return [f'prometey/{self.get_page_name()}.html']


# Всі view класи тепер стають дуже простими
class HomeView(PageView):
    pass


class PortfolioView(PageView):
    pass


class PricesView(PageView):
    pass


class EducationView(PageView):
    pass


class FAQView(PageView):
    pass


class BlogView(PageView):
    pass


class ContactsView(PageView):
    pass
