from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from app_crud import views

# api versioning
router = routers.DefaultRouter()
router.register(r'customers', views.CustomerView, 'customers')
router.register(r'employees', views.EmployeeView, 'employees')
router.register(r'orderdetails', views.OrderDetailView, 'orderdetails')
router.register(r'orders', views.OrderView, 'orders')
router.register(r'products', views.ProductView, 'products')
router.register(r'suppliers', views.SupplierView, 'suppliers')
router.register(r'categories', views.CategorieView, 'categories')
router.register(r'shippers', views.ShipperView, 'shippers')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title='CRUD API'))
]