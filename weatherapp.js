// JavaScript source code
window.addEventListener('load', () => {
    let long;
    let lat;
    let tD = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let timezone = document.querySelector(".location");
    let myCord = document.querySelector(".myCord");
    let myCord2 = document.querySelector(".myCord2");

    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/af3aadebca65e3a4cb2739996c2f9153/${lat},${long}`;

            fetch(api)
                .then(data => {
                    return data.json();
                })
                .then(realdata => {
                    console.log(realdata);
                    const { temperature, summary,icon } = realdata.currently;
                    temperatureDegree.textContent = temperature;
                    tD.textContent = summary;
                    timezone.textContent = realdata.timezone;
                    myCord.textContent = realdata.latitude;
                    myCord2.textContent = realdata.longitude;
                    setImage(icon, document.querySelector(".ic"));

                   
                });
        });

    }

    function setImage(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentCon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentCon]);
    }
    
});