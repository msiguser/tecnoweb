function CargarEquipos(data){

    Highcharts.chart('myBarChart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Equipos preferidos'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Equipos'],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Unidades'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} unidad</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: data
    });
}

function graficoBarras() {

    var url = '/dashboard/equipospreferidos/';

    $.ajax({
        url: url,
        type: 'get',
        success: function(data) {
            CargarEquipos(data);
        },
        failure: function(data) {
            console.log('Error al cargar equipos preferidos');
        }
    });

}
function graficoBarrasPorAgencia(agenciaid) {

    var url = '/dashboard/agencia/' + agenciaid + '/equipospreferidos';

    $.ajax({
        url: url,
        type: 'get',
        success: function(data) {
            CargarEquipos(data);
        },
        failure: function(data) {
            console.log('Error al cargar equipos preferidos por agencia');
        }
    });
}