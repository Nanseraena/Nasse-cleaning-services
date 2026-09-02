from datetime import timedelta
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient
from .models import Service
class PublicApiTests(TestCase):
    def test_services_are_public(self):
        service,_=Service.objects.get_or_create(name="Office Cleaning",slug="office-cleaning",defaults={"category":"COMMERCIAL","short_description":"Professional office cleaning"})
        response=APIClient().get("/api/services/")
        self.assertEqual(response.status_code,200)
        self.assertIn(str(service.id),[item["id"] for item in response.json()])

class BookingApiTests(TestCase):
    def setUp(self):
        self.user=get_user_model().objects.create_user(username="customer@example.com",email="customer@example.com",password="Password1!")
        self.other=get_user_model().objects.create_user(username="other@example.com",email="other@example.com",password="Password1!")
        self.service=Service.objects.create(name="Deep Cleaning",slug="deep-cleaning-test",category="RESIDENTIAL",short_description="A deep clean")
        self.client=APIClient()

    def payload(self,days=2):
        return {"service":str(self.service.id),"service_date":str(timezone.localdate()+timedelta(days=days)),"service_time":"10:00","location":"Kampala","phone":"+256700000000","notes":"Two bedrooms"}

    def test_authentication_is_required(self):
        self.assertEqual(self.client.post("/api/bookings/",self.payload(),format="json").status_code,401)

    def test_customer_can_create_and_only_see_own_booking(self):
        self.client.force_authenticate(self.user)
        created=self.client.post("/api/bookings/",self.payload(),format="json")
        self.assertEqual(created.status_code,201)
        self.assertTrue(created.data["reference"].startswith("NCS-"))
        self.client.force_authenticate(self.other)
        self.assertEqual(self.client.get("/api/bookings/").data,[])
        self.assertEqual(self.client.get(f'/api/bookings/{created.data["id"]}/').status_code,404)

    def test_past_and_taken_slots_are_rejected(self):
        self.client.force_authenticate(self.user)
        self.assertEqual(self.client.post("/api/bookings/",self.payload(-1),format="json").status_code,400)
        self.assertEqual(self.client.post("/api/bookings/",self.payload(),format="json").status_code,201)
        self.client.force_authenticate(self.other)
        self.assertEqual(self.client.post("/api/bookings/",self.payload(),format="json").status_code,400)
