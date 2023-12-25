from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
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

    def list(self, request, *args, **kwargs):
        queryset = CompanyInfo.objects.first()
        serializer = self.serializer_class(queryset, many=False)
        return Response(serializer.data)


class BannerItemView(viewsets.ViewSet):
    serializer_class = BannerItemSerializer
    queryset = BannerItem.objects.all()

    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)


class ScheduleView(viewsets.ViewSet):
    serializer_class = ScheduleSerializer
    queryset = Schedule.objects.all()

    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)
