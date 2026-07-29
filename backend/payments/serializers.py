from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    amount = serializers.ReadOnlyField()
    payment_status = serializers.ReadOnlyField()
    transaction_id = serializers.ReadOnlyField()

    class Meta:
        model = Payment
        fields = [
            "id",
            "user",
            "order",
            "amount",
            "payment_method",
            "payment_status",
            "transaction_id",
            "created_at",
        ]