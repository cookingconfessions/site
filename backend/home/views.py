from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import *
from .serializers import *


class BookingView(viewsets.ViewSet):
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FaqView(viewsets.ViewSet):
    serializer_class = FaqSerializer
    queryset = Faq.objects.all()

    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)


class MessageView(viewsets.ViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompanyInfoView(viewsets.ViewSet):
    serializer_class = CompanyInfoSerializer
    queryset = CompanyInfo.objects.all().first()

    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.queryset, many=False)
        return Response(serializer.data)


class BannerItemView(viewsets.ViewSet):
    serializer_class = BannerItemSerializer
    queryset = BannerItem.objects.all()

    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)
