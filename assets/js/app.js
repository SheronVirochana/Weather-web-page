
console.log("js loader")

document.getElementById("cityInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        let city = this.value.trim();

        if (city === "") {
            alert("Please enter a city name");
            return;
        }

        fetch(`http://api.weatherapi.com/v1/current.json?key=0cefa4b38aae4e3595a95844251611&q=${city}`)
            .then(res => res.json())
            // .then(data => console.log(data.location.name)
            .then(data => {
                document.getElementById("city_name").textContent = data.location.name;
                document.getElementById("country").textContent = data.location.country;
                document.getElementById("temp").textContent = data.current.temp_c;
                document.getElementById("ontime").textContent = "Date And Time : " + data.location.localtime;

                document.getElementById("condition-live").textContent = data.current.condition.text;
                const iconUrl = "https:" + data.current.condition.icon;
                document.getElementById("condition").src = iconUrl;

                document.getElementById("windSpeed").textContent = data.current.wind_kph;
                document.getElementById("cloudcover").textContent = data.current.cloud;
                document.getElementById("pressure").textContent = data.current.pressure_mb;
                document.getElementById("humidity").textContent = data.current.humidity;
                document.getElementById("uvindex").textContent = data.current.uv;
                document.getElementById("visibility").textContent = data.current.vis_km;
            })
            .catch(() => {
                alert("City not fond");
            })

    }
});

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log(lat, lon);
}
function error() {
    alert("Unable to retrieve your location");
}
function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`http://api.weatherapi.com/v1/current.json?key=0cefa4b38aae4e3595a95844251611&q=${lat},${lon}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Example:
            document.getElementById("city_name").textContent = data.location.name;
            document.getElementById("temp").textContent = data.current.temp_c + "°C";
            const iconUrl = "https:" + data.current.condition.icon;
            document.getElementById("condition").src = iconUrl
            document.getElementById("country").textContent = data.location.country;
            document.getElementById("ontime").textContent = "Date And Time : " + data.location.localtime;
            document.getElementById("condition-live").textContent = data.current.condition.text;

            document.getElementById("windSpeed").textContent = data.current.wind_kph;
            document.getElementById("cloudcover").textContent = data.current.cloud;
            document.getElementById("pressure").textContent = data.current.pressure_mb;
            document.getElementById("humidity").textContent = data.current.humidity;
            document.getElementById("uvindex").textContent = data.current.uv;
            document.getElementById("visibility").textContent = data.current.vis_km;
        });
}
