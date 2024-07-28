window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script2 = function()
{
  /*####################################*/
player.SetVar("Client", "Sabic");
/*####################################*/

var firebaseConfig = {
  apiKey: "AIzaSyBHHFTre1L76I9mtXCoaQZr-Y2U2qVjDRg",
  authDomain: "scanme10.firebaseapp.com",
  projectId: "scanme10",
  storageBucket: "scanme10.appspot.com",
  messagingSenderId: "417477205176",
  appId: "1:417477205176:web:081113d63a4107bc2be84d"
};

var parentWindow = window.parent;

var script1 = document.createElement('script');
var script2 = document.createElement('script');
var script3 = document.createElement('script');

script1.src = 'https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js';
script2.src = 'https://www.gstatic.com/firebasejs/8.2.7/firebase-database.js';
script3.src = 'https://www.gstatic.com/firebasejs/8.2.7/firebase-auth.js';

parentWindow.document.head.appendChild(script1);
parentWindow.document.head.appendChild(script2);
parentWindow.document.head.appendChild(script3);


function firebasedefine() {
    firebase.initializeApp(firebaseConfig);
    var player = GetPlayer();
    var Client = player.GetVar("Client");
    var mainBranchRef = firebase.database().ref(Client);

    mainBranchRef.once('value', function(snapshot) {
        if(!snapshot.exists()) {
            firebase.database().ref(Client + '/').set({
                Phase: 1,
            });
}
})
}

setTimeout(firebasedefine, 2000);

function getphase() {
    var player = GetPlayer();
    var Phase;
    var Client = player.GetVar("Client")
    firebase.database().ref(Client + '/').once("value", function(snapshot) {
        Phase = snapshot.val().Phase;
        player.SetVar("Phase", Phase);
    })
}
setTimeout(getphase, 3000);
}

