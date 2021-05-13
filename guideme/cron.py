from django.conf import settings
from django.core.mail import send_mail
from accounts.models import User
from booking.models import Bookings
from django_cron import CronJobBase, Schedule

import time
from datetime import date

class MyCronJob(CronJobBase):

    RUN_EVERY_MINS = 0 if settings.DEBUG else 0   # 6 hours when not DEBUG
    RETRY_AFTER_FAILURE_MINS = 5
    
    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)

    # schedule = Schedule(run_every_mins=RUN_EVERY_MINS, retry_after_failure_mins=RETRY_AFTER_FAILURE_MINS)
    code = 'cron.MyCronJob'

    def do(self):
        b = Bookings.objects.all()
        for i in b:
            d0 = i.booking_date
            d1 = date.today()
            delta = d0 - d1
            if (delta.days == 0):
                guide = User.objects.get(username=i.guidename)
                user = User.objects.get(username=i.username)
                try:
                    guidebody = "Hi "+user.username+",\nHave a nice trip today. \nYour booking details: "+str(i.booking_id)+"\nGuide: "+i.guidename+"\nPlace: "+i.place+"\nEmail id: "+guide.email+"\nEnjoy :)"
                    send_mail('GuidMe: Booking Information',guidebody,'projectguy.temp@gmail.com',[user.email,])
                except:
                    print("Booking id: "+str(i.booking_id)+" user email incorrect")                
                try:
                    userbody = "Hi "+user.username+",\nHave a nice trip today. \nYour booking details: "+str(i.booking_id)+"\nGuide: "+i.username+"\nPlace: "+i.place+"\nEmail id: "+user.email+"\nEnjoy :)"
                    send_mail('GuidMe: Touirst Informamtion',userbody,'projectguy.temp@gmail.com',[guide.email,])
                except:
                    print("Booking id: "+str(i.booking_id)+" guide email incorrect") 