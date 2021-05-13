from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from accounts.models import User, Guide, Tourist
from booking.models import Bookings
from monuments.models import  Monument
from blog.models import Post, Review
from posting.models import BlogPost
from rest_framework.reverse import reverse as api_reverse
from rest_framework import status
from rest_framework_jwt.settings import api_settings
from rest_framework.permissions import IsAuthenticated

class BookingModelsTest(APITestCase):
    def setUp(self):
        self.booking_id=1
        self.guidename="ranga"
        self.username="venky"
        self.booking_date="2020/12/12" 
        self.place="Canada" 
        self.city="Montreal"
        self.booking_status="Done" 
        
        self.booking = Bookings.objects.create_user(
            booking_id=self.booking_id,
            guidename=self.guidename,
            username=self.username,
            booking_date=self.booking_date,
            place=self.place,
            city=self.city,
            booking_status=self.booking_status
        )
        self.booking.save()
