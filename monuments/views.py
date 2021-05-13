from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from monuments.models import Monument
from .serializers import MonumentSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView


# Create your views here.
class MonumentList(APIView):
    def get(self, request):
        try:
            data = Monument.objects.all()
            serializer = MonumentSerializer(data, many=True)
            return Response(data=serializer.data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = MonumentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class MonumentDetail(APIView):
    def get(self, request, slug):
        try:
            hdata = Monument.objects.get(monument_id=slug)
            serializer = MonumentSerializer(hdata)
            return Response(serializer.data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, slug):
        hdata = Monument.objects.get(monument_id=slug)
        serializer = MonumentSerializer(hdata, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug):
        hdata = Monument.objects.get(monument_id=slug)
        delresult = hdata.delete()
        data = {'message': 'error during deletion'}
        if delresult[0] == 1:
            data = {'message': 'successfully deleted'}
        return Response(data)
