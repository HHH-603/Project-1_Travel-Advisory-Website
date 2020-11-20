function search() {
    $("#advisoryResults").empty()
    $("#covidResults").empty()
    $("#newsResults").empty()
    var cityInput = $("#cityInput").val()
    var countryInput = $("#countryInput").val()


    localStorage.setItem("lastCity", cityInput)
    localStorage.setItem("lastCountry", countryInput)
    $("#about").addClass("hide")
    $("#advisoryResults").removeClass("hide")
    $("#covidResults").removeClass("hide")
    $("#newsResults").removeClass("hide")


    //Travel advisory.info web API
    var queryURL = "https://www.travel-advisory.info/api";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data)
        var countryList = Object.keys(response.data).map(function (code) {
            return { name: response.data[code].name, advisory: response.data[code].advisory }
        });
        console.log(countryList)
        var found = countryList.find(function (o) {
            return o.name.toLowerCase() === countryInput.toLowerCase()
        })
        console.log(found)
        $("#advisoryResults").append(found.advisory.message)
        console.log(countryInput)
        //Covid 19 UN statistics API
        var queryURL = "https://disease.sh/v3/covid-19/countries/" + countryInput + "?yesterday=true&twoDaysAgo=false&strict=false&allowNull=true";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var countryDiv = $("<div>")
            var casesDiv = $("<div>")
            var deathsDiv = $("<div>")
            var cpmDiv = $("<div>")
            var dpmDiv = $("<div>")
            var activeDiv = $("<div>")
            var recoverDiv = ("<div>")
            $(countryDiv).append(response.country).append(":  ");
            $(casesDiv).append("Cases:  ").append(response.cases);
            $(deathsDiv).append("Deaths:  ").append(response.deaths);
            $(cpmDiv).append("Cases per million:  ").append(response.casesPerOneMillion);
            $(dpmDiv).append("Deaths per million:  ").append(response.deathsPerOneMillion);
            $(activeDiv).append("Active cases:  ").append(response.active);
            $(recoverDiv).append("Recovered:  ").append(response.recovered);
            $("#covidResults").append(countryDiv).append(casesDiv).append(deathsDiv).append(cpmDiv).append(dpmDiv).append(activeDiv).append(recoverDiv)
        })



    })
}



function pageLoad() {
    var loadCity = localStorage.getItem("lastCity")
    var loadCountry = localStorage.getItem("lastCountry")
    console.log(loadCountry)
    $("#cityInput").val(loadCity)
    $("#countryInput").val(loadCountry)
    search
}

$(window).on("load", pageLoad)


        //localStorage.setItem("searchItems", cityInput)
    })
}
// Global variables for News API
// var city = $("#cityInput")
// var country = $("#countryInput")
//New News
function searchnytAPI_URL() {
    // var nytAPI_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    // var queryParams = { "api-key": "y9s3gC1Z1CXpiwsQlGQNFC7eAFF0Lbpu" };
    // var cityInput = $("#cityInput").val();
    // var countryInput = $("#countryInput").val();
    // var combinedCityCountry = cityInput.val().trim().concat("%20", countryInp.val().trim(), "%20covid");
    // queryParams.q = combinedCityCountry;
    // console.log("---------------\nURL: " + queryURL + "\n---------------");
    // console.log(nytAPI_URL + $.param(queryParams));
    // return nytAPI_URL + $param(queryParams);
}

function nytAPI() {
    var cityInput = $("#cityInput");
    var countryInput = $("#countryInput");
    var baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var qParams = { "api-key": "y9s3gC1Z1CXpiwsQlGQNFC7eAFF0Lbpu" }
    qParams.q = cityInput.val().trim().concat(" ", countryInput.val().trim(), " covid");
    qParams.begin_date = 20200101;
    qParams.end_date = moment().format('YYYYMMDD')
    console.log(baseUrl + $.param(qParams))
    return baseUrl + $.param(qParams)
}
function updateNewsSection(response) {
    //Declare variables.



    // var combinedCityCountry = cityInput.val().trim().concat("%20", countryInput.val().trim(), "%20covid");
    var numArticles = $("#article-count").val();
    console.log(response);
    //Run function to log API query data and URL, and then create For Loop to create [i] number of paragraph tags to append [i] number of articles to #newsResults div.

    // console.log(newsAPI);
    // console.log(response);

    $("#newsResults").removeClass("hide")
    console.log(numArticles)
    $("#newsResults").empty()
    for (var i = 0; i < numArticles; i++) {
        var currentArticle = response.response.docs[i]
        console.log(currentArticle);
        var articleDiv = $("<div>")
        articleDiv.append($("<h2>").text(currentArticle.headline.main));
        articleDiv.append($("<p>").text("Source: New York Times"));
        articleDiv.append($("<p>").text("Date: " + moment(currentArticle.pub_date).format("MMM Do YYYY")));
        articleDiv.append($("<p>").text("Summary: " + currentArticle.snippet));
        var link = $("<a>").text("Full Article");
        link.attr("href", currentArticle.web_url)
        link.attr("target", "_blank")
        articleDiv.append(link)
        $("#newsResults").append(articleDiv);
    }
}
$("#userInput").on("submit", function (event) {
    event.preventDefault();
    var nytAPI_URL = nytAPI();
    search()
    clearInterval();
    console.log("here")
    $.ajax({
        url: nytAPI_URL,
        method: "GET",
    }).then(updateNewsSection);

});

});

