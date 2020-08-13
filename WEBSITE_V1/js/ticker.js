var curprice = 0;
var buyusd = '--';
var buyeth = '--';

function precise3(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:3});
}

function precise2(x) {
  return x.toLocaleString(undefined, {maximumFractionDigits:2});
}

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


function color(x) {
  if(x<0) {
     return '<span class="red">'+precise2(x)+'% &#x2193;</span>';
  } else {
    return '<span class="green">+'+precise2(x)+'% &#x2191;</span>';
  }
}



function fetchdata()
{
  var num = Math.floor(Math.random() * 10000);

  ajax_get('https://api.coingecko.com/api/v3/coins/bonk-token?tickers=true&market_data=true&sparkline=false', function(data) {
  

        ajax_get('https://api.coingecko.com/api/v3/coins/ethereum?tickers=true&market_data=true&sparkline=false', function(data1) {
                  //buyusd = data['market_data']['current_price']['usd'];
                  buyusd = data['market_data']['current_price']['usd'];
                  ethprice = data1['market_data']['current_price']['usd'];

                  buyeth = precise3(ethprice/buyusd);

                  percentage = precise3(data['market_data']['price_change_percentage_24h']);

                  document.getElementById("USD").innerHTML = precise3(buyusd);
                  document.getElementById("trades").innerHTML = precise2(percentage)+' %';
                  document.getElementById("mcap").innerHTML = precise2(buyusd*3000000);
                  document.getElementById("supply").innerHTML = precise2(3000000);
       }); 

  }); 
}


function pricerefresh(){
  var x = setInterval(function() {
  fetchdata(); 
  
}, 25000);
}

window.onload = function() {
  fetchdata();
  pricerefresh();
}
