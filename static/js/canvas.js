function CargarSolicitudesEstados(data){
    Highcharts.chart('myPieChart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Estados de solicitud'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: data
        }]
    });
}

function graficoManzana(agenciaid) {

    var url = '/dashboard/solicitudestados/';

    $.ajax({
        url: url,
        type: 'get',
        success: function(data) {
            CargarSolicitudesEstados(data);
        },
        failure: function(data) {
            console.log('Error al carga estados solicitud');
        }
    });
}

function graficoManzanaPorAgencia(agenciaid) {

    var url = '/dashboard/agencia/' + agenciaid + '/solicitudestados';

    $.ajax({
        url: url,
        type: 'get',
        success: function(data) {
            CargarSolicitudesEstados(data);
        },
        failure: function(data) {
            console.log('Error al carga estados solicitud por agencia');
        }
    });
}