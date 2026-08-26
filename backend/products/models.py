from django.db import models

# Create your models here.
class Product(models.Model):
    CATEGORY_CHOICES = [
        ("Electronics", "Electronics"),
        ("Fashion", "Fashion"),
        ("Books", "Books"),
        ("Home", "Home"),
        ("Sports", "Sports"),
        ("Beauty", "Beauty"),
    ]
        
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    image = models.URLField(blank=True)
    is_available = models.BooleanField(default=True)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name