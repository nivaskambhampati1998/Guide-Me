from rest_framework import generics, views, status
from rest_framework.response import Response
from blog.models import Post, Review
from .serializers import PostSerializer, CurrentPostSerializer
from accounts.models import User
from monuments.models import Monument


class PostList(views.APIView):
    def get(self, request):
        try:
            data = Post.objects.all()
            serializer = PostSerializer(data, many=True)
            return Response(data=serializer.data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        data = request.data
        author = User.objects.get(username = data['author']).pk
        data['author'] = author
        place = Monument.objects.get(monument_name = data['place']).pk
        data['place'] = place

        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CurrentPostReview(generics.ListAPIView):

    serializer_class = CurrentPostSerializer

    def get_queryset(self):
        # try:
        guidePk = self.kwargs['slug']
        return Post.objects.filter(place__monument_id = guidePk)

""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""