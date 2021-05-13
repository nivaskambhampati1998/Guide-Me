from django.contrib import admin
from . import models


@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('place', 'id', 'author')


@admin.register(models.Review)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('guide', 'id', 'author')


admin.site.register(models.Contact)
