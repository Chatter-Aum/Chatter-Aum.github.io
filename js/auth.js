var emailList = [];


    // Your web app's Firebase configuration
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
var database = firebase.database();
var appendUserList = database.ref('chatApp/userList');
//getUserName();
//appendUserList.push({username: "test", email:"test11@tes.com"})

function logIN(){

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    localStorage.setItem("UserName",username);
        auth.signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Log In error : " + errorMessage);
            document.getElementById('errorHTML').innerHTML = "Wrong Credentials!!!";
            // ...
        });
        
    }

var username;

function signUP(){
    //var colorList = ["#e67e22","#e74c3c","#1abc9c","#8e44ad","#f1c40f","#e84393"];
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    username = document.getElementById('username').value;
    //if(!userAlrdy(username)){
        localStorage.setItem('UserName', username);
        console.log(username);
        auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Sign Up In error : " + errorMessage);
            // ...
        });
        //localStorage.setItem("userColor", Math.floor(Math.random() * (colorList.length-1)));
        //appendUserList.push({username: username, email: email});
        return 0;
    //}
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var email = user.email;
      var userID = user.uid;
      var userAuthInfo = user;
        console.log("EMAIL : " + email)
        /*emailList.forEach(function(item,index) {
            if(item.email == email){
                localStorage.setItem('UserName', item.username);
                console.log("Returning Username " + item.username);
                //window.location.href = "people.html"
                //break;
                }
                console.log(item.username) 
        });*/
        appendUserList.push({username: username, email: email});
        localStorage.setItem("userAuthInfo", userAuthInfo);
        window.location.href = "people.html";
        //document.getElementById('welcomeButtons').innerHTML = "Loading....";
        //setTimeout(function(){ window.location.href = "people.html"; }, 5000);
    } else {
      // User is signed out.
      // ...
      console.log("User signed out :(");
    }
});

function errData(){
    console.log("Error getting username");
}

function getUserName(){
    console.log("getUserName");
    appendUserList.on('value', function(uData){
        var incomingList = uData.val();
        var listKeys = Object.keys(incomingList);
        console.log("ListKeys = " + listKeys);
        for(var i=0; i<listKeys.length; ++i){
            var k = listKeys[i];
            var actualListItem = incomingList[k];
            console.log('Actual List Item : ' + actualListItem);
            emailList.push(actualListItem);
            console.log(emailList);
        }
      },errData());
}

/*function userAlrdy(userNM){
    console.log("userAlrdy");
    appendUserList.once('value', function(uData){
        var incomingList = uData.val();
        var listKeys = Object.keys(incomingList);
        console.log("ListKeys = " + listKeys);
        for(var i=0; i<listKeys.length; ++i){
            var k = listKeys[i];
            var actualListItem = incomingList[k];
            console.log('Actual List Item : ' + actualListItem);
            if((actualListItem.username == userNM)){
                document.getElementById('errorHTML').innerHTML = "Username/Email already exist";
                //window.location.href = "people.html"
                return true;
            }
        }
        return false;
      },errData());
}
*/