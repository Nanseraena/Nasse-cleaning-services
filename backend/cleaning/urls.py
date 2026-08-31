from django.urls import path
from .views import LoginView, RefreshView, LogoutView, MeView, ServiceListView, QuoteCreateView, CorporateEnquiryCreateView, ContactMessageCreateView, AdminQuoteListView, AdminQuoteDetailView, AdminCorporateListView, AdminContactListView
urlpatterns=[
 path("auth/login/",LoginView.as_view()),path("auth/refresh/",RefreshView.as_view()),path("auth/logout/",LogoutView.as_view()),path("auth/me/",MeView.as_view()),
 path("services/",ServiceListView.as_view()),path("quotes/",QuoteCreateView.as_view()),path("corporate-enquiries/",CorporateEnquiryCreateView.as_view()),path("contact-messages/",ContactMessageCreateView.as_view()),
 path("admin/quotes/",AdminQuoteListView.as_view()),path("admin/quotes/<uuid:pk>/",AdminQuoteDetailView.as_view()),path("admin/corporate-enquiries/",AdminCorporateListView.as_view()),path("admin/contact-messages/",AdminContactListView.as_view()),
]
