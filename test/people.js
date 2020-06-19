var usersArray = [];

    // Your web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyA-pe3RvKdYeU_dgat5mUYZwutAvVdPCgk",
    authDomain: "testingfirebase-e23c9.firebaseapp.com",
    databaseURL: "https://testingfirebase-e23c9.firebaseio.com",
    projectId: "testingfirebase-e23c9",
    storageBucket: "testingfirebase-e23c9.appspot.com",
    messagingSenderId: "257168791245",
    appId: "1:257168791245:web:203a152f146d2d19343b84"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);   
    const auth = firebase.auth();


function addUser(){
    //usersArray = localStorage.getItem('usersArray')
    var newUser = prompt("Enter Username to add:");
    usersArray.append(newUser)
    localStorage.setItem('usersArray', usersArray);
}

var Tocheck = [];
var username = localStorage.getItem('UserName');
var database = firebase.database();
//var list = database.ref('chatApp/userList');
var messages = database.ref('chatApp/messages');


//list.on('value', fetchlist, errData);
messages.on('value', fetchMessage, errData);


function fetchlist(data){
    var incomingList = data.val();
    var listKeys = Object.keys(incomingList);
    console.log("ListKeys = " + listKeys);
    for(var i=0; i<listKeys.length; ++i){
        var k = listKeys[i];
        var actualListItem = incomingList[k];
        console.log('Actual List Item : ' + actualListItem);
        usersArray[i] = actualListItem;
    }
    localStorage.setItem('usersArray',usersArray);
    console.log(usersArray);
}

var actualData;
var flagNewData = 0;
function fetchMessage(data){
    var incomingData = data.val();
    var dataKeys = Object.keys(incomingData);
    console.log("DataKeys = " + dataKeys);

    for(var i=dataKeys.length - 1; i>=0; --i){
        var k = dataKeys[i];
        actualData = incomingData[k];
        if(actualData.To === username){

            if(Tochecker(actualData.username) != 1){
                Tocheck.push(actualData.username);
                console.log(Tocheck);
                printer();
            }

            
        }
    }

}

function Tochecker(user){
    for( var i=0; i<Tocheck.length; ++i){
        console.log("=============Checker==============");
        if(Tocheck[i] === user){
            return 1;
        }
    }
}

function printer(){
    console.log(actualData.username + " Printing Data : " + actualData.data);
    //clip till 28 chars

    var data;

    var peopleWrap = document.getElementById('peopleWrapper');

    var person = document.createElement('div');
    person.id = person.className = "person";
    person.id = actualData.username;
    person.onclick = function(){
        localStorage.setItem("to",person.id);
        console.log("localstorer " + localStorage.getItem("to"));
        window.location.href = "google.com";
    };

    var valUser = document.createElement('input');
    valUser.type = "text";
    valUser.className = valUser.id = "valUser";
    valUser.value = actualData.username;
    console.log("valuser------" + valUser.value);
    valUser.style.display = "none";
    console.log(valUser.value);

    
    var persWrap = document.createElement('div');
    persWrap.id = persWrap.className = "personWrapper";


    var dp = document.createElement('div');
    dp.id = dp.className = "dp";
    data = actualData.username;
    data = data.slice(0,1).toUpperCase()
    dp.innerHTML = data;

    var userData = document.createElement('div');
    userData.id = userData.className = "userData";

    var tousername = document.createElement('div');
    tousername.id = tousername.className = "username";
    tousername.innerHTML = actualData.username;

    var lastMs = document.createElement('div');
    lastMs.id = lastMs.className = "lastMs";
    data = actualData.data;
        if(data > 28){
            lastMs.innerHTML = data.slice(0,28);
        }
        else{
            lastMs.innerHTML = data;
        }
    
    userData.appendChild(tousername);
    userData.appendChild(lastMs);

    persWrap.appendChild(dp);
    persWrap.appendChild(userData);

    person.appendChild(valUser);
    person.appendChild(persWrap);

    peopleWrap.appendChild(person);

    console.log(document.getElementById('valUser').value);
}

//window.setInterval(function(){
    /// call your function here
    //Tocheck = [];
    //document.getElementById('peopleWrapper').innerHTML = "";
    //messages.on('value', fetchMessage, errData);
    
  //}, 5000);



function errData(){
    console.log('Error in Fetching Users List!!');
}