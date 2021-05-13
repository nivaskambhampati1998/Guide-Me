from rest_framework import serializers

from posting.models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = BlogPost

        fields = [
           'url',
           'pk',
           'user',
           'city',
           'title',
           'content',
           'timestamp',
        ]

    def get_url(self, obj):
        print(obj,"---------------------------------------------------")
        request = self.context.get("request")
        return obj.get_api_url(request=request)

    def validate_title(self, value):
        qs = BlogPost.objects.filter(title__iexact=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("The title has already used.")
        return value