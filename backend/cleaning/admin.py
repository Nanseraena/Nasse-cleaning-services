from django.contrib import admin
from .models import Service, QuoteRequest, CorporateEnquiry, ContactMessage
admin.site.register([Service, QuoteRequest, CorporateEnquiry, ContactMessage])
