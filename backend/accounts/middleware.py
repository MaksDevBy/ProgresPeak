from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CookieJWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        access_token = request.COOKIES.get('access_token')
        if access_token:
            # Добавить токен в заголовок Authorization для SimpleJWT
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
        response = self.get_response(request)
        return response