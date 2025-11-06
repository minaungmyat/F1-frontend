from django.contrib import admin
from .models import Race 

@admin.register(Race)
class RaceAdmin(admin.ModelAdmin):
    list_display = ("id",)
# Register your models here.
