from django.urls import path
from . import views


urlpatterns = [
    # events
    path("events/", views.EventList.as_view()),
    path("event/add/", views.add_event, name="add_event"),
    path("event/delete/", views.delete_event, name="delete_event"),
    # customers
    # path("customers/", views.CustomerList.as_view()),
    # path("customer/<int:pk>/", views.CustomerDetail.as_view()),
    path("customer/login/", views.customer_login, name="customer_login"),
    path("customer/register/", views.customer_register, name="customer_register"),
    path("customer/profile/", views.customer_profile, name="customer_profile"),
    path("customer/logout/", views.customer_logout, name="customer_logout"),
    path("customer/change-password/", views.change_password, name="change_password"),
    # validate
    path("validate-user/", views.validate_user, name="validate_user"),
]
