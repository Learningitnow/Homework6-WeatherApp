//this is my api key
const apiKey = "47b2c892ef2b99a5672ea5ba54c441c2";

// Function to get weather
const getWeatherInfo = function(citynames){
    
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citynames + "&units=metric" + "&appid=" + apiKey

    // Getting information from API
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){
        
        console.log(response)


        // Displaying received info
        $("#currentDate").text(moment((response.timezone+response.dt+14400)*1000).format('MMMM Do YYYY, h:mm:ss a'));
        //it is a bit of a heck to have time and time zone add on together to covert to the time we use.
        $("#city").text(response.name);
        $("#desc").text("Today is:  " +  response.weather[0].description);
        $("#temp").text("Temperature: " + Math.round(response.main.temp) + "°C");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " km/h");    
        $("#currentIcon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
    })
}




//function for getting 5 days of forecast weather.
const get5days = function(citynames){
    let queryUrl2 = "http://api.openweathermap.org/data/2.5/forecast?q=" +  citynames + "&units=metric" + "&appid=" + apiKey

    // Getting information from API
    $.ajax({
        url: queryUrl2,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
        //showing the 5 day forecast in text
        $("#5dayforecast").text("5 DAY FORECAST")

        //showing the time 
        $("#date1").text(response.list[5].dt_txt);
        $("#date2").text(response.list[13].dt_txt);
        $("#date3").text(response.list[21].dt_txt);
        $("#date4").text(response.list[29].dt_txt);
        $("#date5").text(response.list[37].dt_txt);
        
        //getting back data and showing in the html
        $("#temp-day1").text("Temperature: " + Math.round(response.list[1].main.temp) + "°C");
        $("#temp-day2").text("Temperature: " + Math.round(response.list[2].main.temp) + "°C");
        $("#temp-day3").text("Temperature: " + Math.round(response.list[3].main.temp) + "°C");
        $("#temp-day4").text("Temperature: " + Math.round(response.list[4].main.temp) + "°C");
        $("#temp-day5").text("Temperature: " + Math.round(response.list[5].main.temp) + "°C");

        $("#img1").attr("src", "http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + "@2x.png");
        $("#img2").attr("src", "http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png");
        $("#img3").attr("src", "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png");
        $("#img4").attr("src", "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png");
        $("#img5").attr("src", "http://openweathermap.org/img/wn/" + response.list[5].weather[0].icon + "@2x.png");

        $("#humidity-day1").text("Humidity: " + response.list[1].main.humidity + "%");
        $("#humidity-day2").text("Humidity: " + response.list[2].main.humidity + "%");
        $("#humidity-day3").text("Humidity: " + response.list[3].main.humidity + "%");
        $("#humidity-day4").text("Humidity: " + response.list[4].main.humidity + "%");
        $("#humidity-day5").text("Humidity: " + response.list[5].main.humidity + "%");
        
    })
}

//this setting the citylist be in a empty array, so we can search city in side of side emty array.
let citylist = localStorage.getItem("citylist")?JSON.parse( localStorage.getItem("citylist") ) : []


//when button clicks these are the things needs to be done.
$(".button").click(function(){
    console.log("button was click");
    var inputcity = $(".inputValue").val();
    getWeatherInfo(inputcity);
    get5days(inputcity);
    //set local storage
    // localStorage.setItem("city",inputValue);
    //here is to push city inside of the array, so we call see the searched city history
    citylist.push( inputcity );
    localStorage.setItem( "citylist", JSON.stringify( citylist ) );
    showcity();

})



//this is part is let searched city showing under the search bar
function showcity(){
    document.querySelector('#cityList').innerHTML = ''
    for( let i=0; i<citylist.length; i++ ){
        const city = citylist[i]
        document.querySelector('#cityList').innerHTML += `<button onClick="showWeather('${city}')">${city}</button>`
     }
}
showcity(); 


// this is let the searched city can be called again if i click it on it.
function showWeather(city){
    getWeatherInfo(city);
    get5days(city);
}
getWeatherInfo();


//this is to clear all the seached city in local storage.
$("#clearbutton").click(function(){
    localStorage.clear();
})