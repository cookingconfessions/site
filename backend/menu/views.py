from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.response import Response

from .models import *
from .serializers import *


class MenuItemsView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MenuItemSerializer
    queryset = MenuItem.objects.all().order_by("-sales_count")
    lookup_field = "slug"

    def list(self, *args, **kwargs):
        menu_items = self.get_queryset()
        serializer = self.get_serializer(menu_items, many=True)
        return Response(serializer.data)

    def retrieve(self, request, slug=None):
        try:
            menu_item = MenuItem.objects.get(slug=slug)
        except MenuItem.DoesNotExist:
            return Response({"error": "Menu item not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(menu_item)
        return Response(serializer.data)

    @action(detail=True, methods=["get"], url_path="similar-menu-items")
    def get_similar_menu_items(self, request, slug=None):
        try:
            menu_item = MenuItem.objects.get(slug=slug)
        except MenuItem.DoesNotExist:
            return Response({"error": "Menu item not found"}, status=status.HTTP_400_BAD_REQUEST)

        similar_menu_items = (
            MenuItem.objects.filter(category=menu_item.category)
            .exclude(pk=menu_item.pk)
            .order_by("-sales_count")
        )

        serializer = MenuItemSerializer(similar_menu_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=["post"],
        serializer_class=CreateMenuItemReviewSerializer,
        parser_classes=[JSONParser],
    )
    def add_review(self, request, slug=None):
        try:
            menu_item = MenuItem.objects.get(slug=slug)
        except MenuItem.DoesNotExist:
            return Response({"error": "Menu item not found"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CreateMenuItemReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(menu_item=menu_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoriesView(viewsets.ReadOnlyModelViewSet):
    serializer_class = MenuItemCategorySerializer
    parser_classes = (MultiPartParser,)
    queryset = MenuItemCategory.objects.all()

    def list(self, *args, **kwargs):
        categories = self.get_queryset()
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            category = MenuItemCategory.objects.get(pk=pk)
        except MenuItem.DoesNotExist:
            return Response({"error": "Menu item not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(category)
        return Response(serializer.data)


class TagsView(viewsets.ViewSet):
    serializer_class = MenuItemTagSerializer
    parser_classes = (MultiPartParser,)
    queryset = MenuItemTag.objects.all()
