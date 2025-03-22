document.getElementById('btn').addEventListener('click', function () {
    let username = document.getElementById('username').value.trim();

    if (username) {
        getUser(username);
    } else {
        document.getElementById('error-message').innerText = "Please enter a username.";
       
    }
});

function getUser(username) {
    const requestUrl = `https://codechef-api.vercel.app/handle/${username}`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', requestUrl, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                if (data.success === true) {

                    // Updating UI
                    document.getElementById('avatar').src = data.profile || "";
                    document.getElementById('country').src = data.countryFlag || "";
                    document.getElementById('name').innerText = data.name || "N/A";
                    document.getElementById('rating').innerText = data.currentRating || "N/A";
                    document.getElementById('stars').innerText = data.stars || "N/A";
                    document.getElementById('countryRank').innerText = data.countryRank || "N/A";
                    document.getElementById('globalRank').innerText = data.globalRank || "N/A";

                    // Clear error message
                    document.getElementById('error-message').innerText = "";
                } else if (data.success === false && data.status === 404) {
                    console.error("User not found!");
                    document.getElementById('error-message').innerText = "User not found or an error occurred!";
                    

                    // Clear previous data properly
                    document.getElementById('avatar').src = "";
                    document.getElementById('country').src = "";
                    document.getElementById('name').innerText = "";
                    document.getElementById('rating').innerText = "";
                    document.getElementById('stars').innerText = "";
                    document.getElementById('countryRank').innerText = "";
                    document.getElementById('globalRank').innerText = "";
                } else {
                    console.error("Something went wrong!");
                    document.getElementById('error-message').innerText = "An error occurred! Please try again later.";
                    
                }
                //         console.log("XHR status:", xhr.status);
                // console.log("XHR response:", xhr.responseText);
            }
        }
    };

    xhr.send();
}



//gfg api
//https://geeks-for-geeks-api.vercel.app/${username}
