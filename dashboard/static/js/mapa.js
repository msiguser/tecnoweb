var map;
var infowindow;
var agencias;

function EsNulo(valor){
	return ((typeof valor === "undefined") || (valor == null) );
}


function CadenaNulaVacia(valor){
	return (EsNulo(valor) || (valor === "") );
}

function CrearContenidoInfo(lugar){
	
	return '<div><strong>' + (CadenaNulaVacia(lugar.name) ? '' : lugar.name) + '</strong><br>' + (CadenaNulaVacia(lugar.formatted_address) ? '' : lugar.formatted_address) + '</div>'
}

function CargaGraficos(lugar){
	
	var agenciaId = null;

	$.each(agencias, function( index, value ) {

		if(lugar.place_id == value.placeId){
			agenciaId = value.id;
		}

	});
	
	if(!EsNulo(agenciaId)){
        graficoBarrasHorizontal(agenciaId);
		graficoBarras(agenciaId);
		graficoManzana(agenciaId);
	}
	
}

function CrearMarcador(lugar) {    

	var lugarLoc = lugar.geometry.location;

    var marcador = new google.maps.Marker({
        map: map,
        position: lugarLoc
    });
	
	marcador.addListener('click', function() {
		
		var contenido = CrearContenidoInfo(lugar);
		
		infowindow.setContent(contenido);
		infowindow.open(map, marcador);
		
		CargaGraficos(lugar);
	});

}

function callback(place, status) {
	
  if (status === google.maps.places.PlacesServiceStatus.OK) {
	  CrearMarcador(place);
  }
}

function InitMap() {
	
	var coordenadasIniciales = {lat: -2.1842717, lng: -79.8800722};
	
	map = new google.maps.Map(document.getElementById('map'), {
	  center: coordenadasIniciales,
	  zoom: 12
	});
	
	
	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);

	$.ajax({
        url: '/dashboard/agencias/',
		async: 'false',
        type: 'get',
        success: function(data) {
        	agencias = data;

        	$.each(agencias, function( index, value ) {
				service.getDetails({ placeId: value.placeId }, callback);
			});
        },
        failure: function(data) {
        	console.log('Error al carga agencias');
        }
    });
}