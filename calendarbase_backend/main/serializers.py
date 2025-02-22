from rest_framework import serializers
from . import models


class CustomerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ["id", "user"]

    def __init__(self, *args, **kwargs):
        super(CustomerListSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ["id", "user"]

    def __init__(self, *args, **kwargs):
        super(CustomerDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class EventListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = ["id", "title", "description", "date", "start_time", "end_time"]

    def __init__(self, *args, **kwargs):
        super(EventListSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1


class EventDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = ["id", "title", "description", "date", "start_time", "end_time"]

    def __init__(self, *args, **kwargs):
        super(EventListSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1
