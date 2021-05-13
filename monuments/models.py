from django.db import models
import os
# Create your models here.


def update_filename(instance, filename):
    upload_to = 'monuments'
    ext = filename.split('.')[-1]
    if instance.monument_name:
        filename = '{}.{}'.format(instance.monument_name, ext)
    return os.path.join(upload_to, filename)

class Monument(models.Model):
    monument_id = models.AutoField(primary_key = True)
    monument_name = models.CharField(max_length = 50)
    city = models.CharField(max_length = 50)
    basicinfo = models.CharField(max_length = 100)
    description = models.TextField()
    image = models.ImageField(upload_to=update_filename,blank = True)

    def __str__(self):
        return self.monument_name

