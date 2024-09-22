from django.shortcuts import render
from rest_framework import generics, permissions, pagination, viewsets
from . import serializers
from . import models
from django.http import JsonResponse
from django.db import IntegrityError
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes, api_view
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.core.exceptions import ValidationError
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.password_validation import validate_password
from decouple import config
from rest_framework.response import Response
from django.conf import settings
from django.core.mail import send_mail, BadHeaderError
from rest_framework import status


# Create your views here.


class CustomerList(generics.ListAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerListSerializer


class CustomerDetail(generics.RetrieveAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def customer_register(request):
    username = request.POST.get("username")
    email = request.POST.get("email")
    password = request.POST.get("password")
    if not all([username, email, password]):
        return JsonResponse({"message": "All fields are required."}, status=400)
    if len(username) < 3 or len(username) > 30:
        return JsonResponse(
            {"message": "Username must be between 3 and 30 characters."}, status=400
        )
    if len(email) < 5 or len(email) > 50:
        return JsonResponse(
            {"message": "Email must be between 5 and 50 characters."}, status=400
        )
    if len(password) < 8:
        return JsonResponse(
            {"message": "Password must be at least 8 characters."}, status=400
        )
    if User.objects.filter(email=email).exists():
        return JsonResponse({"message": "Email already exists."}, status=400)
    try:
        user = User.objects.create_user(
            username=username, email=email, password=password
        )
        customer = models.Customer.objects.create(user=user)
        try:
            send_mail(
                "Registration Successful!",
                "Welcome to CalendarBase. Thank you for registering with us.",
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
        except BadHeaderError:
            print("Invalid header found.")
        except Exception as e:
            print(f"Failed to send email: {e}")

        refresh = RefreshToken.for_user(user)
        response = JsonResponse(
            {"message": "Success", "user_id": customer.id}, status=201
        )
        response.set_cookie(
            key="access_token",
            value=str(refresh.access_token),
            httponly=True,
            secure=True,
            samesite="None",
            max_age=604800,
        )
        return response
    except IntegrityError:
        return JsonResponse({"message": "Username already exists."}, status=400)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)


@api_view(["POST"])
@permission_classes([AllowAny])
def customer_login(request):
    email = request.POST.get("email")
    password = request.POST.get("password")
    User = get_user_model()
    if not all([email, password]):
        return JsonResponse({"message": "All fields are required."}, status=400)
    try:
        user = User.objects.get(email=email)
        username = user.username
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            response = JsonResponse(
                {"message": "Success", "user": user.username}, status=200
            )
            response.set_cookie(
                key="access_token",
                value=str(refresh.access_token),
                httponly=True,
                secure=True,
                samesite="None",
                max_age=604800,
            )
            return response
        else:
            msg = {"message": "Invalid Email/Password!!"}
            return JsonResponse(msg, status=401)

    except User.DoesNotExist:
        msg = {"message": "Invalid Email/Password!!"}
        return JsonResponse(msg, status=401)


@api_view(["GET"])
def customer_logout(request):
    response = JsonResponse({"message": "Successfully logged out."}, status=200)
    response.set_cookie(
        key="access_token",
        value="",
        httponly=True,
        secure=True,
        samesite="None",
        max_age=0,
        path="/",
    )
    return response


@api_view(["GET"])
def customer_profile(request):
    try:
        customer = models.Customer.objects.get(user=request.user)
    except models.Customer.DoesNotExist:
        return Response(
            {"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = serializers.CustomerDetailSerializer(customer)
    user_data = serializer.data.get("user", {})
    response_data = {
        "customer_id": serializer.data.get("id"),
        "user_id": user_data.get("id"),
        "email": user_data.get("email"),
        "username": user_data.get("username"),
    }

    return Response(response_data)


@api_view(["POST"])
def change_password(request):
    new_password = request.POST.get("password")
    if not new_password:
        return Response(
            {"error": "New password is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        validate_password(new_password, request.user)
    except ValidationError as e:
        return Response({"error": list(e.messages)}, status=status.HTTP_400_BAD_REQUEST)

    request.user.set_password(new_password)
    request.user.save()
    update_session_auth_hash(request, request.user)

    return Response(
        {"message": "Password changed successfully."}, status=status.HTTP_200_OK
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def validate_user(request):
    token = request.COOKIES.get("access_token")
    if not token:
        return JsonResponse({}, status=401)
    try:
        validated_token = AccessToken(token)
        user_id = validated_token["user_id"]
        return JsonResponse({}, status=200)
    except (InvalidToken, TokenError) as e:
        return JsonResponse({}, status=401)