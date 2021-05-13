from rest_framework import serializers
from blog.models import Review
from accounts.models import Guide

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','guide', 'author', 'review', 'rating')
        model = Review

    def to_representation(self, instance):
        rep = super(ReviewSerializer, self).to_representation(instance)
        rep['guide'] = instance.guide.guidename
        rep['author'] = instance.author.user.username
        return rep

class ReviewGuideSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = ['rating','review','author']

    def to_representation(self, instance):
        rep = super(ReviewGuideSerializer, self).to_representation(instance)
        rep['author'] = instance.author.user.username
        return rep
