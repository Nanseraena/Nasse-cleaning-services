import uuid
from django.db import models

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

class QuoteRequest(TimeStampedModel):
    class Status(models.TextChoices):
        NEW="NEW","New"; CONTACTED="CONTACTED","Contacted"; QUOTED="QUOTED","Quoted"; ACCEPTED="ACCEPTED","Accepted"; DECLINED="DECLINED","Declined"
    service=models.ForeignKey(Service,on_delete=models.SET_NULL,null=True,blank=True,related_name="quotes")
    full_name=models.CharField(max_length=120); email=models.EmailField(); phone=models.CharField(max_length=40); location=models.CharField(max_length=180)
    property_type=models.CharField(max_length=120,blank=True); approximate_size=models.CharField(max_length=120,blank=True); preferred_date=models.DateField(null=True,blank=True)
    frequency=models.CharField(max_length=50,blank=True); notes=models.TextField(blank=True); status=models.CharField(max_length=20,choices=Status.choices,default=Status.NEW)

class CorporateEnquiry(TimeStampedModel):
    company_name=models.CharField(max_length=180); contact_name=models.CharField(max_length=120); email=models.EmailField(); phone=models.CharField(max_length=40)
    facility_type=models.CharField(max_length=120,blank=True); location=models.CharField(max_length=180,blank=True); approximate_size=models.CharField(max_length=120,blank=True)
    frequency=models.CharField(max_length=80,blank=True); preferred_start_date=models.DateField(null=True,blank=True); requirements=models.TextField(blank=True); status=models.CharField(max_length=30,default="NEW")

class ContactMessage(TimeStampedModel):
    name=models.CharField(max_length=120); email=models.EmailField(); phone=models.CharField(max_length=40,blank=True); message=models.TextField(); is_resolved=models.BooleanField(default=False)
