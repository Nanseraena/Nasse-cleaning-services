import uuid
from django.conf import settings
from django.db import models

def generate_quote_reference(): return f"NAS-Q-{uuid.uuid4().hex[:8].upper()}"

class TimeStampedModel(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    class Meta: abstract=True

class Service(TimeStampedModel):
    class Category(models.TextChoices):
        RESIDENTIAL="RESIDENTIAL","Residential"
        COMMERCIAL="COMMERCIAL","Commercial"
        POST_CONSTRUCTION="POST_CONSTRUCTION","Post-construction"
        FACILITY_CARE="FACILITY_CARE","Facility care"
    name=models.CharField(max_length=120)
    slug=models.SlugField(unique=True)
    category=models.CharField(max_length=32,choices=Category.choices)
    short_description=models.CharField(max_length=240)
    description=models.TextField(blank=True)
    is_active=models.BooleanField(default=True)
    def __str__(self): return self.name

class ServiceArea(TimeStampedModel):
    class Status(models.TextChoices):
        ACTIVE="active","Active"
        INACTIVE="inactive","Inactive"
        COMING_SOON="coming_soon","Coming soon"
    name=models.CharField(max_length=120)
    slug=models.SlugField(unique=True,help_text="Must match the Uganda district slug used on the coverage map.")
    status=models.CharField(max_length=20,choices=Status.choices,default=Status.INACTIVE)
    description=models.TextField(blank=True)
    transport_charge=models.DecimalField(max_digits=12,decimal_places=0,default=0)
    def __str__(self): return self.name

class AreaInterest(TimeStampedModel):
    area_name=models.CharField(max_length=120)
    name=models.CharField(max_length=120)
    email=models.EmailField()
    phone=models.CharField(max_length=40,blank=True)
    is_notified=models.BooleanField(default=False)
    def __str__(self): return f"{self.area_name} — {self.email}"

class QuoteRequest(TimeStampedModel):
    class Status(models.TextChoices):
        NEW="NEW","Under review"; CONTACTED="CONTACTED","Contacted"; QUOTED="QUOTED","Estimate sent"; ACCEPTED="ACCEPTED","Accepted"; DECLINED="DECLINED","Declined"
    reference=models.CharField(max_length=24,unique=True,editable=False,default=generate_quote_reference)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="quote_requests",null=True,blank=True)
    service=models.ForeignKey(Service,on_delete=models.SET_NULL,null=True,blank=True,related_name="quotes")
    service_area=models.ForeignKey(ServiceArea,on_delete=models.PROTECT,null=True,blank=True,related_name="quotes")
    full_name=models.CharField(max_length=120); email=models.EmailField(); phone=models.CharField(max_length=40); location=models.CharField(max_length=180)
    property_type=models.CharField(max_length=120,blank=True); approximate_size=models.CharField(max_length=120,blank=True); preferred_date=models.DateField(null=True,blank=True)
    preferred_time=models.TimeField(null=True,blank=True); bedrooms=models.PositiveSmallIntegerField(null=True,blank=True); bathrooms=models.PositiveSmallIntegerField(null=True,blank=True)
    frequency=models.CharField(max_length=50,blank=True); notes=models.TextField(blank=True); status=models.CharField(max_length=20,choices=Status.choices,default=Status.NEW)
    estimated_price=models.DecimalField(max_digits=12,decimal_places=0,null=True,blank=True); admin_notes=models.TextField(blank=True)

    def save(self,*args,**kwargs):
        if not self.reference: self.reference=generate_quote_reference()
        super().save(*args,**kwargs)

class QuotePhoto(TimeStampedModel):
    quote=models.ForeignKey(QuoteRequest,on_delete=models.CASCADE,related_name="photos")
    file=models.FileField(upload_to="quote_photos/%Y/%m/")
    original_name=models.CharField(max_length=255)

    def __str__(self): return self.original_name

class CorporateEnquiry(TimeStampedModel):
    company_name=models.CharField(max_length=180); contact_name=models.CharField(max_length=120); email=models.EmailField(); phone=models.CharField(max_length=40)
    facility_type=models.CharField(max_length=120,blank=True); location=models.CharField(max_length=180,blank=True); approximate_size=models.CharField(max_length=120,blank=True)
    frequency=models.CharField(max_length=80,blank=True); preferred_start_date=models.DateField(null=True,blank=True); requirements=models.TextField(blank=True); status=models.CharField(max_length=30,default="NEW")

class ContactMessage(TimeStampedModel):
    name=models.CharField(max_length=120); email=models.EmailField(); phone=models.CharField(max_length=40,blank=True); message=models.TextField(); is_resolved=models.BooleanField(default=False)

class Booking(TimeStampedModel):
    class Status(models.TextChoices):
        PENDING="pending","Pending"
        CONFIRMED="confirmed","Confirmed"
        IN_PROGRESS="in_progress","In progress"
        COMPLETED="completed","Completed"
        CANCELLED="cancelled","Cancelled"

    reference=models.CharField(max_length=24,unique=True,editable=False)
    customer=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="bookings")
    quote=models.OneToOneField(QuoteRequest,on_delete=models.SET_NULL,null=True,blank=True,related_name="booking")
    service=models.ForeignKey(Service,on_delete=models.PROTECT,related_name="bookings")
    service_area=models.ForeignKey(ServiceArea,on_delete=models.PROTECT,null=True,blank=True,related_name="bookings")
    service_date=models.DateField()
    service_time=models.TimeField()
    location=models.CharField(max_length=240)
    phone=models.CharField(max_length=40)
    alternative_contact=models.CharField(max_length=120,blank=True)
    notes=models.TextField(blank=True)
    status=models.CharField(max_length=20,choices=Status.choices,default=Status.PENDING)

    class Meta:
        ordering=("-service_date","-service_time","-created_at")

    def save(self,*args,**kwargs):
        if not self.reference:
            self.reference=f"NCS-{uuid.uuid4().hex[:10].upper()}"
        super().save(*args,**kwargs)

    def __str__(self): return f"{self.reference} — {self.customer}"
