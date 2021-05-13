from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from accounts.models import User, Guide, Tourist
from rest_framework.reverse import reverse as api_reverse
from rest_framework import status
from rest_framework_jwt.settings import api_settings
from rest_framework.permissions import IsAuthenticated


class UserModelsTest(APITestCase):
    def setUp(self):
        self.username = "guideme"
        self.password = "guideme"
        self.email = "testemail@gmail.com"
        self.first_name = "guideme"
        self.last_name = "tourist"
        self.languages = 'english'
        self.email_confirm = True
        self.is_guide = True
        self.is_tourist = False

        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
            email=self.email,
            first_name=self.first_name,
            last_name=self.last_name,
            email_confirm=self.email_confirm,
            languages=self.languages,
            is_guide=self.is_guide,
            is_tourist=self.is_tourist
        )
        self.user.save()

    def test_correct(self):
        user = authenticate(username="guideme", password="guideme")
        self.assertTrue((user is not None) and user.is_authenticated)

    def test_wrong_username(self):
        user = authenticate(username="testguideme", password="guideme")
        self.assertFalse((user is not None) and user.is_authenticated)

    def test_wrong_password(self):
        user = authenticate(username="guideme", password="testguideme")
        self.assertFalse((user is not None) and user.is_authenticated)


class GuideModelsTest(APITestCase):
    def setUp(self):
        self.username = "guideme"
        self.password = "guideme"
        self.email = "testemail@gmail.com"
        self.first_name = "guideme"
        self.last_name = "tourist"
        self.languages = 'english'
        self.email_confirm = True
        self.is_guide = True
        self.is_tourist = False

        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
            email=self.email,
            first_name=self.first_name,
            last_name=self.last_name,
            email_confirm=self.email_confirm,
            languages=self.languages,
            is_guide=self.is_guide,
            is_tourist=self.is_tourist
        )
        self.user.save()
        self.guidename = "nivas"
        self.places_known = "US"
        self.rating = 5

        self.guide = Guide.objects.create(
            user=self.user,
            guidename=self.guidename,
            places_known=self.places_known,
            rating=self.rating
        )
        self.guide.save()


class TouristModelsTest(APITestCase):
    def setUp(self):
        self.username = "guideme"
        self.password = "guideme"
        self.email = "testemail@gmail.com"
        self.first_name = "guideme"
        self.last_name = "tourist"
        self.languages = 'english'
        self.email_confirm = True
        self.is_guide = True
        self.is_tourist = False

        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
            email=self.email,
            first_name=self.first_name,
            last_name=self.last_name,
            email_confirm=self.email_confirm,
            languages=self.languages,
            is_guide=self.is_guide,
            is_tourist=self.is_tourist
        )
        self.user.save()
        self.touristname = "ranga"

        self.tourist = Tourist.objects.create(
            user=self.user,
            touristname=self.touristname
        )
        self.tourist.save()
