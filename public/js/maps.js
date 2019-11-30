function here_session() {
  var platform = new H.service.Platform({'apikey' : 'oZzBclPdXKF_feQvvI01Td179ZYGY5WrTnxHLDrMQig'
  });
  return platform
}

function start(result) {
  var latitude = JSON.stringify(result['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Latitude']);
  var longitude = JSON.stringify(result['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Longitude']);
  var latlong = latitude.concat(',',longitude);
  window.startlatlong=latlong;
}

function stop(result) {
  var latitude = JSON.stringify(result['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Latitude']);
  var longitude = JSON.stringify(result['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Longitude']);
  var latlong = latitude.concat(',',longitude);
  window.stoplatlong=latlong;
}

function geocode(platform,address,callback) {
  var geocoder = platform.getGeocodingService(),
    parameters = {
      searchtext: address,
      gen: '9'};

  geocoder.geocode(parameters,
    function (result) {
      callback(result);
    }, function (error) {
      alert(error);
    });
}

function get_car_route(platform) {

}

function get_carpool_route(platform) {

}

function get_pub_transport_route(platform,w0,w1) {
  var router = platform.getRoutingService(),
  parameters = {
    waypoint0: w0,
    waypoint1: w1,
    mode: 'fastest;publicTransport',
    avoidtransporttypes: 'aerial,inclined',
    combineChange: 'true'};

router.calculateRoute(parameters,
  function (result) {
    console.log(JSON.stringify(result));
  }, function (error) {
    alert(error);
  });
}

function get_pedestrian_route(platform) {

}

function get_all_routes(platform) {

}

//SUCCESS!!! (Test of ability to geocode addresses and get route)

var platform = here_session();
geocode(platform,'200 S Mathilda Sunnyvale CA',start);
geocode(platform,'456 W. Olive Ave. Sunnyvale, CA',stop);
setTimeout(function () {
  console.log(window.startlatlong);
  document.getElementById("start").innerHTML = startlatlong;
  console.log(window.stoplatlong);
  document.getElementById("stop").innerHTML = stoplatlong;
  get_pub_transport_route(platform,startlatlong,stoplatlong);
},400);
