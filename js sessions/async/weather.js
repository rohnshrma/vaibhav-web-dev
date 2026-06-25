function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6176d074d272ffb7969552b9f68b0a31&units=metric`;
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve({
          data: JSON.parse(request.responseText),
          message: "SUCCESS",
        });
      } else if (request.readyState === 4 && request.status !== 200) {
        reject({
          data: null,
          message: "Failed",
        });
      }
    });
    request.open("GET", url);
    request.send();
  });
}

// getWeather("gurgaon")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
// getWeather("lucknow")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
// getWeather("varanasi")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

async function handleResponse(city) {
  try {
    const response = await getWeather(city);

    console.log(
      `====${response.data.name}====\nTemperture : ${response.data.main.temp}\nFeels Like : ${response.data.main.feels_like}\nDescription : ${response.data.weather[0].description}`
    );
    // console.log(response.data.main.temp);
    // console.log(response.data.main.feels_like);
    // console.log(response.data.weather[0].description);
    // console.log(response.data.name);
  } catch (err) {
    console.log(err);
  }
}

handleResponse("gurgaon");
handleResponse("lucknow");
handleResponse("varanasi");
