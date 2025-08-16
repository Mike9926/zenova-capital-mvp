from django.urls import path
from . import views

urlpatterns = [
    path('securities/', views.list_securities),
    path('upload-deal-note/', views.upload_deal_note),
    path('trades/', views.add_trade),
    path('portfolio/summary/', views.portfolio_summary),
    path('fetch-prices/', views.fetch_prices),  # dev-only
]
