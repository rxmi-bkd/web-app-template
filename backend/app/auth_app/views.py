from rest_framework.response import Response
from shared.serializers import ErrorSerializer
from drf_spectacular.utils import extend_schema
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.debug import sensitive_post_parameters
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN
from auth_app.serializers import UserSerializer, LoginSerializer, PasswordSerializer, UpdateUserSerializer


@extend_schema(
    request=UserSerializer,
    responses={
        HTTP_201_CREATED: UserSerializer,
        HTTP_400_BAD_REQUEST: ErrorSerializer,
    }
)
@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()

    return Response(UserSerializer(user).data, status=HTTP_201_CREATED)


@extend_schema(
    request=LoginSerializer,
    responses={
        HTTP_200_OK: UserSerializer,
        HTTP_400_BAD_REQUEST: ErrorSerializer,
        HTTP_403_FORBIDDEN: ErrorSerializer,
    }
)
@sensitive_post_parameters()
@csrf_protect
@never_cache
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = authenticate(request, **serializer.validated_data)

    if user is None:
        raise AuthenticationFailed()

    auth_login(request, user)

    user = UserSerializer(user).data

    return Response(user, status=HTTP_200_OK)


@extend_schema(
    summary='Retrieve the information of the authenticated user',
    responses={
        HTTP_200_OK: UserSerializer,
        HTTP_403_FORBIDDEN: ErrorSerializer,
    }
)
@api_view()
@permission_classes([IsAuthenticated])
def who_am_i(request):
    serializer = UserSerializer(request.user)

    return Response(serializer.data, status=HTTP_200_OK)


@extend_schema(
    responses={
        HTTP_200_OK: None,
        HTTP_403_FORBIDDEN: ErrorSerializer,
    }
)
@csrf_protect
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    auth_logout(request)
    return Response(status=HTTP_200_OK)


@extend_schema(
    request=PasswordSerializer,
    responses={
        HTTP_200_OK: None,
        HTTP_400_BAD_REQUEST: ErrorSerializer,
        HTTP_403_FORBIDDEN: ErrorSerializer,
    }
)
@csrf_protect
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_password(request):
    serializer = PasswordSerializer(request.user, data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()

    return Response(status=HTTP_200_OK)


@extend_schema(
    request=UpdateUserSerializer,
    responses={
        HTTP_200_OK: UserSerializer,
        HTTP_400_BAD_REQUEST: ErrorSerializer,
        HTTP_403_FORBIDDEN: ErrorSerializer,
    }
)
@csrf_protect
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    serializer = UpdateUserSerializer(request.user, data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()

    return Response(UserSerializer(user).data, status=HTTP_200_OK)
