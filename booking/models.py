from django.db import models
from accounts.models import Guide
from accounts.models import Tourist

class Bookings(models.Model):
    booking_id = models.AutoField(primary_key = True)
    guidename = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    booking_date = models.DateField()
    place = models.CharField(max_length = 50,default='')
    city = models.CharField(max_length = 50,default='')
    booking_status = models.CharField(max_length=50)

    def __str__(self):
        return self.guidename+'_'+self.place +'_'+str(self.booking_date)+'_'+self.username