import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
BASE_DIR=Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR/".env")
SECRET_KEY=os.getenv("SECRET_KEY","dev-only-change-me")
DEBUG=os.getenv("DEBUG","False").lower()=="true"
ALLOWED_HOSTS=[x.strip() for x in os.getenv("ALLOWED_HOSTS","localhost,127.0.0.1").split(",") if x.strip()]
INSTALLED_APPS=["django.contrib.admin","django.contrib.auth","django.contrib.contenttypes","django.contrib.sessions","django.contrib.messages","django.contrib.staticfiles","corsheaders","rest_framework","cleaning"]
MIDDLEWARE=["django.middleware.security.SecurityMiddleware","corsheaders.middleware.CorsMiddleware","django.contrib.sessions.middleware.SessionMiddleware","django.middleware.common.CommonMiddleware","django.middleware.csrf.CsrfViewMiddleware","django.contrib.auth.middleware.AuthenticationMiddleware","django.contrib.messages.middleware.MessageMiddleware","django.middleware.clickjacking.XFrameOptionsMiddleware"]
ROOT_URLCONF="core.urls"
TEMPLATES=[{"BACKEND":"django.template.backends.django.DjangoTemplates","DIRS":[],"APP_DIRS":True,"OPTIONS":{"context_processors":["django.template.context_processors.request","django.contrib.auth.context_processors.auth","django.contrib.messages.context_processors.messages"]}}]
WSGI_APPLICATION="core.wsgi.application"
DATABASES={"default":{"ENGINE":"django.db.backends.sqlite3","NAME":BASE_DIR/"db.sqlite3"}}
AUTH_PASSWORD_VALIDATORS=[]
LANGUAGE_CODE="en-us"; TIME_ZONE="Africa/Kampala"; USE_I18N=True; USE_TZ=True
STATIC_URL="static/"; DEFAULT_AUTO_FIELD="django.db.models.BigAutoField"
CORS_ALLOWED_ORIGINS=[x.strip() for x in os.getenv("CORS_ALLOWED_ORIGINS","http://localhost:3000").split(",") if x.strip()]
CORS_ALLOW_CREDENTIALS=True
CSRF_TRUSTED_ORIGINS=CORS_ALLOWED_ORIGINS
REST_FRAMEWORK={"DEFAULT_AUTHENTICATION_CLASSES":["cleaning.authentication.CookieJWTAuthentication"],"DEFAULT_PERMISSION_CLASSES":["rest_framework.permissions.AllowAny"]}
SIMPLE_JWT={"ACCESS_TOKEN_LIFETIME":timedelta(minutes=30),"REFRESH_TOKEN_LIFETIME":timedelta(days=7),"ROTATE_REFRESH_TOKENS":True,"BLACKLIST_AFTER_ROTATION":False}
COOKIE_SECURE=os.getenv("COOKIE_SECURE","False").lower()=="true"
