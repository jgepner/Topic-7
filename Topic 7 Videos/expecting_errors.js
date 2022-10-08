// imaginary fetch function, gets data from API; don't write this code!

fetch(url, function(error, response) {
    if (error) {
        console.log('Oh no! error fetching data!', error)
    } else {
        processResponse(response, function(error, data) {
            if (error)  {
                console.log('Oh dear! Error processing response!', error)
            } else {
                // do something with data
            }
        })
    }
})