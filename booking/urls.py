from .views import BookingsList,BookingsDone, save_stripe_info, CurrentUserBooking, DeleteBooking
from django.urls import path

urlpatterns = [
    path('getbooking/',BookingsDone.as_view(),name="BookingsMaking"),
    path('getbooking/<slug:slug>/',CurrentUserBooking.as_view(),name="BookingsMaking"),
    path('<str:place>/<slug:date>/', BookingsList.as_view(), name="BookingDetail"),
    path('getbooking/delete/<slug:slug>/', DeleteBooking.as_view(), name="DeleteBooking"),
    path('save-stripe-info/', save_stripe_info),
]