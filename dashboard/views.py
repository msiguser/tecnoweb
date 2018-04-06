from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import Count

from .models import Agencia, Plan, Equipo, SocilicitudCompra

def index(request):
    return render(request, 'index.html')

@login_required
def init(request):
    return render(request, 'dashboard/index.html')

@login_required
def list(request):
    return render(request, 'dashboard/dashboard_list.html')

@login_required
def agencias(request):

    agencias = Agencia.objects.all()
    data = [{'id': agencia.id, 'placeId': agencia.place_id} for agencia in agencias]
    return JsonResponse(data, safe=False)

@login_required
def agencia_planes_vendidos(request, pk):

    agencia = get_object_or_404(Agencia, pk=pk)

    cantidades_por_plan = agencia.socilicitudcompra_set.values('plan__id').annotate(cantidad=Count('plan__id')).order_by('-cantidad')[:5]

    data = []

    for each in cantidades_por_plan:
        plan = Plan.objects.get(pk = each['plan__id'])
        descripcion = plan.descripcion[:10]
        cantidad = each['cantidad']
        data.append({'name': descripcion, 'value': cantidad})

    return JsonResponse(data, safe=False)

@login_required
def agencia_equipos_preferidos(request, pk):

    agencia = get_object_or_404(Agencia, pk=pk)

    cantidad_total = agencia.socilicitudcompra_set.count()
    cantidades_por_equipo = agencia.socilicitudcompra_set.values('equipo__id').annotate(cantidad=Count('equipo__id')).order_by('cantidad')

    data = []

    for each in cantidades_por_equipo:
        equipo = Equipo.objects.get(pk = each['equipo__id'])
        descripcion = equipo.descripcion[:7]
        frecuencia = (each['cantidad'] / cantidad_total)
        data.append({'letter': descripcion, 'frequency': frecuencia})

    return JsonResponse(data, safe=False)

@login_required
def agencia_solicitud_estados(request, pk):

    agencia = get_object_or_404(Agencia, pk=pk)

    cantidades_por_estado = agencia.socilicitudcompra_set.values('estado').annotate(cantidad=Count('estado')).order_by('cantidad')

    estados_solicitud = dict(SocilicitudCompra.ESTADOS_SOLICITUD)

    data = []

    for each in cantidades_por_estado:
        descripcion = estados_solicitud[each['estado']]
        poblacion = each['cantidad']
        data.append({'age': descripcion, 'population': poblacion})

    return JsonResponse(data, safe=False)