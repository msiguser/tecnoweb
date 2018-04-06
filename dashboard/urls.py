from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('init/', views.init, name='dashboard-init'),
    path('list/', views.list, name='dashboard-list'),
    path('agencias/', views.agencias, name='agencias'),
    path('agencia/<int:pk>/planesvendidos/', views.agencia_planes_vendidos, name='agencia-planes-vendidos'),
    path('agencia/<int:pk>/equipospreferidos/', views.agencia_equipos_preferidos, name='agencia-equipos-preferidos'),
    path('agencia/<int:pk>/solicitudestados/', views.agencia_solicitud_estados, name='agencia-solicitud-estados'),
]