from django.shortcuts import render
from django.views.generic import TemplateView
from .models import PageBlock, PageMeta


class BasePageView(TemplateView):
    """Базовий клас для всіх сторінок"""
    
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
        """Метод для отримання назви сторінки"""
        return getattr(self, 'page_name', 'home')


class HomeView(BasePageView):
    template_name = 'prometey/home.html'
    page_name = 'home'


class PortfolioView(BasePageView):
    template_name = 'prometey/portfolio.html'
    page_name = 'portfolio'


class PricesView(BasePageView):
    template_name = 'prometey/prices.html'
    page_name = 'prices'


class EducationView(BasePageView):
    template_name = 'prometey/education.html'
    page_name = 'education'


class FAQView(BasePageView):
    template_name = 'prometey/faq.html'
    page_name = 'faq'


class BlogView(BasePageView):
    template_name = 'prometey/blog.html'
    page_name = 'blog'


class ContactsView(BasePageView):
    template_name = 'prometey/contacts.html'
    page_name = 'contacts'
