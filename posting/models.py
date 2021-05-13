from django.db import models
from django.conf import settings
from django.urls import reverse
from accounts.models import User

from rest_framework.reverse import reverse as api_reverse


class BlogPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=120, null=True, blank=True)
    city = models.CharField(max_length=30,null=True,blank=True,default='mumbai')
    content = models.TextField(max_length=12000, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.title)
    def get_api_url(self, request=None):
        return api_reverse("api-posting:post-rud", kwargs={'pk': self.pk}, request=request)