from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from booking.models import Bookings
from accounts.models import Guide
from .serializers import BookingsSerializerGuide,BookingsSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from accounts.models import Guide
from rest_framework.generics import ListCreateAPIView, ListAPIView                                                                               
from .models import Bookings
from datetime import datetime

import stripe
from rest_framework.decorators import api_view

stripe.api_key = 'sk_test_51Hss5uLJ8P6R9Spj2eVZVlzK483kD6KNs4wlajJu1WIJisSumZD5ybroUF1UGpbY6RjSlHH8NwJfqBo7VbKmmQgA00rwHTPC3U'


@api_view(['POST'])
def save_stripe_info(request):

    data = request.data
    email = data['email']
    payment_method_id = data['payment_method_id']
    extra_msg = ''
    # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data

    if len(customer_data) == 0:
        # creating customer
        customer = stripe.Customer.create(
            email=email,
            payment_method=payment_method_id,
            invoice_settings={
                'default_payment_method': payment_method_id
            }
        )
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed."


    # creating paymentIntent
    stripe.PaymentIntent.create(customer=customer,
                                payment_method=payment_method_id,
                                currency='inr', amount=data['amount']*100,
                                description='GuideMe',
                                confirm=True)
    if(status.HTTP_200_OK):
        b = Bookings()
        b.guidename = data['guidename']
        b.username = data['username']
        b.booking_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        b.city = data['city']
        b.place = data['place']
        b.booking_status = 'Success'
        b.save()

    return Response(status=status.HTTP_200_OK, data={'message': 'Success', 'data': {'customer_id': customer.id,
                                                                                    'extra_msg': extra_msg}})



class BookingsList(APIView):
    def get(self, request,**kwargs):
        try:
            data1 = Guide.objects.filter()
            data = []
            placename=self.kwargs.get('place')
            for i in data1:
                if placename in i.places_known:
                    data.append(i)
            tempdata= Bookings.objects.filter(booking_date=self.kwargs.get('date'))
            newdata= []
            for i in data:
                count=0
                for j in tempdata:
                    # print(type(i.guidename),type(j.guidename.guidename))
                    if j.guidename ==i.guidename:
                        # print(1)
                        count+=1
                if count==0:
                    newdata.append(i)
            serializer = BookingsSerializerGuide(newdata, many=True)
            return Response(data=serializer.data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class DeleteBooking(APIView):

    def delete(self,request,slug):
        print(slug,'-----------------------------------------')
        b = Bookings.objects.get(booking_id = slug)
        delresult = b.delete()
        data = {'message': 'error during deletion'}
        if delresult[0] == 1:
            data = {'message': 'successfully deleted'}
        return Response(data)

    # def post(self, request, *args, **kwargs):
    #     serializer = BookingsSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         print('error', serializer.errors)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookingsDone(ListCreateAPIView):
    queryset=Bookings.objects.all()
    serializer_class=BookingsSerializer

class CurrentUserBooking(ListAPIView):

    serializer_class = BookingsSerializer

    def get_queryset(self):
        # try:
        user = self.kwargs['slug']
        i = Bookings.objects.filter(username = user)
        print(i)
        return i
