from django.urls import include, path

from rest_framework_simplejwt import views as jwt_views

from .views import *


urlpatterns = [
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("password_reset/", include("django_rest_passwordreset.urls", namespace="password_reset")),
]
