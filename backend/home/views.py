from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.response import Response

from .models import *
from .serializers import *


class BookingView(generics.CreateAPIView):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FaqView(generics.ListAPIView):
    serializer_class = FaqSerializer
    queryset = Faq.objects.all()

    def list(self, request, *args, **kwargs):
        faqs = self.get_queryset()
        serializer = self.get_serializer(faqs, many=True)
        return Response(serializer.data)


class MessageView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompanyInfoView(generics.ListAPIView):
    serializer_class = CompanyInfoSerializer
    queryset = CompanyInfo.objects.all().first()

    def list(self, request, *args, **kwargs):
        info = self.get_queryset()
        serializer = self.get_serializer(info, many=False)
        return Response(serializer.data)
