from rest_framework import serializers
from blog.models import Post, Review
from accounts.models import User
from monuments.models import Monument

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'place', 'author', 'details', 'review')
        model = Post
    
    def to_representation(self, instance):
        rep = super(PostSerializer, self).to_representation(instance)
        rep['place'] = instance.place.monument_name
        rep['author'] = instance.author.username
        return rep

class CurrentPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['details','review','author']

    def to_representation(self, instance):
        rep = super(CurrentPostSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username
        return rep
