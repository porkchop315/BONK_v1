var current_mode = localStorage.getItem('current_mode') || 'light';

/** this is the function to draw pink highlight line on hover **/
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
   draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
         var activePoint = this.chart.tooltip._active[0],
             ctx = this.chart.ctx,
             x = activePoint.tooltipPosition().x,
             topY = this.chart.legend.bottom,
             bottomY = this.chart.chartArea.bottom;

         // draw line
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = 2;
         ctx.strokeStyle = '#ff007e';
         ctx.stroke();
         ctx.restore();
      }
   }
});


/** function to make ajax requests **/
function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}




function convert(time){

 // Unixtimestamp
 var unixtimestamp = time;

 // Months array
 var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

 // Convert timestamp to milliseconds
 var date = new Date(unixtimestamp);

 // Year
 var year = date.getFullYear();

 // Month
 var month = months_arr[date.getMonth()];

 // Day
 var day = date.getDate();

 // Hours
 var hours = date.getHours();

 // Minutes
 var minutes = "0" + date.getMinutes();

 // Seconds
 var seconds = "0" + date.getSeconds();

 // Display date time in MM-dd-yyyy h:m:s format
 var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
 
 return convdataTime;
 
}


/** function to find out array high and low values **/
function arrayMin(arr) {
  var len = arr.length, min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
};



function arrayMax(arr) {
  var len = arr.length, max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
};


/** this is the function to render white fonts and white gridlines on the chart **/
function darkchart(chart) {
    chart.options = {
		responsive: true,
	    title: {
	      display: false,
	      text: '24h BONK Price in $ (By Uniswap)',
	      fontColor: '#fff',
	      fontSize: '16',
	      fontFamily: "'heebo', sans-serif",
		  fontStyle: 600,
		  padding: 16
	    },
	    tooltips:{
	    	mode: 'index',
	        intersect: false
	     },
	    hover: {
			mode: 'nearest',
			intersect: true
		},
	    legend: {
	    	 display: false,
		},
    	scales: {
        yAxes: [{
            ticks: {
            	fontColor: "rgba(255,255,255,0.3)",
                fontSize: 12,
        		fontFamily: "'heebo', sans-serif",
				fontStyle: 100,
				padding: 16
            },
            gridLines: {
  				display: true ,
				color: "rgba(255,255,255,0.1)",
				drawTicks: false
			}
        }],
        xAxes: [{
            ticks: {
            	display: false,
            	fontColor: "rgba(0,0,0,0)",
                fontSize: 12,
        		fontFamily: "'heebo', sans-serif",
        		fontStyle: 100
            },
            gridLines: {
  				display: true ,
				color: "rgba(255,255,255,0)",
				drawTicks: false
			}
        }]
    	}
    };
    chart.update();
}



function lightchart(chart) {
    chart.options = {
	    responsive: true,
	    title: {
		  display: false,
		  text: '24h BONK Price in $ (By Uniswap)',
	      fontColor: '#231f20',
	      fontSize: '16',
	      fontFamily: "'heebo', sans-serif",
		  fontStyle: 600,
		  padding: 16
	    },
	    tooltips:{
	    	mode: 'index',
	        intersect: false
	     },
	    hover: {
			mode: 'nearest',
			intersect: true
		},
	    legend: {
	    	 display: false,
		},
    	scales: {
        yAxes: [{
            ticks: {
            	fontColor: "rgba(35,31,32,0.7)",
                fontSize: 12,
        		fontFamily: "'heebo', sans-serif",
				fontStyle: 100,
				padding: 16,
				autoSkip: true,
            },
            gridLines: {
  				display: true ,
				color: "rgba(0,0,0,0.1)",
				drawTicks: false
			}
        }],
        xAxes: [{
            ticks: {
            	display: false,
            	fontColor: "rgba(0,0,0,0.2)",
                fontSize: 12,
        		fontFamily: "'heebo', sans-serif",
        		fontStyle: 100
            },
            gridLines: {
  				display: true ,
				color: "rgba(0,0,0,.1)",
				drawTicks: false
			}
        }]
    	}
    };
    chart.update();
}





$(document).ready(function(){

var canvas = document.getElementById("line-chart");
var ctx = canvas.getContext("2d");
ctx.font = "16px 'heebo', sans-serif";
ctx.textAlign = "center";
ctx.fillStyle = "black";
if (current_mode == 'dark') {
  ctx.fillStyle = "white";
      } else {
  ctx.fillStyle = "black";
 }
ctx.fillText("Loading...", canvas.width/2, canvas.height/2);

/** this is the code to draw the chart for the first time **/
var random = Math.floor(Math.random() * 10000);
var x = [];
var y = [];
ajax_get('https://api.coingecko.com/api/v3/coins/bonk-token/market_chart?vs_currency=usd&days=7', function(data) {

	
				/** fetch the price data **/
				for (i = 0; i < data['prices'].length; i++) {
						x[i] = precise3(data['prices'][i][1]);
						y[i] = convert(data['prices'][i][0]);
				}

				var max = Math.max.apply(Math, x);
				var min = Math.min.apply(Math, x);


				/** plot the chart **/

				var gradientFill = ctx.createLinearGradient(250, 0, 250, 450);
					gradientFill.addColorStop(0, "rgba(169, 140, 108, 0.3)");
					gradientFill.addColorStop(1, "rgba(169, 140, 108, 0.2)");

				var chart = new Chart(document.getElementById("line-chart"), {
				  type: 'LineWithLine',
				  defaultFontFamily: "'heebo', sans-serif",
				  data: {
				    labels: y,
				    datasets: [{ 
				        data: x,
				        label: "BONK",
				        borderColor: "#a98c6c",
				        backgroundColor: gradientFill,
				        pointColor: "#a98c6c",
				        pointStrokeColor: "#a98c6c",
				        pointHighlightFill: "#a98c6c",
				        pointHighlightStroke: "#a98c6c",
				        pointRadius: 0,
						pointHoverRadius: 8
				      }
				    ]
				  },
				  options: {
				  	responsive: true,
				    title: {
				      display: true,
				      text: 'BONK Price Chart 24h',
				      fontColor: '#231f20',
				      fontSize: '16',
				      fontFamily: "'heebo', sans-serif",
				      fontStyle: 600
				    },
				    tooltips:{
				    	mode: 'index',
				        intersect: false
				     },
				    hover: {
						mode: 'nearest',
						intersect: true
					},
				    legend: {
				    	 display: false,
					},
					scales: {
				        yAxes: [{
				            ticks: {
				            	fontColor: "rgba(0,0,0,0.2)",
				                fontSize: 12,
				        		fontFamily: "'heebo', sans-serif",
				        		fontStyle: 100
				            }
				        }],
				        xAxes: [{
				            ticks: {
				            	display: false,
				            	fontColor: "rgba(0,0,0,0.2)",
				                fontSize: 12,
				        		fontFamily: "'heebo', sans-serif",
				        		fontStyle: 100
				            }
				        }]
				    }
				  }
				});

				/** this is the code to re-render dark compatible colors **/
				if (current_mode == 'dark') {
			      darkchart(chart);
			      } else {
			      lightchart(chart);
			    }


			    /** add click binder for darkmode of the charting function ***/
			    $(".darkmode").click(function(){ 
			          if (current_mode == 'dark') {
			            darkchart(chart);
			          } else {
			            lightchart(chart);
			          } 
			     });
		});


});

