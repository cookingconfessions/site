from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_swagger.views import get_swagger_view


schema_view = get_schema_view(
    openapi.Info(
        title="Cooking Confessions",
        default_version="v1",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/menus/", include("menu.urls"), name="Menus"),
    path("api/home/", include("home.urls"), name="Home"),
    path("api/shop/", include("shop.urls"), name="Shop"),
    path("docs/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
]
