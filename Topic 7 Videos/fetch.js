let url = 'https://api.wheretheiss.at/v1/satellites/25544'

// make variables for the two spans from the HTML div
let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')

// adding date and time
let timeIssLocationFetched = document.querySelector('#time')

let maxFailedAttempts = 3
let update = 10000 // make update interval a variable (10 sec)
let issMarker  //declare variable for marker
let icon = L.icon( {  //create icon for map
    iconUrl: 'iss_icon.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]  // have icon centered over point
})

// create map with coordinates, zoom.  Use id (don't need #)
let map = L.map('iss-map').setView([0,0], 1)

// add .tileLayer for map -- copy from last week;use variable "map"
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss(maxFailedAttempts)  // call function one time to start

// fetch has one argument: the url; need to use 'then'
// res for response; json is a built-in function to extract JSON
function iss(attempts)  {   // put fetch in a function to update every 10 sec
    if (attempts <=0 ) {  // message after 3 failed attempts
        alert('Failed to contact ISS server after several attempts.')
        return
    }

    fetch(url).then( (res) => {  // function call being made
        return res.json()  // process response into JSON; could take time
    }).then ( (issData) => {  // if call successful: do this function:
        console.log(issData)   //issData contains response as JSON
        // get data into spans:  display on web page
        let lat = issData.latitude  // retrieving latitude
        let long = issData.longitude
        issLat.innerHTML = lat  // make span text = latitude
        issLong.innerHTML = long

        // create marker if it doesn't exist
        // move marker if it already exists
        if (!issMarker) {  // true if no marker; if none then create it
            // issMarker = L.marker([lat, long]).addTo(map)  Before adding custom icon
            issMarker = L.marker([lat, long], {icon: icon} ).addTo(map)
        } else {  // if marker exists, move it
            issMarker.setLatLng([lat, long])
        }

        // use similar structure as before to add date
        let now = Date()
        timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`

    }).catch( (err) => {  // if error in response or in JSON
        attempts = attempts-1  // subtracts failed attempts
        console.log('ERROR!', err)
    }).finally(  ()  => {   // works whether fetch worked or failed
        setTimeout(iss, update, attempts)
    })
}



