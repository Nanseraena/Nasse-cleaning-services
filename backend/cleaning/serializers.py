from rest_framework import serializers
from django.utils import timezone
from .models import Service, QuoteRequest, CorporateEnquiry, ContactMessage, Booking
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

class BookingSerializer(serializers.ModelSerializer):
    service_name=serializers.CharField(source="service.name",read_only=True)
    customer_name=serializers.SerializerMethodField()
    customer_email=serializers.EmailField(source="customer.email",read_only=True)

    class Meta:
        model=Booking
        fields=("id","reference","customer","customer_name","customer_email","service","service_name","service_date","service_time","location","phone","alternative_contact","notes","status","created_at","updated_at")
        read_only_fields=("id","reference","customer","customer_name","customer_email","status","created_at","updated_at")

    def get_customer_name(self,obj) -> str:
        return obj.customer.get_full_name() or obj.customer.username

    def validate_service(self,value):
        if not value.is_active:
            raise serializers.ValidationError("This service is not currently available for booking.")
        return value

    def validate(self,attrs):
        service_date=attrs.get("service_date",getattr(self.instance,"service_date",None))
        service_time=attrs.get("service_time",getattr(self.instance,"service_time",None))
        service=attrs.get("service",getattr(self.instance,"service",None))
        if service_date and service_time:
            scheduled=timezone.make_aware(timezone.datetime.combine(service_date,service_time),timezone.get_current_timezone())
            if scheduled <= timezone.now():
                raise serializers.ValidationError({"service_date":"Choose a future booking date and time."})
            unavailable=Booking.objects.filter(service=service,service_date=service_date,service_time=service_time).exclude(status=Booking.Status.CANCELLED)
            if self.instance: unavailable=unavailable.exclude(pk=self.instance.pk)
            if unavailable.exists():
                raise serializers.ValidationError({"service_time":"That time slot is unavailable for this service. Please choose another."})
        return attrs

class CustomerBookingUpdateSerializer(BookingSerializer):
    status=serializers.ChoiceField(choices=((Booking.Status.CANCELLED,"Cancelled"),),required=False)

    class Meta(BookingSerializer.Meta):
        read_only_fields=("id","reference","customer","customer_name","customer_email","created_at","updated_at")

class AdminBookingSerializer(BookingSerializer):
    status=serializers.ChoiceField(choices=Booking.Status.choices)

    class Meta(BookingSerializer.Meta):
        read_only_fields=("id","reference","customer","customer_name","customer_email","created_at","updated_at")
