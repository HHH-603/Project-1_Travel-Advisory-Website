
function search(event){
    event.preventDefault()
    $("#advisoryResults").empty()
    $("#covidResults").empty()
    $("#newsResults").empty()
    
    var cityInput = $("#cityInput").val()
    var countryInput = $("#countryInput").val()
    

    //Travel advisory.info web API
    var queryURL = "https://www.travel-advisory.info/api";
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response.data)
        var countryList = Object.keys(response.data).map(function(code){
            return {name:response.data[code].name, advisory:response.data[code].advisory}
        });
        console.log(countryList)
        var found = countryList.find(function(o){
            return o.name.toLowerCase() === countryInput.toLowerCase()
        })
        console.log(found)
        //$("#advisoryResults").append(found.name)     name included in message
        $("#advisoryResults").append(found.advisory.message)


    console.log(countryInput)
    
    //Covid 19 UN statistics API
    var queryURL = "https://disease.sh/v3/covid-19/countries/" + countryInput + "?yesterday=true&twoDaysAgo=false&strict=false&allowNull=true";
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#covidResults").append(response.country).append(":  ")
        $("#covidResults").append("Cases:  ").append(response.cases)
        $("#covidResults").append("Deaths:  ").append(response.deaths)
        $("#covidResults").append("Cases per million:  ").append(response.casesPerOneMillion)
        $("#covidResults").append("Deaths per million:  ").append(response.deathsPerOneMillion)
        $("#covidResults").append("Active cases:  ").append(response.active)
        $("#covidResults").append("Recovered:  ").append(response.recovered)
    })

    //localStorage.setItem("searchItems", cityInput)

})}

$("#checkCity").on("click", search);
//$(cityInput).empty()
//$(countryInput).empty()
//$("#advisoryResults").empty()
//$("#covidResults").empty()
//$("#newsResults").empty()