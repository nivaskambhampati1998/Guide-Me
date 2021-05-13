from django.urls import path
from .views import PostList, PostDetail, CurrentPostReview

app_name = 'blog_api'

urlpatterns = [
    path('<int:pk>/', PostDetail.as_view(), name='detail_create'),
    path('city/<slug:slug>/', CurrentPostReview.as_view(), name="ReviewDetail"),
    path('', PostList.as_view(), name='list_create'),
]