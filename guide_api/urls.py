from django.urls import path
from .views import GuideList, GuideDetail

app_name = 'guide_api'

urlpatterns = [
    path('<str:guidename>/', GuideDetail.as_view(), name='detailcreate'),
    path('', GuideList.as_view(), name='listcreate'),
]