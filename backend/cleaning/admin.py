from django.contrib import admin, messages
from django.db.models import Count

from .models import (
    Service,
    QuoteRequest,
    CorporateEnquiry,
    ContactMessage,
    Booking,
)

admin.site.site_header = "Nasse Cleaning Services Administration"
admin.site.site_title = "Nasse Admin"
admin.site.index_title = "Operations overview"


@admin.action(description="Mark selected services as active")
def activate_services(modeladmin, request, queryset):
    updated = queryset.update(is_active=True)
    modeladmin.message_user(request, f"{updated} service(s) activated.", messages.SUCCESS)


@admin.action(description="Mark selected services as inactive")
def deactivate_services(modeladmin, request, queryset):
    updated = queryset.update(is_active=False)
    modeladmin.message_user(request, f"{updated} service(s) deactivated.", messages.SUCCESS)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "is_active", "quote_requests", "updated_at")
    list_display_links = ("name",)
    list_editable = ("is_active",)
    list_filter = ("category", "is_active", "created_at", "updated_at")
    search_fields = ("name", "slug", "short_description", "description")
    ordering = ("category", "name")
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("id", "created_at", "updated_at")
    actions = (activate_services, deactivate_services)
    list_per_page = 25
    save_on_top = True
    fieldsets = (
        ("Service details", {"fields": ("name", "slug", "category", "is_active")}),
        ("Customer-facing content", {"fields": ("short_description", "description")}),
        ("Audit information", {"classes": ("collapse",), "fields": ("id", "created_at", "updated_at")}),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(_quote_count=Count("quotes"))

    @admin.display(description="Quotes", ordering="_quote_count")
    def quote_requests(self, obj):
        return obj._quote_count


@admin.action(description="Mark selected quotes as contacted")
def mark_quotes_contacted(modeladmin, request, queryset):
    updated = queryset.update(status=QuoteRequest.Status.CONTACTED)
    modeladmin.message_user(request, f"{updated} quote(s) marked as contacted.", messages.SUCCESS)


@admin.action(description="Mark selected quotes as accepted")
def mark_quotes_accepted(modeladmin, request, queryset):
    updated = queryset.update(status=QuoteRequest.Status.ACCEPTED)
    modeladmin.message_user(request, f"{updated} quote(s) marked as accepted.", messages.SUCCESS)


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ("full_name", "service", "phone", "location", "preferred_date", "status", "created_at")
    list_display_links = ("full_name",)
    list_editable = ("status",)
    list_filter = ("status", "service", "frequency", "preferred_date", "created_at")
    search_fields = ("full_name", "email", "phone", "location", "property_type", "notes")
    ordering = ("-created_at",)
    date_hierarchy = "created_at"
    autocomplete_fields = ("service",)
    list_select_related = ("service",)
    readonly_fields = ("id", "created_at", "updated_at")
    actions = (mark_quotes_contacted, mark_quotes_accepted)
    list_per_page = 30
    save_on_top = True
    fieldsets = (
        ("Customer", {"fields": ("full_name", "email", "phone")}),
        ("Service request", {"fields": ("service", "location", "property_type", "approximate_size", "preferred_date", "frequency", "notes")}),
        ("Workflow", {"fields": ("status",)}),
        ("Audit information", {"classes": ("collapse",), "fields": ("id", "created_at", "updated_at")}),
    )


@admin.action(description="Mark selected enquiries as contacted")
def mark_enquiries_contacted(modeladmin, request, queryset):
    updated = queryset.update(status="CONTACTED")
    modeladmin.message_user(request, f"{updated} enquiry/enquiries marked as contacted.", messages.SUCCESS)


@admin.register(CorporateEnquiry)
class CorporateEnquiryAdmin(admin.ModelAdmin):
    list_display = ("company_name", "contact_name", "phone", "facility_type", "location", "frequency", "status", "created_at")
    list_display_links = ("company_name",)
    list_editable = ("status",)
    list_filter = ("status", "facility_type", "frequency", "preferred_start_date", "created_at")
    search_fields = ("company_name", "contact_name", "email", "phone", "location", "requirements")
    ordering = ("-created_at",)
    date_hierarchy = "created_at"
    readonly_fields = ("id", "created_at", "updated_at")
    actions = (mark_enquiries_contacted,)
    list_per_page = 30
    save_on_top = True
    fieldsets = (
        ("Company and contact", {"fields": ("company_name", "contact_name", "email", "phone")}),
        ("Facility requirements", {"fields": ("facility_type", "location", "approximate_size", "frequency", "preferred_start_date", "requirements")}),
        ("Workflow", {"fields": ("status",)}),
        ("Audit information", {"classes": ("collapse",), "fields": ("id", "created_at", "updated_at")}),
    )


@admin.action(description="Mark selected messages as resolved")
def resolve_messages(modeladmin, request, queryset):
    updated = queryset.update(is_resolved=True)
    modeladmin.message_user(request, f"{updated} message(s) resolved.", messages.SUCCESS)


@admin.action(description="Reopen selected messages")
def reopen_messages(modeladmin, request, queryset):
    updated = queryset.update(is_resolved=False)
    modeladmin.message_user(request, f"{updated} message(s) reopened.", messages.SUCCESS)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "message_preview", "is_resolved", "created_at")
    list_display_links = ("name",)
    list_editable = ("is_resolved",)
    list_filter = ("is_resolved", "created_at", "updated_at")
    search_fields = ("name", "email", "phone", "message")
    ordering = ("is_resolved", "-created_at")
    date_hierarchy = "created_at"
    readonly_fields = ("id", "created_at", "updated_at")
    actions = (resolve_messages, reopen_messages)
    list_per_page = 30
    save_on_top = True
    fieldsets = (
        ("Sender", {"fields": ("name", "email", "phone")}),
        ("Message", {"fields": ("message", "is_resolved")}),
        ("Audit information", {"classes": ("collapse",), "fields": ("id", "created_at", "updated_at")}),
    )

    @admin.display(description="Message")
    def message_preview(self, obj):
        return obj.message if len(obj.message) <= 80 else f"{obj.message[:77]}..."


@admin.action(description="Confirm selected bookings")
def confirm_bookings(modeladmin, request, queryset):
    updated = queryset.filter(status=Booking.Status.PENDING).update(status=Booking.Status.CONFIRMED)
    modeladmin.message_user(request, f"{updated} booking(s) confirmed.", messages.SUCCESS)


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("reference", "customer", "service", "service_date", "service_time", "location", "status", "created_at")
    list_display_links = ("reference",)
    list_editable = ("status",)
    list_filter = ("status", "service", "service_date", "created_at")
    search_fields = ("reference", "customer__username", "customer__email", "customer__first_name", "customer__last_name", "phone", "location", "notes")
    ordering = ("-service_date", "-service_time")
    date_hierarchy = "service_date"
    autocomplete_fields = ("service", "customer")
    list_select_related = ("service", "customer")
    readonly_fields = ("id", "reference", "created_at", "updated_at")
    actions = (confirm_bookings,)
    list_per_page = 30
    save_on_top = True
    fieldsets = (
        ("Booking", {"fields": ("reference", "customer", "service", "service_date", "service_time", "status")}),
        ("Location and contact", {"fields": ("location", "phone", "alternative_contact")}),
        ("Customer instructions", {"fields": ("notes",)}),
        ("Audit information", {"classes": ("collapse",), "fields": ("id", "created_at", "updated_at")}),
    )
