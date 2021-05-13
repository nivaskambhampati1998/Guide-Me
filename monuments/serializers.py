from rest_framework import serializers
from monuments.models import Monument

class MonumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monument
        fields = ('monument_id','monument_name', 'city','basicinfo', 'description','image')
