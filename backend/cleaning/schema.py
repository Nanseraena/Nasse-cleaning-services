from drf_spectacular.extensions import OpenApiAuthenticationExtension


class CookieJWTAuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = "cleaning.authentication.CookieJWTAuthentication"
    name = "cookieAuth"

    def get_security_definition(self, auto_schema):
        return {
            "type": "apiKey",
            "in": "cookie",
            "name": "access_token",
            "description": "HttpOnly JWT cookie set by POST /api/auth/login/. Use the login operation in Swagger UI; the browser sends this cookie automatically afterward.",
        }
