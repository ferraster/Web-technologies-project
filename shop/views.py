from django.shortcuts import render
from django.http import JsonResponse
from shop.models import Item,User
from django.contrib.auth import authenticate
import json

from django.db.models import Q
 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework.permissions import AllowAny

from django.core.mail import send_mail


# Auxiliary functions

def populate():
    Item.objects.all().delete()
    User.objects.all().delete()

    users = []
    for i in range(6):
        users.append(User.objects.create_user("testuser" + str(i),"testuser"+str(i)+"@shop.aa","pass" + str(i)))
   
    items = []
    for i in range(10):
        item = Item("Movie1"+str(i),"Some random movie",i*10+1,'U',"testuser1")
        item.save()

    for i in range(10):
        item = Item("Movie2"+str(i),"Some random movie",i*10+1,'U',"testuser2")
        item.save()

    for i in range(10):
        item = Item("Movie3"+str(i),"Some random movie",i*10+1,'U',"testuser3")
        item.save()


def item_list_from_query(query_result,page_index = -1):
    
    response        = {}

    if(page_index != -1):
        num_items_page  = 10
        start           = page_index*num_items_page 
        stop            = min((page_index+1)*num_items_page,len(query_result))

        # Calcule the number of pages that will be necessary
        num_page = len(query_result) / float(num_items_page)

        if((num_page - num_page // 1) != 0.0 ):
            num_page = (num_page // 1) 
        else:
            num_page = (num_page // 1) - 1 

        if(len(query_result) != 0):
            response['end_items'] = (num_page == page_index) 

    else:
        start = 0
        stop =  len(query_result)

    for item in query_result[start:stop]:
        if(item.prev_owner):
            prev_owner = item.prev_owner.username
        else:
            prev_owner = "null"

        item_dic = {
            'title'     : item.title,
            'desc'      : item.description,
            'price'     : item.price,
            'status'    : item.status,
            'owner'     : item.owner.username,
            'date_pub'  : item.date_pub.strftime("%d/%m/%Y"),
            'time_pub'  : item.date_pub.strftime("%H:%M:%S"),
            'status'    : item.status,
            'prev_owner': prev_owner
        }
        response[item.title] = item_dic
    
    return response



#######################
# The views are here. #
#######################


def frontpage(request):

    if(request.method == 'POST' ):
        populate()
        new_db = True
    else: 
        new_db = False

    num_items = Item.objects.all().count()
    num_users = User.objects.filter(is_active = True).count()
    context = {'num_items': num_items, 
                'num_users' : num_users,
                'new_db' : new_db}
    return render(request, 'shop/frontpage.html',context)



def items(request, page_index):
    query = Item.objects.filter(status = 'U').order_by('-date_pub')
    response = item_list_from_query(query,page_index)
    return JsonResponse(response)


def items_from_search(request,search,page_index):
    if(search == "none"):
        search2 = ""
    else:
        search2 = search

    reg_xpr ="[a-z,0-9]*"+search2+"[a-z,0-9]*"

    query = Item.objects.filter(status = 'U').filter(title__iregex =reg_xpr).order_by('-date_pub')
    response = item_list_from_query(query,page_index)
    return JsonResponse(response)

def items_from_search_logged(request,search,owner,page_index):
    if(search == "none"):
        search2 = ""
    else:
        search2 = search

    reg_xpr ="[a-z,0-9]*"+search2+"[a-z,0-9]*"

    query = Item.objects.filter(Q(prev_owner = owner) | Q(status = 'U')).filter(title__iregex =reg_xpr).order_by('-date_pub')    
    response = item_list_from_query(query,page_index)
    return JsonResponse(response)

def items_logged(request,owner,page_index):
    query = Item.objects.filter(Q(prev_owner = owner) | Q(status = 'U')).order_by('-date_pub')
    response = item_list_from_query(query,page_index)
    return JsonResponse(response)


def login(request):

    body = json.loads(request.body)

    username = body['username']
    password = body['password']

    user = authenticate(username = username, password = password)
    correctLogin = (user is not None)

    response = {'loginResult':correctLogin}

    return JsonResponse(response)


def signup(request):
    body = json.loads(request.body.decode('utf-8'))

    email      = body['email']
    username   = body['username']
    password   = body['password']  

    msg = ""
    success = True

    users = [(lambda user: user.get_Username())(user) for user in User.objects.filter(username = username)]
    if(username in users):
        msg = "Username already in use"
        success = False

    emails = [(lambda email: user.get_Email())(user) for user in User.objects.filter(email = email)]
    if(email in emails):
        msg = "Email already in use"
        success = False

    if(success):
        u = User.objects.create_user(username,email,password)
        u.save()
    

    response = {"msg": msg,
                "success": success}


    return JsonResponse(response)

def items_for_sale(request,owner):
    query = Item.objects.filter(owner = owner).filter(status = 'U')
    response = item_list_from_query(query)
    return JsonResponse(response)

def items_bought(request,owner):
    query = Item.objects.filter(owner = owner).filter(status = 'S')
    response = item_list_from_query(query)
    return JsonResponse(response)

def items_sold(request,owner):
    query = Item.objects.filter(prev_owner = owner) 
    response = item_list_from_query(query)
    return JsonResponse(response)







def add_item(request,owner):
    body = json.loads(request.body.decode('utf-8'))

    title           = body['title']
    description     = body['description']
    price           = body['price']  


    msg = ""
    success = True

    titles = [(lambda item: item.get_Title())(item) for item in Item.objects.filter(title = title)]
    if(title in titles):
        msg = "Title already in use"
        success = False

    if(success):
        item = Item(title,description,price,'U',owner)
        item.save()
    
    response = {
        "msg": msg,
        "success":success
    }

    return JsonResponse(response)


def reset_pass(request,user):
    body = json.loads(request.body.decode('utf-8'))

    old_pass = body['oldPass']
    new_pass = body['newPass']

    msg = ""
    success = True

    user = authenticate(username = user, password = old_pass )

    if user is not None:
        user.set_password(new_pass)
        user.save()
        success = True
    else:
        msg     = "Wrong password"
        success = False

    response = {"msg":msg, "success":success}

    return JsonResponse(response)

def set_price(request):
    body = json.loads(request.body.decode('utf-8'))

    title = body['title']
    price = body['newPrice']

    item = Item.objects.filter(title = title).first()
    item.price = price
    item.save()

    response = {"msg" : "", "success": True }

    return JsonResponse(response)


def pay(request):
    body = json.loads(request.body.decode('utf-8'))

    
    check_against_db = True
    msg = ""
    for i in  range(len(body)):
        title = body[str(i)]['title']
        price = body[str(i)]['price']

        item = Item.objects.filter(title = title).first()
        if(item.price != float(price) and item.status == 'U'):
            msg = msg + "%" + title + ":NEWPRICE="+str(item.price)
            check_against_db = False
        elif(item.status == 'S'):
            msg = msg + "%" + title + ":SOLD"  
            check_against_db = False

    msg = msg[1:]

    if(check_against_db):
        for i in  range(len(body)):
            title = body[str(i)]['title']
            owner = body[str(i)]['owner']
            buyer = body[str(i)]['buyer']

            item = Item.objects.get(title = title)

            buyer = User.objects.filter(username = buyer).first()
            seller= User.objects.filter(username = owner).first()

            item.owner      = buyer
            item.prev_owner = seller
            item.status     = 'S'
            item.save()

            send_mail(buyer.email,
                      "You have bought the item "+title, 
                      "no-reply@notflix.com",
                      [buyer.email],
                      fail_silently=False
                      )

            send_mail(seller.email,
                      "Your item "+title+" has been bought",
                      "no-reply@notflix.com",
                      [seller.email],
                      fail_silently=False
                      )   
        
    
    response = {"msg": msg, "success":check_against_db} 

    return JsonResponse(response)


#########################
# The classes are here. #
#########################





class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status = status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)