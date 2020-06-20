var usersArray = [];
var userAuthInfo;


var username = localStorage.getItem("UserName");
if(!username){
    console.log("No username");
    window.location.replace("auth.html");
}
else{
    console.log("username : " + username);

}

//function loadFirebase(){
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC-F8r9s4iURBpPFX4Q5X7oW1YqJ_3MrKA",
    authDomain: "chatterapp-d5677.firebaseapp.com",
    databaseURL: "https://chatterapp-d5677.firebaseio.com",
    projectId: "chatterapp-d5677",
    storageBucket: "chatterapp-d5677.appspot.com",
    messagingSenderId: "553328259206",
    appId: "1:553328259206:web:5efe134dcfbc7e752ce107"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);  
    const auth = firebase.auth();
//}



function fetchlist(data){
    var incomingList = data.val();
    var listKeys = Object.keys(incomingList);
    console.log("ListKeys = " + listKeys);
    for(var i=0; i<listKeys.length; ++i){
        var k = listKeys[i];
        var actualListItem = incomingList[k];
        console.log('Actual List Item : ' + actualListItem);
        usersArray[i] = actualListItem.username;
    }
    localStorage.setItem('usersArray',usersArray);
    console.log(usersArray);
}


function addUser(){
    //usersArray = localStorage.getItem('usersArray')
    var uFlag = 0;
    var newUser = prompt("Enter Username to add:");
    for( var i=0; i<usersArray.length; ++i){
        if(usersArray[i] != newUser){
        }
        else if(usersArray[i] == newUser){
            uFlag = 1;
            break;
        }
    }
    if(uFlag == 1){
        localStorage.setItem("to", newUser);
        window.location.href = "chat.html";
    }
    else{
        alert(newUser + " does not exist!");
    }
    
}

var Tocheck = [];
var database = firebase.database();
var messages = database.ref('chatApp/messages');
var list = database.ref('chatApp/userList');

list.on('value', fetchlist, errData);
messages.on('value', fetchMessage, errData);




var actualData;
var flagNewData = 0;
function fetchMessage(data){

    var incomingData = data.val();
    var dataKeys = Object.keys(incomingData);
    console.log("DataKeys = " + dataKeys);

    Tocheck = [];
    document.getElementById('peopleWrapper').innerHTML = "";


    for(var i=dataKeys.length - 1; i>=0; --i){
        var k = dataKeys[i];
        actualData = incomingData[k];
        // Foriegn users last message
        if(actualData.To === username){
            if(Tochecker(actualData.username) != 1){
                Tocheck.push(actualData.username);
                console.log(Tocheck);
                printer(actualData.username);
            }
        }
        //local users last message
        else if(actualData.username === username){
            if(Tochecker(actualData.To) != 1){
                Tocheck.push(actualData.To);
                console.log(actualData.To);
                console.log(Tocheck);
                printer(actualData.To);
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

function printer(userToPrint){

    
    console.log(actualData.username + " Printing Data : " + actualData.data);
    //clip till 28 chars

    var data = userToPrint;

    var peopleWrap = document.getElementById('peopleWrapper');

    var person = document.createElement('div');
    person.id = person.className = "person";
    person.id = userToPrint;
    person.onclick = function(){
        localStorage.setItem("to",person.id);
        console.log("localstorer change tousername = " + localStorage.getItem("to"));
        window.location.href = "chat.html";
    };



    
    var persWrap = document.createElement('div');
    persWrap.id = persWrap.className = "personWrapper";


    var dp = document.createElement('div');
    dp.id = dp.className = "dp";
    //data = userToPrint;
    data = data.slice(0,1).toUpperCase()
    dp.innerHTML = data;

    var userData = document.createElement('div');
    userData.id = userData.className = "userData";

    var tousername = document.createElement('div');
    tousername.id = tousername.className = "username";
    tousername.innerHTML = userToPrint;

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

    //person.appendChild(valUser);
    person.appendChild(persWrap);

    peopleWrap.appendChild(person);


}





function errData(){
    console.log('Error in Fetching Users List!!');
}

function show()
{
    console.log("Username : " + localStorage.getItem("UserName") + "\nTo : " + localStorage.getItem("to"));
}


//============= Auth Stuff ===============
/*function authUser(){
        // Your web app's Firebase configuration
        console.log("auhinnnnn")
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
    userAuthInfo = localStorage.getItem('userAuthInfo');
    firebase.auth().onAuthStateChanged(function(user) {
        console.log(user);
        if (userAuthInfo.uid === user.uid) {
        // User is signed in.
        var email = user.email;
        var userID = user.uid;
            console.log("EMAIL : " + email);
            //getUserName(email);

            //console.log("Returning Username " + username);
            //localStorage.setItem('UserName',username);
            //localStorage.setItem('userID', userID);

            //window.location.href = "people.html";
            //loadFirebase();
        } else {
        // User is signed out.
        // ...
        console.log("User signed out :(");
        }
    });
}

function getUserName(email){
    appendUserList.on('value', function(uData){
        var incomingList = uData.val();
        var listKeys = Object.keys(incomingList);
        console.log("ListKeys = " + listKeys);
        for(var i=0; i<listKeys.length; ++i){
            var k = listKeys[i];
            var actualListItem = incomingList[k];
            console.log('Actual List Item : ' + actualListItem);
            if(actualListItem.email == email){
                username = localStorage.getItem("UserName");
                console.log("Returning Username " + actualListItem.username);
                //window.location.href = "people.html"
                break;
            }
        }
      },errData());
}
*/