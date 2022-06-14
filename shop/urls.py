from django.contrib import admin
from django.urls import path,re_path
from django.views.generic import TemplateView
from . import views

from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [

 # GET requests 
    path('', views.frontpage, name='frontpage'),
    path('shop/', TemplateView.as_view(template_name="index.html"), name = 'shop'),
    path('shop/itemList/<int:page_index>',views.items),
    path('shop/itemListSearch/<slug:search>/<int:page_index>',views.items_from_search),
    path('shop/itemListSearchLogged/<slug:search>/<slug:owner>/<int:page_index>',views.items_from_search_logged),
    path('shop/itemListSale/<slug:owner>/',views.items_for_sale),
    path('shop/itemListBought/<slug:owner>/',views.items_bought),
    path('shop/itemListLogged/<slug:owner>/<int:page_index>',views.items_logged),
    path('shop/itemListSold/<slug:owner>/',views.items_sold),

    # POST requests
    path('api/shop/login',views.login),
    path('api/shop/signup',views.signup),
    path('api/shop/logout',views.BlacklistTokenView.as_view()),
    path('api/shop/additem/<slug:owner>/',views.add_item),
    path('api/shop/resetpass/<slug:user>/',views.reset_pass),
    path('api/shop/setPrice/',views.set_price),
    path('api/shop/pay',views.pay),


    #Token views
    path('api/token/',TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),

   re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html"))

]
