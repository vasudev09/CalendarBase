from django.db import models
from django.contrib.auth.models import User

# Create your models here.


# Customer
class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Event(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=300, blank=True)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.title} on {self.date} ({self.start_time} - {self.end_time})"
