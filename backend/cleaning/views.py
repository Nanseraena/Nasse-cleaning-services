from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Service, QuoteRequest, CorporateEnquiry, ContactMessage
from .serializers import ServiceSerializer, QuoteRequestSerializer, AdminQuoteRequestSerializer, CorporateEnquirySerializer, ContactMessageSerializer

def user_payload(user):
    return {"id":user.id,"username":user.username,"email":user.email,"first_name":user.first_name,"last_name":user.last_name}

def set_auth_cookies(response, access, refresh=None):
    opts={"httponly":True,"secure":settings.COOKIE_SECURE,"samesite":"Lax","path":"/"}
    response.set_cookie("access_token",str(access),max_age=30*60,**opts)
    if refresh is not None: response.set_cookie("refresh_token",str(refresh),max_age=7*24*60*60,**opts)

class LoginView(APIView):
    permission_classes=[permissions.AllowAny]
    def post(self,request):
        user=authenticate(username=request.data.get("username"),password=request.data.get("password"))
        if not user or not user.is_staff: return Response({"detail":"Invalid credentials"},status=status.HTTP_401_UNAUTHORIZED)
        refresh=RefreshToken.for_user(user); response=Response({"user":user_payload(user)})
        set_auth_cookies(response,refresh.access_token,refresh); return response

class RefreshView(APIView):
    permission_classes=[permissions.AllowAny]
    def post(self,request):
        raw=request.COOKIES.get("refresh_token")
        if not raw: return Response({"detail":"No refresh token"},status=401)
        try:
            old=RefreshToken(raw); user_id=old["user_id"]
            from django.contrib.auth import get_user_model
            user=get_user_model().objects.get(pk=user_id); new=RefreshToken.for_user(user); response=Response({"ok":True}); set_auth_cookies(response,new.access_token,new); return response
        except Exception: return Response({"detail":"Session expired"},status=401)

class LogoutView(APIView):
    def post(self,request):
        response=Response(status=204); response.delete_cookie("access_token",path="/"); response.delete_cookie("refresh_token",path="/"); return response
class MeView(APIView):
    permission_classes=[permissions.IsAdminUser]
    def get(self,request): return Response(user_payload(request.user))
class ServiceListView(generics.ListAPIView):
    permission_classes=[permissions.AllowAny]; serializer_class=ServiceSerializer
    def get_queryset(self): return Service.objects.filter(is_active=True).order_by("category","name")
class QuoteCreateView(generics.CreateAPIView):
    permission_classes=[permissions.AllowAny]; serializer_class=QuoteRequestSerializer; queryset=QuoteRequest.objects.all()
class CorporateEnquiryCreateView(generics.CreateAPIView):
    permission_classes=[permissions.AllowAny]; serializer_class=CorporateEnquirySerializer; queryset=CorporateEnquiry.objects.all()
class ContactMessageCreateView(generics.CreateAPIView):
    permission_classes=[permissions.AllowAny]; serializer_class=ContactMessageSerializer; queryset=ContactMessage.objects.all()
class AdminQuoteListView(generics.ListAPIView):
    permission_classes=[permissions.IsAdminUser]; serializer_class=AdminQuoteRequestSerializer; queryset=QuoteRequest.objects.all().order_by("-created_at")
class AdminQuoteDetailView(generics.RetrieveUpdateAPIView):
    permission_classes=[permissions.IsAdminUser]; serializer_class=AdminQuoteRequestSerializer; queryset=QuoteRequest.objects.all()
class AdminCorporateListView(generics.ListAPIView):
    permission_classes=[permissions.IsAdminUser]; serializer_class=CorporateEnquirySerializer; queryset=CorporateEnquiry.objects.all().order_by("-created_at")
class AdminContactListView(generics.ListAPIView):
    permission_classes=[permissions.IsAdminUser]; serializer_class=ContactMessageSerializer; queryset=ContactMessage.objects.all().order_by("-created_at")
