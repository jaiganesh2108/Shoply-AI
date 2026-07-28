from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from products.models import Product

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)