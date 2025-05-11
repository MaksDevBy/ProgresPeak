from django.urls import path
from .views import CustomTokenObtainPairView, CustomTokenRefreshView, UserInfoAPIView, UserRegistrationAPIView, UserLogoutAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', UserLogoutAPIView.as_view(), name='user_logout'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('user/',UserInfoAPIView.as_view(), name='user_info' ),
]