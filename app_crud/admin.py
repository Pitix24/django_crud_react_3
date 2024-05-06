from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Employees),
admin.site.register(Categories),
admin.site.register(Customers),
admin.site.register(Shippers),
admin.site.register(Suppliers),
admin.site.register(Orders),
admin.site.register(Products),
admin.site.register(Orderdetails)