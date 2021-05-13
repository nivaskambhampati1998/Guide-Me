from django.shortcuts import render

# Create your views here.
from rest_framework import generics, views, status
from rest_framework.response import Response
from blog.models import Review
from .serializers import ReviewSerializer, ReviewGuideSerializer
from accounts.models import Guide, User, Tourist

# class ReviewList(generics.ListAPIView):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer
class ReviewList(views.APIView):
    def get(self, request):
        try:
            data = Review.objects.all()
            serializer = ReviewSerializer(data, many=True)
            return Response(data=serializer.data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        data=request.data
        guideobj = Guide.objects.get(guidename=data['guide'])
        guide = Guide.objects.get(guidename=data['guide']).pk
        data['guide'] = guide
        author = Tourist.objects.get(touristname = data['author']).pk
        data['author'] = author

        b = Review.objects.all()
        a = 0
        for i in b:
            a += i.rating
        guideobj.rating = a/len(b)
        guideobj.save()

        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class CurrentUserReview(generics.ListAPIView):

    serializer_class = ReviewGuideSerializer

    def get_queryset(self):
        # try:
        guidename = self.kwargs['guidename']
        return Review.objects.filter(guide__guidename = guidename)
        # except:
        #     return Respose(status = status.40)