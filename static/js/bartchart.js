function graficoBarrasHorizontal(agenciaid) {

    var url = '/dashboard/agencia/' + agenciaid + '/planesvendidos';

    $.ajax({
        url: url,
        type: 'get',
        success: function(data) {

            var svgEle = $("#horBarChart");

            svgEle.empty();

            var svg = d3.select("#horBarChart"),
                margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 80
                },
                width = +svgEle.width() - margin.left - margin.right,
                height = +svgEle.height() - margin.top - margin.bottom;

            var x = d3.scaleLinear().range([0, width]);
            var y = d3.scaleBand().range([height, 0]);

            var g = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            data.sort(function(a, b) { return a.value - b.value; });

            x.domain([0, d3.max(data, function(d) { return d.value; })]);
            y.domain(data.map(function(d) { return d.name; })).padding(0.1);

            g.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) {
                    //return parseInt(d / 1000);
                    return parseInt(d) ;
                })
                .tickSizeInner([-height]));

            g.append("g")
                .attr("class", "y axis")
                .call(d3.axisLeft(y));

            g.selectAll(".bar")
                .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("x", 0)
                .attr("height", y.bandwidth())
                .attr("y", function(d) {
                    return y(d.name);
                })
                .attr("width", function(d) {
                    return x(d.value);
                });
        },
        failure: function(data) {
            console.log('Error al cargar planes mas vendidos');
        }
    });
}