window.Script3 = function()
{
  var player = GetPlayer();
var Phase;
var Name;
var Username;
var Password;

Name = player.GetVar("Name");
Username = player.GetVar("Username").toLowerCase();
Password = player.GetVar("Password");
var Client = player.GetVar("Client");
var Q = player.GetVar("Q");
var A = player.GetVar("A");

// Check for invalid characters in Username
var invalidChars = /[.#$[\]]/;
if (invalidChars.test(Username)) {
    player.SetVar("Message", "Username should be text and numbers only");
    setTimeout(function() {
    player.SetVar("Message", " ");
    }, 3000);
    setTimeout(function() {
        player.SetVar("Message", " ");
    }, 3000);
} else {
    firebase.database().ref(Client + '/' + Username).once("value", function(snapshot) {
        if (snapshot.exists()) {
            let dbUsername = snapshot.val().Username;
            if (dbUsername == Username) {
                player.SetVar("Message", "Username is already used by another account");
                setTimeout(function() {
                    player.SetVar("Message", " ");
                }, 3000);
            }
        } else {
            const database = firebase.database();
            const rootRef = database.ref(Client + '/');
            rootRef.child(Username).set({
                Name: Name,
                Username: Username,
                Password: Password,
            }).then(() => {
                // Uncommented section to add questions and initialize other variables
                rootRef.child(Username + "/Question").set({
                    // Assuming initial score is 0
                    Score: 0,
                });
                // Set additional variables if needed
                player.SetVar("Go", "True");
                firebase.database().ref(Client + "/" + Username + "/Old").child(Username).set(Username);
            });
        }
    });
}
}

window.Script4 = function()
{
  var player = GetPlayer();
var Phase;
var Name;
var Username;
var Password;

Name = player.GetVar("Name");
Username = player.GetVar("Username").toLowerCase();
Password = player.GetVar("Password");
var Client = player.GetVar("Client");
var Q = player.GetVar("Q");
var A = player.GetVar("A");

// Check for invalid characters in Username
var invalidChars = /[.#$[\]]/;
if (invalidChars.test(Username)) {
    player.SetVar("Message", "Username should be text and numbers only");
    setTimeout(function() {
    player.SetVar("Message", " ");
    }, 3000);
    setTimeout(function() {
        player.SetVar("Message", " ");
    }, 3000);
} else {
    firebase.database().ref(Client + '/' + Username).once("value", function(snapshot) {
        if (snapshot.exists()) {
            let dbUsername = snapshot.val().Username;
            if (dbUsername == Username) {
                player.SetVar("Message", "Username is already used by another account");
                setTimeout(function() {
                    player.SetVar("Message", " ");
                }, 3000);
            }
        } else {
            const database = firebase.database();
            const rootRef = database.ref(Client + '/');
            rootRef.child(Username).set({
                Name: Name,
                Username: Username,
                Password: Password,
            }).then(() => {
                // Uncommented section to add questions and initialize other variables
                rootRef.child(Username + "/Question").set({
                    // Assuming initial score is 0
                    Score: 0,
                });
                // Set additional variables if needed
                player.SetVar("Go", "True");
                firebase.database().ref(Client + "/" + Username + "/Old").child(Username).set(Username);
            });
        }
    });
}
}

window.Script5 = function()
{
  var player = GetPlayer();
var Phase;
var CurrentQuestion = player.GetVar("CurrentQuestion");
var Par_Username = player.GetVar("Par_Username");
var Client = player.GetVar("Client");

firebase.database().ref(Client + '/').once("value", function(snapshot) {
    Phase = snapshot.val().Phase;
    player.SetVar("Phase", Phase);
})

firebase.database().ref(Client + "/" + Par_Username + '/Question').once("value", function(snapshot) {
    CurrentQuestion += 1;
    var Q = snapshot.val()['Q' + (CurrentQuestion)];;
    player.SetVar("Q", Q);
});
}

window.Script6 = function()
{
      var player = GetPlayer();
    var Username = player.GetVar("Username").toLowerCase();
    var Password = player.GetVar("Password");
    var Client = player.GetVar("Client");

    firebase.database().ref(Client + '/' + Username).once("value", function(snapshot) {

        if (snapshot.exists()) {
            let dbPassword = snapshot.val().Password;
            if (dbPassword == Password) {
                let Name = snapshot.val().Name;
                player.SetVar("Name", Name);                
                localStorage.setItem("Par_Username", "");
                
                firebase.database().ref(Client +'/' + Username + '/Question').once("value", function(snapshot) {             
                let Score = snapshot.val().Score;
                player.SetVar("Score", Score);});                                
                player.SetVar("Go", true);
            } else {

                player.SetVar("Message", "Wrong Username or Password");
                setTimeout(function() {
                    player.SetVar("Message", " ");
                }, 3000);


            }
        } else {
            player.SetVar("Message", "This data does not exist");
            setTimeout(function() {
                player.SetVar("Message", " ");
            }, 3000);
        }
    })
}

window.Script7 = function()
{
      var player = GetPlayer();
    var Username = player.GetVar("Username").toLowerCase();
    var Password = player.GetVar("Password");
    var Client = player.GetVar("Client");

    firebase.database().ref(Client + '/' + Username).once("value", function(snapshot) {

        if (snapshot.exists()) {
            let dbPassword = snapshot.val().Password;
            if (dbPassword == Password) {
                let Name = snapshot.val().Name;
                player.SetVar("Name", Name);                
                localStorage.setItem("Par_Username", "");
                
                firebase.database().ref(Client +'/' + Username + '/Question').once("value", function(snapshot) {             
                let Score = snapshot.val().Score;
                player.SetVar("Score", Score);});                                
                player.SetVar("Go", true);
            } else {

                player.SetVar("Message", "Wrong Username or Password");
                setTimeout(function() {
                    player.SetVar("Message", " ");
                }, 3000);


            }
        } else {
            player.SetVar("Message", "This data does not exist");
            setTimeout(function() {
                player.SetVar("Message", " ");
            }, 3000);
        }
    })
}

window.Script8 = function()
{
  var player = GetPlayer();
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Client = player.GetVar("Client");
var Old;

firebase.database().ref(Client+'/' + Par_Username).once("value", function(snapshot) {
    if (!snapshot.exists()) {
        player.SetVar("Message", "This data does not exist");
        setTimeout(function() {
            player.SetVar("Message", " ");
        }, 3000);
    } else {
        firebase.database().ref(Client+"/" + Username + "/Old").once("value").then(function(snapshot) {
            Old = snapshot.child(Par_Username).exists();
            if (Old) {
                player.SetVar("Par_Username", "");
                player.SetVar("Message", "You Should Scan Another One");
                setTimeout(function() {
                    player.SetVar("Message", " ");
                }, 3000);
            } else {	
				firebase.database().ref(Client+'/' + Par_Username).once("value", function(snapshot) {
				var Name = snapshot.val().Name;
                player.SetVar("Name", Name);
				});				
                firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
                    var Q = snapshot.val().Q1;
                    player.SetVar("A", "0");
                    player.SetVar("Q", Q);
                });
                firebase.database().ref(Client+"/" + Username + "/Old").child(Par_Username).set(Par_Username);
            }
        })
    }
});
}

