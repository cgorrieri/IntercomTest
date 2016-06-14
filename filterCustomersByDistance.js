/*
 * We have some customer records in a text file (customers.json)
 * -- one customer per line, JSON-encoded.
 * We want to invite any customer within 100km of our Dublin office for some food and drinks on us.
 * Write a program that will read the full list of customers and output the names and user ids of matching customers
 * (within 100km), sorted by User ID (ascending).
 * - You can use the first formula from this Wikipedia article (https://en.wikipedia.org/wiki/Great-circle_distance)
 *   to calculate distance. Don't forget, you'll need to convert degrees to radians.
 * - The GPS coordinates for our Dublin office are 53.3381985, -6.2592576.
 * - You can find the Customer list here (https://gist.github.com/brianw/19896c50afa89ad4dec3).
 */

// If you have node.js installed you can use this
//const fs = require('fs');
// Else the content of the file is here
const customersFileContent = '{"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}\n'+
'{"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}\n'+
'{"latitude": "51.8856167", "user_id": 2, "name": "Ian McArdle", "longitude": "-10.4240951"}\n'+
'{"latitude": "52.3191841", "user_id": 3, "name": "Jack Enright", "longitude": "-8.5072391"}\n'+
'{"latitude": "53.807778", "user_id": 28, "name": "Charlie Halligan", "longitude": "-7.714444"}\n'+
'{"latitude": "53.4692815", "user_id": 7, "name": "Frank Kehoe", "longitude": "-9.436036"}\n'+
'{"latitude": "54.0894797", "user_id": 8, "name": "Eoin Ahearn", "longitude": "-6.18671"}\n'+
'{"latitude": "53.038056", "user_id": 26, "name": "Stephen McArdle", "longitude": "-7.653889"}\n'+
'{"latitude": "54.1225", "user_id": 27, "name": "Enid Gallagher", "longitude": "-8.143333"}\n'+
'{"latitude": "53.1229599", "user_id": 6, "name": "Theresa Enright", "longitude": "-6.2705202"}\n'+
'{"latitude": "52.2559432", "user_id": 9, "name": "Jack Dempsey", "longitude": "-7.1048927"}\n'+
'{"latitude": "52.240382", "user_id": 10, "name": "Georgina Gallagher", "longitude": "-6.972413"}\n'+
'{"latitude": "53.2451022", "user_id": 4, "name": "Ian Kehoe", "longitude": "-6.238335"}\n'+
'{"latitude": "53.1302756", "user_id": 5, "name": "Nora Dempsey", "longitude": "-6.2397222"}\n'+
'{"latitude": "53.008769", "user_id": 11, "name": "Richard Finnegan", "longitude": "-6.1056711"}\n'+
'{"latitude": "53.1489345", "user_id": 31, "name": "Alan Behan", "longitude": "-6.8422408"}\n'+
'{"latitude": "53", "user_id": 13, "name": "Olive Ahearn", "longitude": "-7"}\n'+
'{"latitude": "51.999447", "user_id": 14, "name": "Helen Cahill", "longitude": "-9.742744"}\n'+
'{"latitude": "52.966", "user_id": 15, "name": "Michael Ahearn", "longitude": "-6.463"}\n'+
'{"latitude": "52.366037", "user_id": 16, "name": "Ian Larkin", "longitude": "-8.179118"}\n'+
'{"latitude": "54.180238", "user_id": 17, "name": "Patricia Cahill", "longitude": "-5.920898"}\n'+
'{"latitude": "53.0033946", "user_id": 39, "name": "Lisa Ahearn", "longitude": "-6.3877505"}\n'+
'{"latitude": "52.228056", "user_id": 18, "name": "Bob Larkin", "longitude": "-7.915833"}\n'+
'{"latitude": "54.133333", "user_id": 24, "name": "Rose Enright", "longitude": "-6.433333"}\n'+
'{"latitude": "55.033", "user_id": 19, "name": "Enid Cahill", "longitude": "-8.112"}\n'+
'{"latitude": "53.521111", "user_id": 20, "name": "Enid Enright", "longitude": "-9.831111"}\n'+
'{"latitude": "51.802", "user_id": 21, "name": "David Ahearn", "longitude": "-9.442"}\n'+
'{"latitude": "54.374208", "user_id": 22, "name": "Charlie McArdle", "longitude": "-8.371639"}\n'+
'{"latitude": "53.74452", "user_id": 29, "name": "Oliver Ahearn", "longitude": "-7.11167"}\n'+
'{"latitude": "53.761389", "user_id": 30, "name": "Nick Enright", "longitude": "-7.2875"}\n'+
'{"latitude": "54.080556", "user_id": 23, "name": "Eoin Gallagher", "longitude": "-6.361944"}\n'+
'{"latitude": "52.833502", "user_id": 25, "name": "David Behan", "longitude": "-8.522366"}';

const DUBLIN_OFFICE = {latitude:53.3381985, longitude:-6.2592576};

/**
 * Calculates the distance between to locations in kilometers
 * @param lat1 <Number> Latitude of the first point
 * @param long1 <Number> Longitude of the first point
 * @param lat2 <Number> Latitude of the second point
 * @param long2 <Number> Longitude of the second point
 * @return Number The distance in kilometers 
 */
function calcDistance(lat1, long1, lat2, long2) {
  var r = Math.PI / 180;

  // Convert degrees to radians
  var pLon1 = r*long1, pLat1 = r*lat1,
      pLon2 = r*long2, pLat2 = r*lat2;
  // Calculate distance (@see https://en.wikipedia.org/wiki/Great-circle_distance)
  return 6371 * Math.acos(
    Math.sin(pLat1)*Math.sin(pLat2)
    + Math.cos(pLat1)*Math.cos(pLat2)*Math.cos(Math.abs(pLon1-pLon2))
  );
}

/**
 * Read the file with the list of customers and convert it into a JavaScript object
 * @param fileLocation Location of the file
 */
function getCustomersFromFile(fileLocation) {
  // If you use node.js, uncomment this line and comment the other one
  //var content = fs.readFileSync(fileLocation, "utf8");
  // Else keep this line
  var content = customersFileContent;
  if(!content) return [];
  return content.split('\n').map(JSON.parse);
}

/**
 * Filter the customers to keep the ones that are within the distance from a location
 * @param customer Array of customer having a latitude and longitude
 * @param origin Location to base the distance from
 * @param distance The distance of the radius within the customer has to be
 * @return Array Return the customers within the radius from the origin
 */ 
function getCustomersByProximity(customers, origin, radius) {
  // We don't do anything if there is an error in the input
  if (typeof customers === "undefined" || customers === null || customers.constructor !== Array) return null;
  if (typeof origin === "undefined" || origin === null || !origin.latitude || !origin.longitude) return null;
  if (typeof radius === "undefined" || radius === null || radius.constructor !== Number || radius < 0) return null;

  return customers.filter(customer => {
    return calcDistance(customer.latitude, customer.longitude, origin.latitude, origin.longitude) <= radius;
  });
}

var customers = getCustomersFromFile('./customers.json');
var customersWithin100Km = getCustomersByProximity(customers, DUBLIN_OFFICE, 100);

console.log(customersWithin100Km);