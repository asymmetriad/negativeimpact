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

    });
}

function calcpubpollrate(line) {
  //console.log(line['type']);
  var bus = ['busPublic','busTouristic','busIntercity','busExpress']
  var commrail = ['railMetro', 'railMetroRegional','railRegional'];
  var icrail = ['trainRegional', 'trainIntercity', 'trainHighSpeed'];
  var literail = ['railLight','monoRail'];
  var ferry = ['water'];
  if (bus.indexOf(line['type'])>=0){
    return 283.2;
  } else if (commrail.indexOf(line['type'])>=0){
    return 167.2;
  } else if (icrail.indexOf(line['type'])>=0){
    return 141.7;
  } else if (literail.indexOf(line['type'])>=0){
    return 220.4;
  } else if (ferry.indexOf(line['type'])>=0) {
    return 863.8;
  }
}

function get_bike_route(platform,w0,w1) {
  var router = platform.getRoutingService(),
    parameters = {
      waypoint0: w0,
      waypoint1: w1,
      mode: 'fastest;bicycle',
      maneuverattributes: 'ac,di,le,pt,sh',
      departure: 'now',
      metricSystem: 'imperial'
    };
  window.biketranspoll=0;
  //need to add pollution calculation for potential ferry rides
  router.calculateRoute(parameters,
    function (result) {
      for (var man in result['response']['route'][0]['leg'][0]['maneuver']) {
        if(result['response']['route'][0]['leg'][0]['maneuver'][man]['action']==='ferry'){
          var distcov = result['response']['route'][0]['leg'][0]['maneuver'][man]['length'];
          //console.log(distcov*0.00056818181);
          window.biketranspoll = window.biketranspoll + 863.8*distcov*0.00056818181;
        }
        var directions = document.getElementById("bikedirections");
        var maneuver = document.createElement("DIV");
        maneuver.innerHTML = result['response']['route'][0]['leg'][0]['maneuver'][man]['instruction'];
        directions.appendChild(maneuver);
      }
      var bkplltn = document.getElementById("bikepoll");
      bkplltn.innerHTML = window.biketranspoll;
    }, function (error) {

    });
}

function get_car_route(platform,w0,w1) {
  var router = platform.getRoutingService(),
    parameters = {
      waypoint0: w0,
      waypoint1: w1,
      mode: 'fastest;car;traffic:enabled',
      maneuverattributes: 'ac,di,le,pt,sh',
      departure: 'now',
      metricSystem: 'imperial'
    };
  window.cartranspoll=0;
  window.ubertranspoll=0;
  //need to add pollution calculation for potential ferry rides
  router.calculateRoute(parameters,
    function (result) {
      for (var man in result['response']['route'][0]['leg'][0]['maneuver']) {
        var distcov = result['response']['route'][0]['leg'][0]['maneuver'][man]['length'];
          //console.log(distcov*0.00056818181);
        window.cartranspoll = window.cartranspoll + 269.1*distcov*0.00056818181;
        window.ubertranspoll = window.ubertranspoll + 374.4*distcov*0.00056818181;
        var directions = document.getElementById("cardirections");
        var maneuver = document.createElement("DIV");
        maneuver.innerHTML = result['response']['route'][0]['leg'][0]['maneuver'][man]['instruction'];
        directions.appendChild(maneuver);
      }
      var crplltn = document.getElementById("carpoll");
      crplltn.innerHTML = window.cartranspoll;
      var ubrplltn = document.getElementById("uberpoll");
      ubrplltn.innerHTML = window.ubertranspoll;
    }, function (error) {

    });
}

function get_hov_route(platform,w0,w1) {
  var router = platform.getRoutingService(),
    parameters = {
      waypoint0: w0,
      waypoint1: w1,
      mode: 'fastest;carHOV;traffic:enabled',
      maneuverattributes: 'ac,di,le,pt,sh',
      departure: 'now',
      metricSystem: 'imperial'
    };
  window.hovtranspoll=0;
  //need to add pollution calculation for potential ferry rides
  router.calculateRoute(parameters,
    function (result) {
      for (var man in result['response']['route'][0]['leg'][0]['maneuver']) {
        var distcov = result['response']['route'][0]['leg'][0]['maneuver'][man]['length'];
          //console.log(distcov*0.00056818181);
        window.hovtranspoll = window.hovtranspoll + 177.8*distcov*0.00056818181;
        var directions = document.getElementById("hovdirections");
        var maneuver = document.createElement("DIV");
        maneuver.innerHTML = result['response']['route'][0]['leg'][0]['maneuver'][man]['instruction'];
        directions.appendChild(maneuver);
      }
      var hvplltn = document.getElementById("hovpoll");
      hvplltn.innerHTML = window.hovtranspoll;
    }, function (error) {

    });
}

