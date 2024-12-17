from django.urls import path
from . import views

urlpatterns = [
    path("", views.ytmp4Page, name="ytmp4")
]
