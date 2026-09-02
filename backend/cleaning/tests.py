from datetime import timedelta
import tempfile
from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings
from django.utils import timezone
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from .models import Service
class PublicApiTests(TestCase):
    def test_services_are_public(self):
        service,_=Service.objects.get_or_create(name="Office Cleaning",slug="office-cleaning",defaults={"category":"COMMERCIAL","short_description":"Professional office cleaning"})
        response=APIClient().get("/api/services/")
        self.assertEqual(response.status_code,200)
        self.assertIn(str(service.id),[item["id"] for item in response.json()])

@override_settings(MEDIA_ROOT=tempfile.mkdtemp(prefix="nasse-test-media-"))
class BookingApiTests(TestCase):
    def setUp(self):
        self.user=get_user_model().objects.create_user(username="customer@example.com",email="customer@example.com",password="Password1!")
        self.other=get_user_model().objects.create_user(username="other@example.com",email="other@example.com",password="Password1!")
        self.service=Service.objects.create(name="Deep Cleaning",slug="deep-cleaning-test",category="RESIDENTIAL",short_description="A deep clean")
        self.client=APIClient()

    def payload(self,days=2):
        return {"service":str(self.service.id),"full_name":"Customer Name","email":self.user.email,"phone":"+256700000000","location":"Kampala","property_type":"Apartment","bedrooms":3,"bathrooms":2,"preferred_date":str(timezone.localdate()+timedelta(days=days)),"preferred_time":"10:00","notes":"Two bedrooms"}

    def test_authentication_is_required(self):
        self.assertEqual(self.client.post("/api/quotes/",self.payload(),format="json").status_code,401)

    def test_quote_acceptance_creates_confirmed_booking(self):
        self.client.force_authenticate(self.user)
        payload=self.payload(); payload["photo_uploads"]=[SimpleUploadedFile("kitchen.jpg",b"image-data",content_type="image/jpeg")]
        created=self.client.post("/api/quotes/",payload,format="multipart")
        self.assertEqual(created.status_code,201)
        self.assertTrue(created.data["reference"].startswith("NAS-Q-"))
        self.assertEqual(len(created.data["photos"]),1)
        admin=get_user_model().objects.create_superuser(username="admin",email="admin@example.com",password="Password1!")
        self.client.force_authenticate(admin)
        sent=self.client.patch(f'/api/admin/quotes/{created.data["id"]}/',{"estimated_price":"180000","admin_notes":"Five hours","status":"QUOTED"},format="json")
        self.assertEqual(sent.status_code,200)
        self.client.force_authenticate(self.user)
        accepted=self.client.post(f'/api/my-quotes/{created.data["id"]}/respond/',{"decision":"accept"},format="json")
        self.assertEqual(accepted.status_code,200)
        self.assertEqual(accepted.data["booking"]["status"],"confirmed")
        self.assertEqual(str(self.client.get("/api/bookings/").data[0]["quote"]),created.data["id"])

    def test_customer_only_sees_own_quotes_and_cannot_create_booking_directly(self):
        self.client.force_authenticate(self.user)
        created=self.client.post("/api/quotes/",self.payload(),format="json")
        self.assertEqual(created.status_code,201)
        self.client.force_authenticate(self.other)
        self.assertEqual(self.client.get("/api/my-quotes/").data,[])
        self.assertEqual(self.client.get(f'/api/my-quotes/{created.data["id"]}/').status_code,404)
        self.assertEqual(self.client.post("/api/bookings/",{},format="json").status_code,405)

    def test_past_quote_date_is_rejected(self):
        self.client.force_authenticate(self.user)
        self.assertEqual(self.client.post("/api/quotes/",self.payload(-1),format="json").status_code,400)
