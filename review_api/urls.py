from django.urls import path
from .views import ReviewList, ReviewDetail, CurrentUserReview

app_name = 'review_api'

urlpatterns = [
    path('<int:pk>/', ReviewDetail.as_view(), name='detailcreate'),
    path('<str:guidename>/', CurrentUserReview.as_view(), name="CurrentUserReview"),
    path('', ReviewList.as_view(), name='listcreate'),
]