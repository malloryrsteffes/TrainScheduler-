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

  var database = firebase.database();



  $("#submitButton").on("click", function(){

    //prevents the page from refreshing
    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStartTime = moment($("#start-time-input").val().trim(), "HH:mm").format("X"); 
    var trainFrequency = "";
    var trainMinutesAway = "";

    // Saves our variables in a local temporary object 
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      starts: trainStartTime,
      frequency: trainFrequency,
      next: trainMinutesAway
    };


    database.ref().push({newTrain})

    console.log(newTrain.name);

    alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#start-time-input").val("");
  $("#frequency-input").val("");

  })

  database.ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().newTrain.name;
    var trainDestination = childSnapshot.val().newTrain.destination;
    var trainStartTime = childSnapshot.val().newTrain.starts;
    var trainFrequency = childSnapshot.val().newTrain.frequency;

    // In order to get the data for the next train, we have to take the trainStartTime, and somehow
    // add its arrival frequency to it repeatedly until it hits the CURRENT time. The remainder will be how 
    // many minutes are left until it arrives. If we add that remainder to our current time, we
    // can see the next arrival time.

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(""),
      $("<td>").text(""),
    );

    $("tbody").append(newRow);
  })