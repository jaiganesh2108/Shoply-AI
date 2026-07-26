from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view()),

    #jwt token authentication urls
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
]