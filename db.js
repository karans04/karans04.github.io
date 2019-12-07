var search_trends = new Array();


$(document).ready(function() {
  // AJAX in the data file
     $.ajax({
         type: "GET",
         url: "https://raw.githubusercontent.com/karans04/Tesla-Dashboard/master/data/choropleth_data.csv",
         dataType: "text",
         success: function(data) {processData(data);}
         });
 
     // Let's process the data from the data file
     function processData(d) {
          var lines = d.split(/\r\n|\n/);

          var headings = lines[0].split(',');
          for (var j=1; j<lines.length; j++) {
            var values = lines[j].split(','); 
            search_trends.push([values[1], values[2], parseFloat(values[3])]);
            
            
          };
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
                joinBy: ['iso-a2', 'code'],
                name: 'Population density',
                states: {
                    hover: {
                        color: '#a4edba'
                    }
                },
                tooltip: {
                    valueSuffix: '/km²'
                }
            }]
        });
          


          
          
        }
 })

 
