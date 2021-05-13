from django.urls import path
from . import views

urlpatterns = [
    path('', views.MonumentList.as_view(), name="MonumentList"),
    path('add/', views.MonumentList.as_view(), name="MonumentList"),
    path('<slug:slug>/', views.MonumentDetail.as_view(), name="MonumentDetail"),
    path('modify/<slug:slug>/', views.MonumentDetail.as_view(), name="MonumentDetail"),
    path('delete/<slug:slug>/', views.MonumentDetail.as_view(), name="MonumentDetail"),
]
