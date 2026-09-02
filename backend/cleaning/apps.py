from django.apps import AppConfig
class CleaningConfig(AppConfig):
    default_auto_field="django.db.models.BigAutoField"
    name="cleaning"
    def ready(self):
        from . import schema  # noqa: F401
