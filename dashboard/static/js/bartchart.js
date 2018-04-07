function CargaPlanesVendidos(data){

    Highcharts.chart('horBarChart', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Top 5 planes vendidos'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['Planes'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Poblacion (unidades)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' unidades'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: data
});
}

function graficoBarrasHorizontal() {

    var url = '/dashboard/planesvendidos/';

    $.ajax({
        url: url,
        type: 'get',
        success: function(data) {
            CargaPlanesVendidos(data);
        },
        failure: function(data) {
            console.log('Error al cargar planes mas vendidos');
        }
    });
}

function graficoBarrasHorizontalPorAgencia(agenciaid) {

    var url = '/dashboard/agencia/' + agenciaid + '/planesvendidos';

    $.ajax({
        url: url,
        type: 'get',
        success: function(data) {
            CargaPlanesVendidos(data);
        },
        failure: function(data) {
            console.log('Error al cargar planes mas vendidos por agencia');
        }
    });
}