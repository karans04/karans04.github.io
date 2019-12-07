var presale_data = new Array();


$(document).ready(function() {
  // AJAX in the data file
     $.ajax({
         type: "GET",
         url: "https://raw.githubusercontent.com/karans04/Tesla-Dashboard/master/data/Cybertruck_preorders.csv",
         dataType: "text",
         success: function(data) {processData(data);}
         });
 
     // Let's process the data from the data file
     function processData(d) {
          var lines = d.split(/\r\n|\n/);

          var headings = lines[0].split(',');
          for (var j=1; j<lines.length; j++) {
            var values = lines[j].split(','); 
            
            presale_data.push([Date.parse(values[0]), parseFloat(values[1])]);
            
          };
          

          // last 7 day stock volume 
          Highcharts.chart('presale', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Number of Cybertrucks Presale Orders Over Time'
            },
            
            xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                month: '%b \'%y'
              },
              crosshair: {
                color: 'red',
                zIndex: 5
              },
              minorTickInterval: 1000*60*60*24,
            },



            yAxis: {
                min: 0,
                title: {
                    text: 'Number of pre Orders'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Tesla',
                data: presale_data
          
            }]
          });


          
          
        }
 })

 
