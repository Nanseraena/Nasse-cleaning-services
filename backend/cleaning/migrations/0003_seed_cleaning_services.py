from django.db import migrations


SERVICES = [
    ("House Cleaning", "house-cleaning", "RESIDENTIAL", "Reliable home cleaning tailored to your rooms, routines, and preferred schedule.", "Our house cleaning service keeps kitchens, bathrooms, bedrooms, and living areas fresh and comfortable. Tell us which areas need the most attention and we will shape the cleaning plan around your home."),
    ("Deep Cleaning", "deep-cleaning", "RESIDENTIAL", "A detailed top-to-bottom clean for spaces that need extra attention.", "Deep cleaning targets built-up dust, grime, edges, fixtures, and commonly overlooked areas. It is ideal for seasonal refreshes, special occasions, or preparing for recurring service."),
    ("Move-In & Move-Out Cleaning", "move-in-move-out-cleaning", "RESIDENTIAL", "Thorough cleaning that helps make moving into or leaving a property easier.", "We clean empty or transitioning spaces so you can focus on the move. Share the property condition and any priority rooms when requesting your quote."),
    ("Apartment & Condo Cleaning", "apartment-condo-cleaning", "RESIDENTIAL", "Flexible cleaning for apartments, condominiums, and compact living spaces.", "Our apartment and condo service is planned around the layout, access requirements, and shared-building considerations of your property."),
    ("Office Cleaning", "office-cleaning", "COMMERCIAL", "Professional cleaning that supports a welcoming and productive workplace.", "Office cleaning can cover work areas, meeting rooms, reception spaces, kitchens, washrooms, and frequently touched surfaces on a schedule that suits your operations."),
    ("Commercial Cleaning", "commercial-cleaning", "COMMERCIAL", "Custom cleaning support for shops, institutions, and business premises.", "We build commercial cleaning plans around your facility type, operating hours, foot traffic, and hygiene priorities."),
    ("Post-Construction Cleaning", "post-construction-cleaning", "POST_CONSTRUCTION", "Detailed cleanup after building, renovation, or repair work.", "Post-construction cleaning removes dust and debris from accessible surfaces and prepares the space for handover or occupation. The scope is confirmed after reviewing the site requirements."),
    ("Facility Care", "facility-care", "FACILITY_CARE", "Ongoing cleaning support for managed properties and high-use facilities.", "Facility care provides a dependable cleaning schedule shaped around your building, users, operating hours, and recurring maintenance needs."),
]


def seed_services(apps, schema_editor):
    Service = apps.get_model("cleaning", "Service")
    for name, slug, category, short_description, description in SERVICES:
        Service.objects.update_or_create(
            slug=slug,
            defaults={
                "name": name,
                "category": category,
                "short_description": short_description,
                "description": description,
                "is_active": True,
            },
        )


def remove_seeded_services(apps, schema_editor):
    Service = apps.get_model("cleaning", "Service")
    Service.objects.filter(slug__in=[service[1] for service in SERVICES]).delete()


class Migration(migrations.Migration):
    dependencies = [("cleaning", "0002_personal_data_owners")]
    operations = [migrations.RunPython(seed_services, remove_seeded_services)]
