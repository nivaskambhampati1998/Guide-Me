from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from accounts.models import User, Guide, Tourist
from blog.models import Post, Review, Contact
from monuments.models import Monument
from rest_framework.reverse import reverse as api_reverse
from rest_framework import status
from rest_framework_jwt.settings import api_settings
from rest_framework.permissions import IsAuthenticated


class MonumentsModelsTest(APITestCase):
    def setUp(self):
        self.monument_id=1
        self.monument_name="XYZ"
        self.city="sricity"
        self.basicinfo="abchd"
        self.description="abcdh"
        self.image="img.png"
        
        self.monument = Monument.objects.create(
            monument_id=self.monument_id,
            monument_name=self.monument_name,
            city=self.city,
            basicinfo=self.basicinfo,
            description=self.description,
            image=self.image,
        )
        self.monument.save()
