from rest_framework import serializers
from accounts.models import Guide


class GuideSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ( 'guidename', 'places_known')
        model = Guide
        