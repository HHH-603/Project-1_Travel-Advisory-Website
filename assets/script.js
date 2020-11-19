function search() {

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
        //$("#advisoryResults").append(found.name)     name included in message
        $("#advisoryResults").append(found.advisory.message)


        console.log(countryInput)

        //Covid 19 UN statistics API
        var queryURL = "https://disease.sh/v3/covid-19/countries/" + countryInput + "?yesterday=true&twoDaysAgo=false&strict=false&allowNull=true";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
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

    })
}



// Global variables for News API

// var city = $("#cityInput")

// var country = $("#countryInput")



//News
function searchNewsAPI() {
    console.log("Hola");

    //Declare variables.
    var cityInput = $("#cityInput");
    var countryInput = $("#countryInput");
    var combinedCityCountry = cityInput.val().trim().concat("%20", countryInput.val().trim(), "%20covid");
    var newsAPI = "https://newsapi.org/v2/everything?q=" + combinedCityCountry + "&from=2020-11-18&sortBy=publishedAt&apiKey=98fd7faf9093410f8ecd11562a55f1ed";
    var numArticles = $("#article-count").val();

    //Call AJAX to run our News API call.
    $.ajax({
        url: newsAPI,
        method: "GET"
    })

        //Run function to log API query data and URL, and then create For Loop to create [i] number of paragraph tags to append [i] number of articles to #newsResults div.
        .then(function (response) {
            console.log(newsAPI);
            console.log(response);
            $("#newsResults").removeClass("hide")
            console.log(numArticles)
            $("#newsResults").empty()
            for (var i = 0; i < numArticles; i++) {
                var currentArticle = response.articles[i]
                console.log(currentArticle);
                var articleDiv = $("<div>")
                articleDiv.append($("<h3>").text(currentArticle.title));
                articleDiv.append($("<p>").text("Source: "+currentArticle.source.name));
                articleDiv.append($("<p>").text("Date: "+currentArticle.publishedAt));
                var link = $("<a>").text("Full Article");
                link.attr("href", currentArticle.url)
                link.attr("target", "_blank")
                articleDiv.append(link)
                $("#newsResults").append(articleDiv);
            }
        })

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function logNewsAPIQuery() {
//     var combinedCityCountry = city.val().trim().concat("%20", country.val().trim(), "%20covid");
//     return "http://newsapi.org/v2/everything?q=" + combinedCityCountry + "&from=2020-11-18&sortBy=publishedAt&apiKey=98fd7faf9093410f8ecd11562a55f1ed";
//     console.log(response)

// }

// function updateNewsSection(response) {
//     console.log("made it")
//     console.log(response);
//     // console.log("News API Query: " + combinedCityCountry);


//     var numArticles = 5;


//     for (var i = 0; i < numArticles; i++) {
//         var article = response.articles[i];

//         var title = response.articles.title;

//         var articleCount = i + 1;

//         var $articleList = $("<ul>");
//         $articleList.addClass("list-group");

//         $("#newsResults").append($articleList);

//         var $articleListItem = $("<li class='list-group-item articlesTitle'>")

//         var description = response.articles.description;

//         var articleURL = response.articles.url;

//         var publishedDate = response.articles.publishedAt;

//         $.ajax({
//             url: newsAPI,
//             method: "GET",
//         }).then(function (response) {

//             if (title) {
//                 console.log(title);
//                 $articleListItem.append("<span>" + articleCount + "</span>" + "<h2>" + title + "</h2>");
//             }

//             if (publishedDate) {
//                 console.log(publishedDate);
//                 $articleListItem.append("<h5>" + publishedDate + "<h5>");
//             }

//             if (description) {
//                 console.log(description);
//                 $articleListItem.append("<h5" + description + "<h5>");
//             }

//             if (articleURL) {
//                 console.log(articleURL);
//                 $articleListItem.append("<h5>" + articleURL + "<h5>");
//             }
//         }
//     })

// }

//Click Handlers for News API
$("#userInput").on("submit", function (event) {
    event.preventDefault();
    search()
    clearInterval();
    console.log("here")

    var newsAPI = searchNewsAPI();

    // $.ajax({
    //     url: newsAPI,
    //     method: "GET",
    // }).then(searchNewsAPI);
});

// $("#checkCity").on("click", search);
//$(cityInput).empty()
//$(countryInput).empty()
//$("#advisoryResults").empty()
//$("#covidResults").empty()
//$("#newsResults").empty()