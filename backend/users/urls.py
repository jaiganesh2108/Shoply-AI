from django.urls import path
from .views import RegisterView, health

urlpatterns = [
    path("health/", health),
    path("register/", RegisterView.as_view()),
]