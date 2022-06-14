from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.conf import settings
from django.db.models.fields.related import ForeignKey
from django.contrib.auth.models import AbstractUser,BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, username,email,password):
        if not username:
            raise ValueError("Users must have an email address")
        if not email:
            raise ValueError("Users must have an email")

        user = self.model(
                username=username,
                email = self.normalize_email(email)
            )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,username,email,password):
        user = self.create_user(
            email       = self.normalize_email(email),
            username    = username,
            password    = password
        )

        user.is_admin       = True
        user.is_staff       = True 
        user.is_superuser   = True
        
        user.save()
        return user


class User(AbstractUser):
    username            = models.CharField(verbose_name="username",max_length=30, primary_key=True)
    email               = models.EmailField(verbose_name= "email", max_length=60,unique=True)
    date_joined         = models.DateTimeField(verbose_name='date joined',auto_now_add=True)
    last_login          = models.DateTimeField(verbose_name='last login', auto_now_add=True)
    is_admin            = models.BooleanField(default=False)
    is_active           = models.BooleanField(default=True)
    is_staff            = models.BooleanField(default=False)
    is_superuser        = models.BooleanField(default=False)

    USERNAME_FIELD  = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    def __str__(self):
        return self.username

    def is_Admin(self,perm,obj=None):
        return self.is_admin

    def get_Username(self):
        return self.username

    def get_Email(self):
        return self.email

class Item(models.Model):
    STATES = (
        ('S','Sold'),
        ('U','Unsold')
    )

    title       = models.CharField(max_length=200,primary_key=True)
    description = models.CharField(max_length=2000)
    price       = models.FloatField(default=0)
    status      = models.CharField(max_length=1,choices=STATES)
    owner       = models.ForeignKey(settings.AUTH_USER_MODEL, null = True, on_delete=models.SET_NULL)
    prev_owner  = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='was_owned_by',null = True, on_delete=models.SET_NULL)
    date_pub    = models.DateTimeField(auto_now_add=True)

    def get_Title(self):
        return self.title
    
    def __str__(self):
        return self.title

    def title_is_empty(self):
        return self.title == ''

    def get_items(self,num=1):
        item = [Item.objects.first()]
        return item
              
    def get_owner_username(self):
        return self.owner.get_username()

    