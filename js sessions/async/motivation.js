const API_KEY = "J2h352Y5znGBYMlUtMdjOwvB0ND3zoxKXjx75IOj";

function getQuotes() {
  let url = "https://api.api-ninjas.com/v1/quotes";

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve({
          data: JSON.parse(request.responseText),
          message: "SUCCESS",
        });
      } else if (request.readyState === 4) {
        reject({
          data: null,
          message: "Failed",
        });
      }
    });

    request.open("GET", url);

    // ✅ IMPORTANT — Add Header Here
    request.setRequestHeader("X-Api-Key", API_KEY);

    request.send();
  });
}

async function motivation() {
  try {
    const response = await getQuotes();
    console.log(response.data[0].quote); // Print quotes
    console.log(response.data[0].author); // Print quotes
  } catch (err) {
    console.log(err);
  }
}

motivation();
