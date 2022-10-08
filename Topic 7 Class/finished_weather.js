const weatherUrl = 'https://api.weather.gov/gridpoints/MPX/116,72/forecast'

const weatherTable = document.querySelector('#weather-forecast')

fetch(weatherUrl) // could take time; returns a promise: get data or send message
    .then(response => response.json()) // data to JS; takes a few seconds; also a promise
    // .json() returns a Promise since conversion takes time
    // to get data from a promise, use .then with a callback function
    // which is called if promise works
    // response is a variable we created
    // what is returned from response.json winds up in weatherJson
    .then( weatherJson => {
        displayWeatherTable(weatherJson)  // call a function to keep this code clearer
    }).catch(error => {
        console.log(error)   // details in console for developer
        alert('Sorry, could not fetch the weather forecast')  // generic error to user
})


function displayWeatherTable(weatherJson) {
    console.log(weatherJson)
    let forecasts = weatherJson.properties.periods  // array with forecasts
    console.log(forecasts)

    //loop thru data
    forecasts.forEach( forecast => {
        let day = forecast.name
        let temp = forecast.temperature
        let detail = forecast.detailedForecast
        let weatherIconUrl = forecast.icon  // its a url string

        // create table row
        let tableRow = document.createElement('tr')

        // cell for day, add to table row
        let dayTableCell = document.createElement('td')
        dayTableCell.innerHTML = day
        // tableRow.appendChild(dayTableCell)   // could add individually...

        // cell for temperature, add to table row
        let tempTableCell = document.createElement('td')
        tempTableCell.innerHTML = temp
        // tableRow.appendChild(tempTableCell)   // adding individually...

        let weatherImage = document.createElement('img')
        weatherImage.src = weatherIconUrl

        let weatherImageTableCell = document.createElement('td')
        // Add image to table cell
        weatherImageTableCell.appendChild(weatherImage)
        // tableRow.appendChild(weatherImageTableCell)   // adding individually....

        // cell for detailed forecast, add to table row
        let detailTableCell = document.createElement('td')
        detailTableCell.innerHTML = detail
        // tableRow.appendChild(detail)   // adding individually...

        // Or use append multiple children to an element
        tableRow.append(dayTableCell, tempTableCell, weatherImageTableCell, detailTableCell)  // ....or add all at once

        // append row to table
        weatherTable.appendChild(tableRow)

    })
}