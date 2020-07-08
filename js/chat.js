var auth;

function loadFirebase() {
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
    auth = firebase.auth(); 
    getData();
}

var database, username, userID, toUser, userFlag;




function getData() {

    database = firebase.database();
    userAssign();
    user = database.ref('chatApp/messages');
    user.on('value', fetchData, errData);
}


function sendTo(){
    var inp = document.getElementById('inputData').value;
    if(inp != ""){
        user.push({username : username, data : inp, userID : userID, To: localStorage.getItem('to'), seen: false});
    }
    document.getElementById('inputData').value = "";
}

function userAssign(){
    if(!localStorage.getItem("UserName")){
        console.log("No username");
        window.location.replace("auth.html");
    }
    else{
        
        username = localStorage.getItem('UserName');
        console.log("userAssign() username: " + username);
        toUser = localStorage.getItem('to');
        console.log("userAssign() toUser: " + toUser)
    }
    //localStorage.removeItem('UserName');
    userID = localStorage.getItem('userID');
    //console.log(username + " : " + userID);
    //

}
    

var flag=0, seenFlag = 0;
function fetchData(data){

    var incomingData = data.val();
    console.log(incomingData);
    var dataKeys = Object.keys(incomingData);
    console.log("Keys : " + dataKeys);

    // Fetching all previous messages
    if(flag == 0){
        for(var i=0; i<dataKeys.length; ++i){
            var k = dataKeys[i];
            var actualData = incomingData[k];
            
            // Fetching Sent messages
                if((actualData.username === username)&&(actualData.To === toUser)){
                    console.log("Local User : " + actualData.username);
                    console.log("Data : "+ actualData.data);
                    printer(actualData, 'messageSent');
                }
            // Fetching Recieved Messages
                else if((actualData.username === toUser)&&(actualData.To === username)){
                    console.log("Foreign User : " + actualData.username);
                    console.log("Data : "+ actualData.data);
                    printer(actualData, 'messageRecieve');
                }

        }
        flag = 1;
    }

    // fetching all new messages
    else{

            var k = dataKeys[dataKeys.length -1]
            var actualData = incomingData[k];

            // Fetching Sent messages
            if((actualData.username === username)&&(actualData.To === toUser)){
                console.log("Local User : " + actualData.username);
                console.log("Data : "+ actualData.data);
                
                printer(actualData, 'messageSent');
                
            }
            // Fetching Recieved Messages
            else if((actualData.username === toUser)&&(actualData.To === username)){
                play();
                console.log("Foreign User : " + actualData.username);
                console.log("Data : "+ actualData.data);
                printer(actualData, 'messageRecieve');
                
            }


    }
}

function errData(){
    console.log("Error in loading Data from Firebase!");
}

function printer(dataVals,elm){
    var messageWrapper = document.getElementById('messageWrapper');
    var messageX = document.createElement('div');
    messageX.id = messageX.className = elm;
    messageX.className += " messageRecSend";


    var newText = document.createElement("div");

    newText.id = "textData";
    newText.className = "textData";





    var sName = document.createElement('span');
    sName.className = 'sName';
    sName.id = 'sName';
    
    sName.innerHTML = dataVals.username;
    
    newText.appendChild(sName);
    



    var textM = document.createElement('span');
    textM.id = textM.className = 'textMessage';

    textM.innerHTML = dataVals.data;
    
    newText.appendChild(textM);
    
    messageX.appendChild(newText);
    messageWrapper.appendChild(messageX);
}

// =========Play Sound on new message =======

function play() {
    var audio = new Audio('https://docs.google.com/uc?export=download&id=1y2H3YwB41pn9TQ3Gri-PZm4L33lT_Y2S');
    audio.play();
  }

/*if((actualData.seen == false) && (seenFlag === 0)){
    var seenVar = database.ref('chatApp/messages/' + k);
    seenVar.set({username : actualData.username, data : actualData.data, userID : actualData.userID, To: "aumb", seen: true});
    console.log("seen : " + seenVar);
    seenFlag = 1;
} */