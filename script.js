const resultDiv = document.querySelector("#result");  
const resultLink = resultDiv.querySelector("a");
const resultP = resultDiv.querySelector("p");
const spinner = resultDiv.querySelector(".loader");

const displayLink = (url) => {
  resultLink.style.display = "block";
  resultP.style.display = "none";
  resultP.style.display = "#666";

  resultLink.href = `https://${url}`;
  resultLink.textContent = url;
}

const displayError = (error) => {
  resultLink.style.display = "none";
  resultP.style.display = "block";
  
  resultP.textContent = error.message;
  resultP.style.color = "red";
  resultLink.textContent = "";
  resultLink.href = "";
}

const toggleLoading = (isLoading) => {
  if (isLoading) {
    spinner.style.display = "block";
    resultLink.style.display = "none";
    resultP.style.display = "none";
  }
  else {
    spinner.style.display = "none";
  }
}

const shortenForm = document.querySelector("#shortenForm");
shortenForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  toggleLoading(true);

  const shortenField = shortenForm.querySelector("input");

  try {
    // Send the POST request
    const response = await fetch("https://nan0.azurewebsites.net/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shortenField.value),
    });

    // Parse the response
    if (!response.ok) {
      var json = await response.json();
      console.log(json);
      throw new Error(`Error: ${json.message} Detail: ${json.detail}`);
    }

    const shortenedUrl = await response.text();
    displayLink(shortenedUrl);
  } 
  catch (error) {
    displayError(error);
  }
  finally {
    toggleLoading(false);
  }
});


const ogShortForm = document.querySelector("#ogShortForm");
ogShortForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  toggleLoading(true);

  const field = ogShortForm.querySelector("input");

  try {
    // Send the POST request
    const response = await fetch(`https://nan0.azurewebsites.net/get/${field.value}`, {
      method: "GET"
    });

    // Parse the response
    if (!response.ok) {
      var json = await response.json();
      console.log(json);
      throw new Error(`Error: ${json.message} Detail: ${json.detail}`);
    }

    const obj = await response.json();
    displayLink(obj.original);
  } 
  catch (error) {
    displayError(error);
  }
  finally {
    toggleLoading(false);
  }
});

const customForm = document.querySelector("#customShorten");
customForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  toggleLoading(true);

  const originalField = customForm.querySelector("#original");
  const shortCodeField = customForm.querySelector("#shortUrl");

  try {
    // Send the POST request
    const response = await fetch("https://nan0.azurewebsites.net/custom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        original: originalField.value,
        shortCode: shortCodeField.value,
      }),
    });

    // Parse the response
    if (!response.ok) {
      var json = await response.json();
      console.log(json);
      throw new Error(`Error: ${json.message} Detail: ${json.detail}`);
    }

    const url = await response.text();
    displayLink(url);

  } 
  catch (error) {
    displayError(error);
  }
  finally {
    toggleLoading(false);
  }
});