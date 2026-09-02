from django.urls import path
from .views import LoginView, SignupView, RefreshView, LogoutView, MeView, ServiceListView, ServiceDetailView, QuoteCreateView, CustomerQuoteListView, CustomerQuoteDetailView, CustomerQuoteResponseView, CorporateEnquiryCreateView, ContactMessageCreateView, AdminQuoteListView, AdminQuoteDetailView, AdminCorporateListView, AdminContactListView, CustomerBookingListCreateView, CustomerBookingDetailView, AdminBookingListView, AdminBookingDetailView
urlpatterns=[
 path("auth/login/",LoginView.as_view()),path("auth/signup/",SignupView.as_view()),path("auth/refresh/",RefreshView.as_view()),path("auth/logout/",LogoutView.as_view()),path("auth/me/",MeView.as_view()),
 path("services/",ServiceListView.as_view()),path("services/<slug:slug>/",ServiceDetailView.as_view()),path("quotes/",QuoteCreateView.as_view()),path("my-quotes/",CustomerQuoteListView.as_view()),path("my-quotes/<uuid:pk>/",CustomerQuoteDetailView.as_view()),path("my-quotes/<uuid:pk>/respond/",CustomerQuoteResponseView.as_view()),path("corporate-enquiries/",CorporateEnquiryCreateView.as_view()),path("contact-messages/",ContactMessageCreateView.as_view()),
 path("bookings/",CustomerBookingListCreateView.as_view()),path("bookings/<uuid:pk>/",CustomerBookingDetailView.as_view()),
 path("admin/quotes/",AdminQuoteListView.as_view()),path("admin/quotes/<uuid:pk>/",AdminQuoteDetailView.as_view()),path("admin/corporate-enquiries/",AdminCorporateListView.as_view()),path("admin/contact-messages/",AdminContactListView.as_view()),
 path("admin/bookings/",AdminBookingListView.as_view()),path("admin/bookings/<uuid:pk>/",AdminBookingDetailView.as_view()),
]
