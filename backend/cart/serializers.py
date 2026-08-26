from rest_framework import serializers
from products.serializers import ProductSerializer
from products.models import Product
from .models import Cart


class CartSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",
        write_only=True,
    )

    class Meta:
        model = Cart
        fields = [
            "id",
            "user",
            "product",
            "product_id",
            "quantity",
        ]