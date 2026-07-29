from django.urls import path
from .views import OrderListCreateView, OrderDetailView
from .views import CheckoutView

urlpatterns = [
    path('', OrderListCreateView.as_view(), name='orders'),
    path('<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path("checkout/", CheckoutView.as_view(), name="checkout"),
]