// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBc2S38yf8hniYOBsKI0hnf7kzsv-ERNKQ",
    authDomain: "traintimes-25ecb.firebaseapp.com",
    databaseURL: "https://traintimes-25ecb.firebaseio.com",
    projectId: "traintimes-25ecb",
    storageBucket: "",
    messagingSenderId: "1023855420",
    appId: "1:1023855420:web:fa190c8dcf6587a07eec39"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database;

  var name = "";
  var destination = "";
  var startTime = "";
  var frequency = "";
  var minutesAway = "";

  $("#submitButton").on("click", function(){

    //prevents the page from refreshing
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    startTime = moment($("start-time-input").val().trim(), "MM/DD/YYYY").format("X"); //Needs to be in the corrected format
    // Need to define frequency and minutesAway variables
    
    console.log(name, destination, startTime, frequency, minutesAway);

    database.ref().push({
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency,
        minutesAway: minutesAway
    })

  })

  database.ref().on("child_added", function(snap){
      var newTrain = snap.val();

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.startTime);
      console.log(newTrain.frequency);
      console.log(newTrain.minutesAway);


  })