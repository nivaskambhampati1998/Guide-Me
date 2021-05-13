from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, PermissionsMixin, UserManager
from rest_framework_simplejwt.tokens import RefreshToken
import os
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

def update_filename(instance, filename):
    upload_to = 'photos'
    ext = filename.split('.')[-1]
    if instance.username:
        filename = '{}.{}'.format(instance.username, ext)
    return os.path.join(upload_to, filename)

class User(AbstractUser):
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to=update_filename,blank = True,default='photos/default-avatar.png')
    languages = models.CharField(max_length=250,blank = False)
    email_confirm = models.BooleanField(blank=True,default=False)
    is_guide = models.BooleanField(default = False)
    is_tourist = models.BooleanField(default = False)
    
    def __str__(self):
        return self.username

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

class Guide(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    guidename = models.CharField(max_length=50,blank=True)
    places_known = models.CharField(max_length=250,blank = False)
    rating = models.IntegerField(default=0)
    amount = models.IntegerField(default=0)

    def save(self,*args,**kwargs):
        self.guidename = self.user.username
        self.user.is_guide = True
        super(Guide, self).save(*args, **kwargs)

    def __str__(self):
        return self.user.username
    

class Tourist(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    touristname = models.CharField(max_length=50,blank=True)


    def save(self,*args,**kwargs):
        self.touristname = self.user.username
        self.user.is_tourist = True
        super(Tourist, self).save(*args, **kwargs)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender=settings.AUTH_USER_MODEL, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)