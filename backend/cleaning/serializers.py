from rest_framework import serializers
from .models import Service, QuoteRequest, CorporateEnquiry, ContactMessage
class ServiceSerializer(serializers.ModelSerializer):
    class Meta: model=Service; fields="__all__"
class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta: model=QuoteRequest; fields="__all__"; read_only_fields=("status",)
class AdminQuoteRequestSerializer(serializers.ModelSerializer):
    class Meta: model=QuoteRequest; fields="__all__"
class CorporateEnquirySerializer(serializers.ModelSerializer):
    class Meta: model=CorporateEnquiry; fields="__all__"; read_only_fields=("status",)
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta: model=ContactMessage; fields="__all__"; read_only_fields=("is_resolved",)
