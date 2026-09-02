from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers as schema_serializers
from .models import Service, QuoteRequest, CorporateEnquiry, ContactMessage, Booking
from .serializers import ServiceSerializer, QuoteRequestSerializer, AdminQuoteRequestSerializer, CorporateEnquirySerializer, ContactMessageSerializer, BookingSerializer, CustomerBookingUpdateSerializer, AdminBookingSerializer

def user_payload(user):
    return {"id":user.id,"username":user.username,"email":user.email,"first_name":user.first_name,"last_name":user.last_name,"is_staff":user.is_staff,"profile_picture":None}

def set_auth_cookies(response, access, refresh=None):
    opts={"httponly":True,"secure":settings.COOKIE_SECURE,"samesite":"Lax","path":"/"}
    response.set_cookie("access_token",str(access),max_age=30*60,**opts)
    if refresh is not None: response.set_cookie("refresh_token",str(refresh),max_age=7*24*60*60,**opts)

class LoginView(APIView):
    permission_classes=[permissions.AllowAny]
    @extend_schema(
        tags=["Authentication"],
        summary="Sign in and set authentication cookies",
        description="Enter staff credentials. The response sets HttpOnly access_token and refresh_token cookies. Swagger UI keeps them and sends access_token automatically with protected requests.",
        request=inline_serializer(name="LoginRequest",fields={"identifier":schema_serializers.CharField(help_text="Email address or username"),"password":schema_serializers.CharField(write_only=True)}),
        responses={200:inline_serializer(name="LoginResponse",fields={"user":schema_serializers.DictField()})},
        auth=[],
    )
    def post(self,request):
        identifier=(request.data.get("identifier") or request.data.get("username") or "").strip()
        username=identifier
        if "@" in identifier:
            matched=get_user_model().objects.filter(email__iexact=identifier).first()
            if matched: username=matched.username
        user=authenticate(username=username,password=request.data.get("password"))
        if not user: return Response({"detail":"Invalid credentials"},status=status.HTTP_401_UNAUTHORIZED)
        refresh=RefreshToken.for_user(user); response=Response({"user":user_payload(user)})
        set_auth_cookies(response,refresh.access_token,refresh); return response

class SignupView(APIView):
    permission_classes=[permissions.AllowAny]
    @extend_schema(
        tags=["Authentication"],summary="Create a customer account",
        request=inline_serializer(name="SignupRequest",fields={"full_name":schema_serializers.CharField(),"email":schema_serializers.EmailField(),"password":schema_serializers.CharField(write_only=True,min_length=8)}),
        responses={201:inline_serializer(name="SignupResponse",fields={"user":schema_serializers.DictField()})},auth=[]
    )
    def post(self,request):
        full_name=(request.data.get("full_name") or "").strip()
        email=(request.data.get("email") or "").strip().lower()
        password=request.data.get("password") or ""
        if not full_name or not email or len(password)<8:
            return Response({"detail":"Full name, a valid email, and a password of at least 8 characters are required."},status=400)
        User=get_user_model()
        if User.objects.filter(Q(email__iexact=email)|Q(username__iexact=email)).exists():
            return Response({"email":["An account with this email already exists."]},status=400)
        names=full_name.split(maxsplit=1)
        user=User.objects.create_user(username=email,email=email,password=password,first_name=names[0],last_name=names[1] if len(names)>1 else "")
        refresh=RefreshToken.for_user(user); response=Response({"user":user_payload(user)},status=201)
        set_auth_cookies(response,refresh.access_token,refresh); return response

class RefreshView(APIView):
    permission_classes=[permissions.AllowAny]
    @extend_schema(tags=["Authentication"],summary="Refresh authentication cookies",request=None,responses={200:inline_serializer(name="RefreshResponse",fields={"ok":schema_serializers.BooleanField()})})
    def post(self,request):
        raw=request.COOKIES.get("refresh_token")
        if not raw: return Response({"detail":"No refresh token"},status=401)
        try:
            old=RefreshToken(raw); user_id=old["user_id"]
            from django.contrib.auth import get_user_model
            user=get_user_model().objects.get(pk=user_id); new=RefreshToken.for_user(user); response=Response({"ok":True}); set_auth_cookies(response,new.access_token,new); return response
        except Exception: return Response({"detail":"Session expired"},status=401)

class LogoutView(APIView):
    @extend_schema(tags=["Authentication"],summary="Sign out and clear authentication cookies",request=None,responses={204:None})
    def post(self,request):
        response=Response(status=204); response.delete_cookie("access_token",path="/"); response.delete_cookie("refresh_token",path="/"); return response
class MeView(APIView):
    permission_classes=[permissions.IsAuthenticated]
    @extend_schema(tags=["Authentication"],summary="Get the authenticated user",responses={200:inline_serializer(name="CurrentUser",fields={"id":schema_serializers.IntegerField(),"username":schema_serializers.CharField(),"email":schema_serializers.EmailField(),"first_name":schema_serializers.CharField(),"last_name":schema_serializers.CharField()})})
    def get(self,request): return Response(user_payload(request.user))
class ServiceListView(generics.ListAPIView):
    permission_classes=[permissions.AllowAny]; serializer_class=ServiceSerializer
    def get_queryset(self): return Service.objects.filter(is_active=True).order_by("category","name")
class ServiceDetailView(generics.RetrieveAPIView):
    permission_classes=[permissions.AllowAny]; serializer_class=ServiceSerializer; lookup_field="slug"
    queryset=Service.objects.filter(is_active=True)
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

class CustomerBookingListCreateView(generics.ListCreateAPIView):
    permission_classes=[permissions.IsAuthenticated]; serializer_class=BookingSerializer
    def get_queryset(self): return Booking.objects.filter(customer=self.request.user).select_related("service","customer")
    def perform_create(self,serializer): serializer.save(customer=self.request.user)

class CustomerBookingDetailView(generics.RetrieveUpdateAPIView):
    permission_classes=[permissions.IsAuthenticated]
    def get_queryset(self): return Booking.objects.filter(customer=self.request.user).select_related("service","customer")
    def get_serializer_class(self): return BookingSerializer if self.request.method=="GET" else CustomerBookingUpdateSerializer

class AdminBookingListView(generics.ListAPIView):
    permission_classes=[permissions.IsAdminUser]; serializer_class=AdminBookingSerializer
    queryset=Booking.objects.select_related("service","customer").all()

class AdminBookingDetailView(generics.RetrieveUpdateAPIView):
    permission_classes=[permissions.IsAdminUser]; serializer_class=AdminBookingSerializer
    queryset=Booking.objects.select_related("service","customer").all()
