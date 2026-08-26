from django.shortcuts import render
from rest_framework.permissions import IsAdminUser, AllowAny

# Create your views here.
from .models import Product
from .serializers import ProductSerializer
from rest_framework import filters, generics

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        "name",
        "description",
        "category",
    ]

    def get_permissions(self):
            if self.request.method == 'GET':
                return [AllowAny()]
            return [IsAdminUser()]