function get_pub_transport_route(platform,w0,w1) {
  var router = platform.getRoutingService(),
  parameters = {
    waypoint0: w0,
    waypoint1: w1,
    mode: 'fastest;publicTransport;traffic:enabled',
    avoidtransporttypes: 'aerial,inclined,privateService',
    combineChange: 'true',
    maneuverattributes: 'ac,di,le,pt,sh',
    departure: 'now',
    metricSystem: 'imperial'
  };

  window.pubtranspoll=0;
  router.calculateRoute(parameters,
  function (result) {
    const lineIds = [];
    for (var line in result['response']['route'][0]['publicTransportLine']) {
      lineIds.push(result['response']['route'][0]['publicTransportLine'][line]['id']);
    }
    for (var man in result['response']['route'][0]['leg'][0]['maneuver']) {
      if (lineIds.indexOf(result['response']['route'][0]['leg'][0]['maneuver'][man]['line'])>=0){
        var distcov = result['response']['route'][0]['leg'][0]['maneuver'][man]['length'];
        //console.log(calcpubpollrate(result['response']['route'][0]['publicTransportLine'][line])*distcov*0.00056818);
        window.pubtranspoll = window.pubtranspoll + calcpubpollrate(result['response']['route'][0]['publicTransportLine'][line])*distcov*0.00056818181;
      }
    }
    var pblcplltn = document.getElementById("pubpoll");
    pblcplltn.innerHTML = window.pubtranspoll;
    for (var man in result['response']['route'][0]['leg'][0]['maneuver']) {
      //console.log(JSON.stringify(result['response']['route'][0]['leg'][0]['maneuver'][man]['action']));
      var directions = document.getElementById("pubdirections");
      var maneuver = document.createElement("DIV");
      maneuver.innerHTML = result['response']['route'][0]['leg'][0]['maneuver'][man]['instruction'];
      directions.appendChild(maneuver);
    }
    //setTimeout(function () {
    //  console.log(window.instruct);
    //},1000);
  }, function (error) {

  });
}

function get_pedestrian_route(platform,w0,w1) {
  var router = platform.getRoutingService(),
    parameters = {
      waypoint0: w0,
      waypoint1: w1,
      mode: 'fastest;pedestrian',
      maneuverattributes: 'ac,di,le,pt,sh',
      departure: 'now',
      metricSystem: 'imperial'
    };
  window.pedtranspoll=0;
  //need to add pollution calculation for potential ferry rides
  router.calculateRoute(parameters,
    function (result) {
      for (var man in result['response']['route'][0]['leg'][0]['maneuver']) {
        if(result['response']['route'][0]['leg'][0]['maneuver'][man]['action']==='ferry'){
          var distcov = result['response']['route'][0]['leg'][0]['maneuver'][man]['length'];
          //console.log(distcov*0.00056818181);
          window.pedtranspoll = window.pedtranspoll + 863.8*distcov*0.00056818181;
        }
        var directions = document.getElementById("peddirections");
        var maneuver = document.createElement("DIV");
        maneuver.innerHTML = result['response']['route'][0]['leg'][0]['maneuver'][man]['instruction'];
        directions.appendChild(maneuver);
      }
      var pdplltn = document.getElementById("pedpoll");
      pdplltn.innerHTML = window.pedtranspoll;
    }, function (error) {

    });
}

function get_all_routes(platform,startlatlong,stoplatlong) {
  var publicTransportRoute = get_pub_transport_route(platform,startlatlong,stoplatlong);
  var pedTranportRoute = get_pedestrian_route(platform,startlatlong,stoplatlong);
  var carRoute = get_car_route(platform,startlatlong,stoplatlong);
  var hovRoute = get_hov_route(platform,startlatlong,stoplatlong);
  var bikeRoute = get_bike_route(platform,startlatlong,stoplatlong);
}

//SUCCESS!!! (Test of ability to geocode addresses and get route)
var platform = here_session();
var strtaddrss = document.getElementById("startaddr");
var stpaddrss = document.getElementById("stopaddr");
//geocode(platform,'200 Vesey St, New York, NY 10281',start);
startaddress = strtaddrss.innerHTML;
stopaddress = stpaddrss.innerHTML;
geocode(platform,startaddress,start);
geocode(platform,stopaddress,stop);
setTimeout(function () {
  document.getElementById("start").innerHTML = startlatlong;
  document.getElementById("stop").innerHTML = stoplatlong;
  get_all_routes(platform,startlatlong,stoplatlong);
},1000);