window.Script9 = function()
{
  var player = GetPlayer();

        player.SetVar("Message", "Enter Your Partner Code First");
            setTimeout(function() {
                player.SetVar("Message", "");
            }, 3000);
}

window.Script10 = function()
{
  var player = GetPlayer();
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Client = player.GetVar("Client");
var Old;

firebase.database().ref(Client+'/' + Par_Username).once("value", function(snapshot) {
    if (!snapshot.exists()) {
        player.SetVar("Message", "This data does not exist");
        setTimeout(function() {
            player.SetVar("Message", " ");
        }, 3000);
    } else {
        firebase.database().ref(Client+"/" + Username + "/Old").once("value").then(function(snapshot) {
            Old = snapshot.child(Par_Username).exists();
            if (Old) {
                player.SetVar("Par_Username", "");
                player.SetVar("Message", "You Should Scan Another One");
                setTimeout(function() {
                    player.SetVar("Message", " ");
                }, 3000);
            } else {	
				firebase.database().ref(Client+'/' + Par_Username).once("value", function(snapshot) {
				var Name = snapshot.val().Name;
                player.SetVar("Name", Name);
				});				
                firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
                    var Q = snapshot.val().Q1;
                    player.SetVar("A", "0");
                    player.SetVar("Q", Q);
                });
                firebase.database().ref(Client+"/" + Username + "/Old").child(Par_Username).set(Par_Username);
            }
        })
    }
});
}

window.Script11 = function()
{
  var player = GetPlayer();

        player.SetVar("Message", "Enter Your Partner Code First");
            setTimeout(function() {
                player.SetVar("Message", "");
            }, 3000);
}

window.Script12 = function()
{
  var player = GetPlayer();
var Par_Username = localStorage.getItem("Par_Username").toLowerCase();
var Username = player.GetVar("Username").toLowerCase();
var Client = player.GetVar("Client");
var Old;

var Phase;
firebase.database().ref(Client + '/').once("value", function(snapshot) {
    Phase = snapshot.val().Phase;
    player.SetVar("Phase", Phase);
})


if (Par_Username) {
    player.SetVar("Par_Username", Par_Username);
    firebase.database().ref(Client +'/' + Par_Username).once("value", function(snapshot) {

        if (!snapshot.exists()) {

            player.SetVar("Message", "This data does not exist");
            setTimeout(function() {
                localStorage.setItem("Par_Username", "");
                player.SetVar("Message", " ");
            }, 3000);
        } else {

firebase.database().ref(Client+"/" + Username + "/Old").once("value").then(function(snapshot) {
	Old = snapshot.child(Par_Username).exists();

                if (Old) {

                    player.SetVar("Par_Username", "0");
                    localStorage.setItem("Par_Username", "");
                    player.SetVar("Message", "You Should Scan Another One");
                    setTimeout(function() {
                        player.SetVar("Message", " ");
                    }, 3000);
                } else {

                    firebase.database().ref(Client+'/' + Par_Username).once("value", function(snapshot) {
                        var Name = snapshot.val().Name;
                        player.SetVar("Name", Name);
                        firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
                            var Q1 = snapshot.val().Q1;
                            player.SetVar("A", "0");
                            player.SetVar("Q", Q1);
                        });
                    });
                    firebase.database().ref(Client+"/" + Username + "/Old").child(Par_Username).set(Par_Username);
                }
            });
        }
    })
}
}

