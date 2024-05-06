from rest_framework import viewsets
from .serializer import *
from .models import *

# Create your views here.
class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customers.objects.all()


class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employees.objects.all()


class OrderDetailView(viewsets.ModelViewSet):
    serializer_class = OrderDatailSerializer
    queryset = Orderdetails.objects.all()


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Orders.objects.all()


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Products.objects.all()

class SupplierView(viewsets.ModelViewSet):
    serializer_class = SupplierSerializer
    queryset = Suppliers.objects.all()

class CategorieView(viewsets.ModelViewSet):
    serializer_class = CategorieSerializer
    queryset = Categories.objects.all()

class ShipperView(viewsets.ModelViewSet):
    serializer_class = ShipperSerializer
    queryset = Shippers.objects.all()    