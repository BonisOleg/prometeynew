from django.urls import path
from . import views

app_name = 'prometey'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('portfolio/', views.PortfolioView.as_view(), name='portfolio'),
    path('prices/', views.PricesView.as_view(), name='prices'),
    path('education/', views.EducationView.as_view(), name='education'),
    path('faq/', views.FAQView.as_view(), name='faq'),
    path('blog/', views.BlogView.as_view(), name='blog'),
    path('contacts/', views.ContactsView.as_view(), name='contacts'),
] 