window.Script13 = function()
{
  var player = GetPlayer();
var Par_Username = localStorage.getItem("Par_Username").toLowerCase();
var Username = player.GetVar("Username").toLowerCase();
var Client = player.GetVar("Client");
var Old;

var Phase;
firebase.database().ref(Client + '/').once("value", function(snapshot) {
    Phase = snapshot.val().Phase;
    player.SetVar("Phase", Phase);
})


if (Par_Username) {
    player.SetVar("Par_Username", Par_Username);
    firebase.database().ref(Client +'/' + Par_Username).once("value", function(snapshot) {

        if (!snapshot.exists()) {

            player.SetVar("Message", "This data does not exist");
            setTimeout(function() {
                localStorage.setItem("Par_Username", "");
                player.SetVar("Message", " ");
            }, 3000);
        } else {

firebase.database().ref(Client+"/" + Username + "/Old").once("value").then(function(snapshot) {
	Old = snapshot.child(Par_Username).exists();

                if (Old) {

                    player.SetVar("Par_Username", "0");
                    localStorage.setItem("Par_Username", "");
                    player.SetVar("Message", "You Should Scan Another One");
                    setTimeout(function() {
                        player.SetVar("Message", " ");
                    }, 3000);
                } else {

                    firebase.database().ref(Client+'/' + Par_Username).once("value", function(snapshot) {
                        var Name = snapshot.val().Name;
                        player.SetVar("Name", Name);
                        firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
                            var Q1 = snapshot.val().Q1;
                            player.SetVar("A", "0");
                            player.SetVar("Q", Q1);
                        });
                    });
                    firebase.database().ref(Client+"/" + Username + "/Old").child(Par_Username).set(Par_Username);
                }
            });
        }
    })
}
}

window.Script14 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script15 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script16 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script17 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script18 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script19 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script20 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script21 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script22 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script23 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script24 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script25 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script26 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script27 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script28 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script29 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script30 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script31 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script32 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script33 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script34 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script35 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script36 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script37 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script38 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

window.Script39 = function()
{
  var player = GetPlayer();
var Phase = player.GetVar("Phase");
var Username = player.GetVar("Username").toLowerCase();
var Par_Username = player.GetVar("Par_Username").toLowerCase();
var Q = player.GetVar("Q");
var A = player.GetVar("A");
var Client = player.GetVar("Client");
var Score = player.GetVar("Score");
var CurrentQuestion = player.GetVar("CurrentQuestion");

if (Phase === 1) {
    firebase.database().ref(Client+'/' + Username + '/Question').update({
        ['A' + CurrentQuestion]: A,
        ['Q' + CurrentQuestion]: Q,
    });
} else if (Phase === 2) {
    firebase.database().ref(Client+'/' + Par_Username + '/Question').once("value", function(snapshot) {
        var DBAnswer = snapshot.val()['A' + (CurrentQuestion)];

        Score += (A === DBAnswer) ? 1 : -1;
        firebase.database().ref(Client+'/' + Username + '/Question').update({
            Score: Score
        });
        player.SetVar("Score", Score);
        player.SetVar("Q", 0);
    });
}
}

};
