
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

// News API Code

// Global variables for News API

var city = $("#cityInput")

var country = $("#countryInput")



// Travel Advisory
// "https://www.travel-advisory.info/api"

//News
function logNewsAPIQuery() {
    var combinedCityCountry = city.val().trim().concat("%20", country.val().trim(), "%20covid");
    return "http://newsapi.org/v2/everything?q=" +combinedCityCountry+ "&from=2020-11-18&sortBy=publishedAt&apiKey=98fd7faf9093410f8ecd11562a55f1ed";

}

function updateNewsSection(response) {
    console.log(response);
    // console.log("News API Query: " + combinedCityCountry);

    
    var numArticles = 5;

    for (var i = 0; i < numArticles; i++) {
        var title = response.articles.source.title[i];

        var articleCount = i + 1;

        var $articleList = $("<ul>");
        $articleList.addClass("list-group");

        $("#article-section").append($articleList);

        var articleListItem = $("")

        var description = response.articles.source.description[i];
        
        var articleURL = response.articles.source.url[i];

        var publishedDate = response.articles.source.publishedAt;

        if (title) {
            $articleList.append("<span class>")
        }
    }
}

//Click Handlers for News API
$("#userInput").on("submit", function(event) {
    event.preventDefault();

    clearInterval();

    var newsAPI = logNewsAPIQuery();

    $.ajax({
        url: newsAPI,
        method: "GET",
    }).then(updateNewsSection);
});
$("#checkCity").on("click", search);
//$(cityInput).empty()
//$(countryInput).empty()
//$("#advisoryResults").empty()
//$("#covidResults").empty()
//$("#newsResults").empty()