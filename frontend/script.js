// Function to get the user's current location when the location card is clicked
function getLocation() {
    if (navigator.geolocation) {
        // Update the UI to show that we're fetching the location
        document.getElementById("gps-value").innerHTML = "Fetching location...";
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("gps-value").innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Function to display the position and generate Google Maps link
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display the latitude and longitude in the UI
    document.getElementById("gps-value").innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;

    // Update the link to open Google Maps at the user's location
    const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const gpsLink = document.getElementById("gps-link");
    gpsLink.setAttribute('href', mapsLink);
    gpsLink.style.display = 'block';  // Show the Google Maps link
}

// Function to handle errors
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("gps-value").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("gps-value").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("gps-value").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("gps-value").innerHTML = "An unknown error occurred.";
            break;
    }
}


// Function to fetch heart rate data from Firebase
function fetchHeartRateData() {
    const heartRateRef = firebase.database().ref('path/to/heartRate'); // Replace with your Firebase path

    heartRateRef.on('value', (snapshot) => {
        const heartRate = snapshot.val(); // Get the latest heart rate value

        // Update the UI
        const heartRateElement = document.getElementById('heartRateDisplay'); // Ensure this ID matches your HTML
        heartRateElement.textContent = `Heart Rate: ${heartRate} BPM`;

        // Check for abnormal heart rate (e.g., < 60 or > 100)
        if (heartRate < 60 || heartRate > 100) {
            alert('Abnormal heart rate detected!');
        }
    });
}

let sleeping = false;
let sleepDuration = 0; // in minutes
let sleepCheckInterval; // Interval for tracking sleep duration
let sleepStartTime; // Time when sleep starts

function trackSleep() {
    const heartRate = parseInt(document.getElementById("heart-rate-value").innerText.split(" ")[0]);

    console.log(`Heart Rate: ${heartRate}, Sleeping: ${sleeping}, Sleep Duration: ${sleepDuration} minutes`);

    // Check if the heart rate is below 70 to indicate sleep
    if (heartRate < 70 && !sleeping) {
        sleeping = true;
        sleepStartTime = new Date();
        console.log("Started sleeping...");

        // Start updating sleep duration every minute
        sleepCheckInterval = setInterval(() => {
            sleepDuration += 1; // Increment sleep duration by 1 minute
            const hours = Math.floor(sleepDuration / 60);
            const minutes = sleepDuration % 60;
            document.getElementById("sleep-duration").innerHTML = `Sleep Duration: ${hours} hours ${minutes} minutes`;
            console.log(`Updated sleep duration: ${hours} hours ${minutes} minutes`);
        }, 60000); // Update every minute
    } else if (heartRate >= 70 && sleeping) {
        sleeping = false;
        clearInterval(sleepCheckInterval); // Stop the interval when waking up
        sleepDuration += Math.floor((new Date() - sleepStartTime) / 60000); // Add any remaining sleep time
        sleepStartTime = null;

        // Update UI after sleep ends
        const hours = Math.floor(sleepDuration / 60);
        const minutes = sleepDuration % 60;
        document.getElementById("sleep-duration").innerHTML = `Sleep Duration: ${hours} hours ${minutes} minutes`;
        console.log("Woke up, stopped sleeping...");
    }
}

// Call this function within your main loop or based on heart rate updates
setInterval(trackSleep, 5000); // Check sleep status every 5 seconds



// Function to fetch gas sensor data from Firebase
function fetchGasSensorData() {
    const gasSensorRef = firebase.database().ref('path/to/gasSensor'); // Replace with your Firebase path

    gasSensorRef.on('value', (snapshot) => {
        const gasValue = snapshot.val(); // Get the latest gas sensor value

        // Update the UI
        const gasSensorElement = document.getElementById('gasSensorDisplay'); // Ensure this ID matches your HTML
        gasSensorElement.textContent = gasValue === 1 ? 'No Gas Detected' : 'Gas Leak Detected!';

        // Trigger alert if gas leakage is detected
        if (gasValue === 0) {
            alert('Gas leakage detected! Please check immediately.');
        }
    });
}


// Function to fetch fall detection data from Firebase
function fetchFallDetectionData() {
    const fallDetectionRef = firebase.database().ref('path/to/fallDetection'); // Replace with your Firebase path

    fallDetectionRef.on('value', (snapshot) => {
        const fallValue = snapshot.val(); // Get the latest fall detection value

        // Update the UI
        const fallDetectionElement = document.getElementById('fallDetectionDisplay'); // Ensure this ID matches your HTML
        fallDetectionElement.textContent = fallValue === 1 ? 'Elderly Person Has Fallen!' : 'No Fall Detected';

        // Trigger alert if fall is detected
        if (fallValue === 1) {
            alert('Alert: The elderly person has fallen! Please check immediately.');
        }
    });
}






 