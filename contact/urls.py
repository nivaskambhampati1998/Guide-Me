from django.urls import path
from .views import ContactList, ContactDetail

urlpatterns = [
    
    path('<int:pk>/', ContactDetail.as_view(), name='contact'),
    path('', ContactList.as_view(), name='list_create'),
]
