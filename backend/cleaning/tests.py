from django.test import TestCase
from rest_framework.test import APIClient
from .models import Service
class PublicApiTests(TestCase):
    def test_services_are_public(self):
        Service.objects.create(name="Office Cleaning",slug="office-cleaning",category="COMMERCIAL",short_description="Professional office cleaning")
        response=APIClient().get("/api/services/")
        self.assertEqual(response.status_code,200)
        self.assertEqual(len(response.json()),1)
