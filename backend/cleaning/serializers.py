from rest_framework import serializers
from django.utils import timezone
from pathlib import Path
from .models import Service, ServiceArea, AreaInterest, QuoteRequest, QuotePhoto, CorporateEnquiry, ContactMessage, Booking
class ServiceSerializer(serializers.ModelSerializer):
    class Meta: model=Service; fields="__all__"
class ServiceAreaSerializer(serializers.ModelSerializer):
    class Meta: model=ServiceArea; fields=("id","name","slug","status","description","transport_charge")
class AreaInterestSerializer(serializers.ModelSerializer):
    class Meta: model=AreaInterest; fields=("id","area_name","name","email","phone","created_at"); read_only_fields=("id","created_at")
class QuotePhotoSerializer(serializers.ModelSerializer):
    class Meta: model=QuotePhoto; fields=("id","file","original_name","created_at"); read_only_fields=fields

class QuoteRequestSerializer(serializers.ModelSerializer):
    photos=QuotePhotoSerializer(many=True,read_only=True)
    photo_uploads=serializers.ListField(child=serializers.FileField(),write_only=True,required=False,max_length=5)
    service_name=serializers.CharField(source="service.name",read_only=True)
    service_area_name=serializers.CharField(source="service_area.name",read_only=True)
    booking_id=serializers.UUIDField(source="booking.id",read_only=True,allow_null=True)

    class Meta:
        model=QuoteRequest
        fields=("id","reference","user","service","service_name","service_area","service_area_name","full_name","email","phone","location","property_type","approximate_size","bedrooms","bathrooms","preferred_date","preferred_time","frequency","notes","status","estimated_price","admin_notes","photos","photo_uploads","booking_id","created_at","updated_at")
        read_only_fields=("id","reference","user","status","estimated_price","admin_notes","booking_id","created_at","updated_at")

    def validate_photo_uploads(self,files):
        allowed={".jpg",".jpeg",".png",".webp"}
        for uploaded in files:
            if Path(uploaded.name).suffix.lower() not in allowed: raise serializers.ValidationError("Only JPG, PNG, and WebP photos are allowed.")
            if not getattr(uploaded,"content_type","").startswith("image/"): raise serializers.ValidationError(f"{uploaded.name} is not a valid image upload.")
            if uploaded.size>5*1024*1024: raise serializers.ValidationError(f"{uploaded.name} is larger than 5 MB.")
        return files

    def validate_preferred_date(self,value):
        if value and value<timezone.localdate(): raise serializers.ValidationError("Choose today or a future date.")
        return value

    def validate_service_area(self,value):
        if value.status!=ServiceArea.Status.ACTIVE: raise serializers.ValidationError("We do not currently operate in this area. You can leave your details and we’ll notify you when service becomes available.")
        return value

    def validate(self,attrs):
        attrs=super().validate(attrs)
        if not self.instance and not attrs.get("service_area"): raise serializers.ValidationError({"service_area":"Select an active service area."})
        return attrs

    def create(self,validated_data):
        files=validated_data.pop("photo_uploads",[])
        quote=super().create(validated_data)
        for file in files: QuotePhoto.objects.create(quote=quote,file=file,original_name=file.name)
        return quote

class AdminQuoteRequestSerializer(QuoteRequestSerializer):
    class Meta(QuoteRequestSerializer.Meta):
        read_only_fields=("id","reference","user","booking_id","created_at","updated_at")

    def validate(self,attrs):
        attrs=super().validate(attrs)
        status=attrs.get("status",getattr(self.instance,"status",None))
        price=attrs.get("estimated_price",getattr(self.instance,"estimated_price",None))
        if status==QuoteRequest.Status.QUOTED and not price: raise serializers.ValidationError({"estimated_price":"Enter an estimated price before sending the quote."})
        return attrs
class CorporateEnquirySerializer(serializers.ModelSerializer):
    class Meta: model=CorporateEnquiry; fields="__all__"; read_only_fields=("status",)
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta: model=ContactMessage; fields="__all__"; read_only_fields=("is_resolved",)

class BookingSerializer(serializers.ModelSerializer):
    service_name=serializers.CharField(source="service.name",read_only=True)
    service_area_name=serializers.CharField(source="service_area.name",read_only=True,allow_null=True)
    quote_reference=serializers.CharField(source="quote.reference",read_only=True,allow_null=True)
    customer_name=serializers.SerializerMethodField()
    customer_email=serializers.EmailField(source="customer.email",read_only=True)

    class Meta:
        model=Booking
        fields=("id","reference","quote","quote_reference","customer","customer_name","customer_email","service","service_name","service_area","service_area_name","service_date","service_time","location","phone","alternative_contact","notes","status","created_at","updated_at")
        read_only_fields=("id","reference","quote","quote_reference","customer","customer_name","customer_email","status","created_at","updated_at")

    def get_customer_name(self,obj) -> str:
        return obj.customer.get_full_name() or obj.customer.username

    def validate_service(self,value):
        if not value.is_active:
            raise serializers.ValidationError("This service is not currently available for booking.")
        return value

    def validate_service_area(self,value):
        if value.status!=ServiceArea.Status.ACTIVE: raise serializers.ValidationError("This service area is not currently active.")
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
        read_only_fields=("id","reference","quote","quote_reference","customer","customer_name","customer_email","created_at","updated_at")

class AdminBookingSerializer(BookingSerializer):
    status=serializers.ChoiceField(choices=Booking.Status.choices)

    class Meta(BookingSerializer.Meta):
        read_only_fields=("id","reference","quote","quote_reference","customer","customer_name","customer_email","created_at","updated_at")
