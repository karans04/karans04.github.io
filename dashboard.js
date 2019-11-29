var candle_data = new Array();
var date_data = new Array();
var volume_data = new Array();

$(document).ready(function() {
  // AJAX in the data file
     $.ajax({
         type: "GET",
         url: "https://raw.githubusercontent.com/karans04/Tesla-Dashboard/master/data/Tesla_daily_stock_nov19.csv",
         dataType: "text",
         success: function(data) {processData(data);}
         });
 
     // Let's process the data from the data file
     function processData(d) {
          var lines = d.split(/\r\n|\n/);

          var headings = lines[0].split(',');
          for (var j=1; j<lines.length-1; j++) {
            var values = lines[j].split(','); 
          
            candle_data.push([Date.parse(values[0]), parseFloat(values[1]), parseFloat(values[2]),parseFloat(values[3]), parseFloat(values[4])]);
            volume_data.push([Date.parse(values[0]), parseFloat(values[6])]);
          };
          

          // last 7 day stock volume 
          Highcharts.chart('volume', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Volume of Tesla stock traded'
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
              events: {
                  setExtremes: syncExtremes
              },
              minorTickInterval: 1000*60*60*24,
            },



            yAxis: {
                min: 0,
                title: {
                    text: 'TSLA stock ($)'
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
                data: volume_data
          
            }]
          });


          console.log(candle_data)
          // last 7 day stock info 
          Highcharts.chart('stock_price', {
            chart: {
                type: 'candlestick'
            },
            title: {
                text: 'Tesla stock'
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
              events: {
                  setExtremes: syncExtremes
              },
              minorTickInterval: 1000*60*60*24,
            },



            yAxis: {
                title: {
                    text: 'TSLA stock ($)'
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
                data: candle_data
          
            }]
          });








['mouseleave'].forEach(function (eventType) {
  document.getElementById('DashboardChartElem').addEventListener(
      eventType,
      function (e) {
          var chart,
              point,
              i,
              event;
          
              for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                  chart = Highcharts.charts[i];
                  event = chart.pointer.normalize(e);
                  point = chart.series[0].searchPoint(event, true);
                  
                  if (point) {
                      point.onMouseOut(); 
                      chart.tooltip.hide(point);
                      chart.xAxis[0].hideCrosshair(); 
                  }
              }
          }
  )
});

['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
  document.getElementById('DashboardChartElem').addEventListener(
      eventType,
      function (e) {
          var chart,
              point,
              i,
              event,
              idx;

          for (i = 0; i < Highcharts.charts.length; i = i + 1) {
              chart = Highcharts.charts[i];
              event = chart.pointer.normalize(e);
              point = chart.series[0].searchPoint(event, true);
              idx = chart.series[0].data.indexOf( point );

              if (point) {
                  point.highlight(e);
                  renderPie(idx);
              }
          }
      }
  );
});


Highcharts.Point.prototype.highlight = function (event) {
  event = this.series.chart.pointer.normalize(event);
  this.onMouseOver(); 
  this.series.chart.tooltip.refresh([this]); 
  this.series.chart.xAxis[0].drawCrosshair(event, this); 
  this.series.chart.yAxis[0].drawCrosshair(event, this);
};

/**
 * Synchronize zooming through the setExtremes event handler.
 */
function syncExtremes(e) {
  var thisChart = this.chart;

  if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
      Highcharts.each(Highcharts.charts, function (chart) {
          if (chart !== thisChart) {
              if (chart.xAxis[0].setExtremes) { 
                  chart.xAxis[0].setExtremes(
                      e.min,
                      e.max,
                      undefined,
                      false,
                      { trigger: 'syncExtremes' }
                  );
              }
          }
      });
  }
}

          
        }
 })

 
