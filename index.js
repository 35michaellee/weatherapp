
function setIcons(icon, iconID) {

    const skycons = new Skycons({ color: "white" });
    const currenticon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currenticon])

}
function celciustoFaren(num) {
    return Math.floor((num * (9 / 5) + 32));

}
function farentoCels(num) {
    return Math.floor(((num - 32) * (5 / 9)));

}








window.addEventListener('load', () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            whatsTheWeather(lat, long);
        })
    }
    else {
        alert("sorry geolocation isnt available on your browser");
    }
});
    


function whatsTheWeather(lat, long) {
    let apikey = "a3f89196746d620ec5555d806b06fb40";
    let apicall = '';
    let temperatureDesc = document.querySelector(".temperature-description");
    let temperatureDeg = document.querySelector(".temperature-degree");
    let locationtimezone = document.querySelector(".location-timezone");
    let temperaturespan = document.querySelector(".temperature");
    let temperaturedegreetype = document.querySelector(".degreetype");

    let temp=0;
   
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    apicall = `${proxy}https://api.darksky.net/forecast/${apikey}/${lat},${long}`;

    
    console.log(apicall);
    fetch(apicall).then(response => {
        console.log('madeit1');
        return response.json();

    })
        .then(data => {
            
            temp = data.currently.temperature;
          
            const summary = data.currently.summary;
            const timezone = data.timezone;
            const icon = data.currently.icon;//this pulls all the data its shorthand 

            temperatureDeg.textContent = temp;
            temperatureDesc.textContent = summary;
            locationtimezone.textContent = timezone;
            setIcons(icon, document.querySelector(".icon"));

        })

    
    temperaturespan.addEventListener('click', () => {
     
        if (temperaturedegreetype.textContent === "F") {
            temperaturedegreetype.textContent = "C";//easy

            let temp =temperatureDeg.textContent;
            temp = farentoCels(temp);
            temperatureDeg.textContent = temp;
        }
     else if (temperaturedegreetype.textContent === "C") {
            temperaturedegreetype.textContent = "F";

            let temp =temperatureDeg.textContent;
            temp = celciustoFaren(temp);
            temperatureDeg.textContent= temp;        }
    })
}

function is_usZipCode(str) {
            regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;

            if (regexp.test(str)) {
                return true;
            }
            else {
                return false;
            }
        }








$("#submit").click(function (event) {
            let city;
            let state;
            event.preventDefault();
            let clientKey = "As8TbH7FcvfeFPyOGvMBDDwpmmHzC6DNkbnFfq5wtDo1WzERElB1nFPdf9T246w5";//forzipcodeapi
            let searchzip = document.getElementById('zipcode').value;
            if (is_usZipCode(searchzip)) {
                let corsprox = "https://cors-anywhere.herokuapp.com/"
                let fetchurl = `${corsprox}https://www.zipcodeapi.com/rest/${clientKey}/info.json/${searchzip}/degrees`
                if (searchzip == '') {
                    alert("please put a 5 digit zipcode");
                }
                console.log(searchzip);
                console.log(fetchurl);
                console.log("you made the submit work");
                let long;
                let lat;

                fetch(fetchurl)
                    .then((resp) => resp.json())
                    .then(function (data) {
                        long = data.lng;
                        lat = data.lat;
                        city = data.city;
                        state = data.state;
                        console.log("i made it beforethe error ");
                        whatsTheWeather(lat, long);//something happens here 
                        $(".city").removeClass("hidden").html(city);
                        $(".state").removeClass("hidden").html(state);



                    })
                    .catch(function (error) {
                        console.log(JSON.stringify(error));
                    });
            }
            else {
                alert("please enter a valid 5 digit zip code");
            }
        });


