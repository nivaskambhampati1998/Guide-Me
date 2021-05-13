from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from accounts.models import Guide
from .serializers import GuideSerializer


class GuideList(generics.ListAPIView):
    queryset = Guide.objects.all()
    serializer_class = GuideSerializer


class GuideDetail(generics.RetrieveDestroyAPIView):
    queryset = Guide.objects.all()
    serializer_class = GuideSerializer
