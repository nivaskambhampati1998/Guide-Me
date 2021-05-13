from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from accounts.models import User, Guide, Tourist
from monuments.models import  Monument
from blog.models import Post, Review, Contact
from posting.models import BlogPost
from rest_framework.reverse import reverse as api_reverse
from rest_framework import status
from rest_framework_jwt.settings import api_settings
from rest_framework.permissions import IsAuthenticated

class ContactModelsTest(APITestCase):
    def setUp(self):
        self.name="guideme"
        self.email="guideme@gmail.com"
        self.subject="Hello Tourist peoples"
        self.message="Hello Guideme"

        self.contact = Contact.objects.create(
            name=self.name,
            email=self.email,
            subject=self.subject,
            message=self.message
        )
        self.contact.save()