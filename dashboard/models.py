from django.db import models

class Agencia(models.Model):
    CIUDADES = (
        ('UIO', 'Quito'),
        ('GYE', 'Guayaquil'),
    )

    id = models.AutoField(primary_key=True, db_column='IdAgencia')
    codigo = models.CharField(max_length=10, db_column='Codigo')
    nombre = models.CharField(max_length=200, db_column='Nombre')
    descripcion = models.TextField(max_length=1000, null=True, blank=True, db_column='Descripcion')
    ciudad = models.CharField(max_length=3, choices=CIUDADES, blank=True, default='GYE', db_column='Ciudad')
    place_id = models.CharField(max_length=30, null=True, db_column='IdLugar')

    class Meta:
        db_table = 'dashboard_agencias'

    def __str__(self):
        return '%s (%s)' % (self.codigo, self.nombre)

class Empleado(models.Model):
    id = models.AutoField(primary_key=True, db_column='IdEmpleado')
    codigo = models.CharField(max_length=10, db_column='Codigo')
    nombre = models.CharField(max_length=200, db_column='Nombre')

    class Meta:
        db_table = 'dashboard_empleados'

    def __str__(self):
        return '%s (%s)' % (self.codigo, self.nombre)

class Cliente(models.Model):
    TIPOS_IDENTIFICACION = (
        ('CED', 'Cedula'),
        ('PAS', 'Pasaporte'),
        ('RUC', 'R.U.C.'),
    )

    id = models.AutoField(primary_key=True, db_column='IdCliente')
    codigo = models.CharField(max_length=10, db_column='Codigo')
    nombre = models.CharField(max_length=200, db_column='Nombre')
    tipo_identificacion = models.CharField(max_length=3, choices=TIPOS_IDENTIFICACION, default='CED', db_column='TipoIdentificacion')

    class Meta:
        db_table = 'dashboard_clientes'

    def __str__(self):
        return '%s (%s)' % (self.codigo, self.nombre)

class Equipo(models.Model):
    id = models.AutoField(primary_key=True, db_column='IdEquipo')
    codigo = models.CharField(max_length=10, db_column='Codigo')
    descripcion = models.CharField(max_length=200, db_column='Descripcion')

    class Meta:
        db_table = 'dashboard_equipos'

    def __str__(self):
        return '%s (%s)' % (self.codigo, self.descripcion)

class Plan(models.Model):
    id = models.AutoField(primary_key=True, db_column='IdPlan')
    codigo = models.CharField(max_length=10, db_column='Codigo')
    descripcion = models.CharField(max_length=200, db_column='Descripcion')

    class Meta:
        db_table = 'dashboard_planes'

    def __str__(self):
        return '%s (%s)' % (self.codigo, self.descripcion)

class SocilicitudCompra(models.Model):
    ESTADOS_SOLICITUD = (
        ('001', 'ANULADA'),
        ('002', 'APROB. AUTOMAT 2DO NIVEL DE CREDITO'),
        ('003', 'APROB. CONDICIONAL'),
        ('004', 'APROBACION AUTOMATICA'),
        ('005', 'APROBADO'),
        ('006', 'CAMBIANDO INFORMACION'),
        ('007', 'EN NEGOCIACION'),
        ('008', 'EN REVISION'),
        ('009', 'EN VERIFICACION'),
        ('010', 'INGRESADA'),
        ('011', 'NEGADO'),
        ('012', 'NEGADO 2DO NIVEL DE CREDITO'),
        ('013', 'PENDIENTE DE ANALISIS'),
        ('014', 'POR CONFIRMAR PLAN'),
     )

    id = models.AutoField(primary_key=True, db_column='IdSolicitudCompra')
    numero = models.CharField(max_length=10, db_column='Numero')
    fecha_ingreso = models.DateTimeField(db_column='FechaIngreso')
    agencia = models.ForeignKey(Agencia, on_delete=models.PROTECT, db_column='IdAgencia')
    vendedor = models.ForeignKey(Empleado, on_delete=models.PROTECT, db_column='IdEmpleado')
    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT, db_column='IdCliente')
    plan = models.ForeignKey(Plan, on_delete=models.PROTECT, db_column='IdPlan')
    equipo = models.ForeignKey(Equipo, on_delete=models.PROTECT, db_column='IdEquipo')
    estado = models.CharField(max_length=3, choices=ESTADOS_SOLICITUD, default='010', db_column='Estado')

    class Meta:
        db_table = 'dashboard_solicitudescompra'

    def __str__(self):
        return self.numero