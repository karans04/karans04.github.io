Highcharts.getJSON('https://github.com/karans04/Tesla-Dashboard/blob/master/data/choropleth_json.json', function (data) {
  console.log(data);
    // Initiate the chart
    Highcharts.mapChart('stock_price', {

        chart: {
            marginLeft: 70
        },

        title: {
            text: 'Legend alignment'
        },

        legend: {
            title: {
                text: 'Population density per km²'
            },
            align: 'left',
            verticalAlign: 'middle',
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: 'white'
        },

        mapNavigation: {
            enabled: true,
            enableButtons: false
        },

        colorAxis: {
            min: 1,
            max: 1000,
            type: 'logarithmic'
        },

        series: [{
            data: data,
            mapData: Highcharts.maps['custom/world'],
            joinBy: ['iso-a2', 'Code'],
            name: 'ga',
            states: {
                hover: {
                    color: '#a4edba'
                }
            },

        }]
    });
});