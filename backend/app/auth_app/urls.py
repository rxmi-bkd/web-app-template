from auth_app import views
from django.urls import path

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('who_am_i/', views.who_am_i, name='who_am_i'),
    path('update/password/', views.update_password, name='update_password'),
    path('update/user/', views.update_user, name='update_user'),
]
