from django.contrib import admin
from django.contrib.auth.admin import UserAdmin 
from .models import Item, User
# Register your models here.

admin.site.register(User,UserAdmin)
admin.site.register(Item)