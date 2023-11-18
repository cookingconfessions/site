from django.contrib import admin
from django.shortcuts import redirect
from django.urls import include, path

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions


schema_view = get_schema_view(
    openapi.Info(
        title="Cooking Confessions",
        default_version="v1",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("", lambda request: redirect("admin/"), name="root"),
    path("admin/", admin.site.urls),
    path("api/home/", include("home.urls")),
    path("api/menus/", include("menu.urls")),
    path("api/shop/", include("shop.urls")),
    path("api/auth/", include("authentication.urls")),
    path("docs/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
]
