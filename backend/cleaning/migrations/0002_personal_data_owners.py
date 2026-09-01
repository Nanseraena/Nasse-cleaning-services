from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("cleaning", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="quoterequest",
            name="user",
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="quote_requests", to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name="corporateenquiry",
            name="user",
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="corporate_enquiries", to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name="contactmessage",
            name="user",
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="contact_messages", to=settings.AUTH_USER_MODEL),
        ),
    ]
