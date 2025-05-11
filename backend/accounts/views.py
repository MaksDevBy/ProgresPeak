from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import RetrieveAPIView, GenericAPIView
from rest_framework_simplejwt.exceptions import InvalidToken
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer, UserRegistrationSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        response = Response({"message": "Login successful", 'access_token':{data['access']}}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='access_token',
            value=data['access'],
            httponly=True,  # Защита от XSS
            secure=True,    # Только HTTPS (отключите для локальной разработки)
            samesite='None', # Защита от CSRF
            max_age=15 * 60  # Время жизни access-токена (15 минут)
        )
        response.set_cookie(
            key='refresh_token',
            value=data['refresh'],
            httponly=True,
            secure=True,
            samesite='None',
            max_age=7 * 24 * 60 * 60
        )
        return response

class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response('Registration was successful!', status=status.HTTP_201_CREATED)


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            raise InvalidToken('No refresh token provided')

        # Вручную создать RefreshToken и получить новый access_token
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
        except Exception as e:
            raise InvalidToken('Invalid refresh token')

        response = Response({"message": "Token refreshed"}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=True,
            samesite='None',
            max_age=15 * 60
        )
        return response



class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        refresh_token =request.COOKIES.get('refresh_token')

        response = Response({'detail': 'Logged out'}, status=status.HTTP_200_OK)

        if refresh_token:
            try:
                response.delete_cookie(key='refresh_token',)
                response.delete_cookie(key='access_token',)
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:

                pass
        return response



class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user