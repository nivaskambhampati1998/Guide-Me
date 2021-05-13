from rest_framework import serializers,generics
from .models import User,Guide,Tourist
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username','email','first_name','last_name','password','avatar','languages','is_guide','is_tourist','is_staff']    
        extra_kwargs = {'password': {'write_only': True}}    

    def create(self, validated_data):
        user = User(
            email = validated_data["email"],
            username = validated_data["username"],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            languages = validated_data['languages'],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class RegisterGuideSerializer(serializers.ModelSerializer):
    
    user = UserSerializer()
    class Meta:
        model = Guide
        fields = ['user','rating','places_known','amount']
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        # user, c = User.objects.get_or_create(**user_data)
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        guide, created = Guide.objects.update_or_create(user=user,**validated_data)
        return guide,user
    

class RegisterTouristSerializer(serializers.HyperlinkedModelSerializer):
    
    user = UserSerializer()

    class Meta:
        model = Tourist
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        tourist, created = Tourist.objects.update_or_create(user=user,**validated_data)
        return tourist,user

class UpdateUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        fields = ['first_name','last_name','avatar','languages']
        model = User


class LoginSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(max_length=50, min_length=3)
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    
    def validate(self, attrs):
        username = attrs.get('username',None),
        password = attrs.get('password',None)

        user = auth.authenticate(username=username[0],password=password)

        if not user:
            raise AuthenticationFailed('Invalid Credentials try again')

        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        return {
            'username':user.username,
            'tokens': user.tokens
        }
        return super().validate(attrs)
    
    class Meta:
        model = User
        fields = ['username','password','tokens']


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    #redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']


    
class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    confirmpassword = serializers.CharField(
        min_length=6, max_length=68, write_only=True)   
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password','confirmpassword', 'token', 'uidb64']

    def validate(self, attrs):
        password=''
        confirmpassword=''
        token=''
        uidb64=''
        user=''
        try:
            password = attrs.get('password')
            confirmpassword=attrs.get('confirmpassword','')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')
            if not password==confirmpassword:
                raise AuthenticationFailed('Passwords do not match')
            else:

                id = force_str(urlsafe_base64_decode(uidb64))
                user = User.objects.get(id=id)

                if not PasswordResetTokenGenerator().check_token(user, token):
                    raise AuthenticationFailed('The reset link is invalid', 401)

           


                user.set_password(password)
                user.save()

                return (user)
        except Exception as e:
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)
            
        return super().validate(attrs)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')            
               
       

        