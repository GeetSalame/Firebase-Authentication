
let userMail = "";

const firebaseConfig = {
    apiKey: "AIzaSyA7PsQPDCob188vVn4in1K6Zn1vKWDkJFs",
    authDomain: "auth-6d7c1.firebaseapp.com",
    databaseURL: "https://auth-6d7c1-default-rtdb.firebaseio.com",
    projectId: "auth-6d7c1",
    storageBucket: "auth-6d7c1.appspot.com",
    messagingSenderId: "1005067443952",
    appId: "1:1005067443952:web:977b6b8d9e043cee252c35"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//invokes firebase authentication.
const auth = firebase.auth();

document.querySelector("#show-register").addEventListener("click", () => {
    showRegistration();
});

const showRegistration = () => {
    document.querySelector("#registration-page").classList.remove("hide");
    document.querySelector("#login-page").classList.add("hide");
    document.querySelector("#homepage").classList.add("hide");
};

document.querySelector("#show-login").addEventListener("click", () => {
    showLogin();
});

const showLogin = () => {
    document.querySelector("#registration-page").classList.add("hide");
    document.querySelector("#login-page").classList.remove("hide");
    document.querySelector("#homepage").classList.add("hide");
};

document.querySelector("#signout").addEventListener("click", () => {
    signOut();
});

const register = () => {
    const email = document.querySelector("#registration-email").value;
    const reemail = document.querySelector("#registration-reemail").value;
    const password = document.querySelector("#registration-password").value;

    if (email.trim() == "") {
        alert("Please enter Email");
    } else if (password.trim().length < 7) {
        alert("Password must be at least 7 characters");
    } else if (email != reemail) {
        alert("emails do not match");
    } else {
        auth
            .createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                // ...
            });
    }
};

document.querySelector("#register").addEventListener("click", () => {
    register();
});

//register when you hit the enter key
document
    .querySelector("#registration-password")
    .addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();

            register();
        }
    });


//function for verifying login entries
const login = () => {
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    if (email.trim() == "") {
        alert("PLease enter Email");
    } else if (password.trim() == "") {
        alert("Please enter Password");
    } else {
        authenticate(email, password);
        //   alert("logged in successfully!");
    }
};

//event on login button
document.querySelector("#login").addEventListener("click", () => {
    login();
});

//sign in when you hit enter
document
    .querySelector("#login-password")
    .addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();

            login();
        }
    });

//function for authenticating the entered values for login with firebase data
const authenticate = (email, password) => {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password);
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
};

const showHomepage = () => {
    document.querySelector("#registration-page").classList.add("hide");
    document.querySelector("#login-page").classList.add("hide");
    document.querySelector("#homepage").classList.remove("hide");
};

const signOut = () => {
    firebase
        .auth()
        .signOut()
        .then(function () {
            userMail = "";
            location.reload();
        })
        .catch(function (error) {
            alert("error signing out, check network connection");
        });
};

auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
        userMail = firebaseUser.email;
        document.querySelector("#userMail").innerHTML = userMail;
        showHomepage();
    }
});

    //   document
    //     .querySelector("#forgot-password")
    //     .addEventListener("click", () => {
    //       const email = document.querySelector("#login-email").value;
    //       if (email.trim() == "") {
    //         alert("Enter Email");
    //       } else {
    //         forgotPassword(email);
    //       }
    //     });

    //   const forgotPassword = (email) => {
    //     auth
    //       .sendPasswordResetEmail(email)
    //       .then(function () {
    //         alert("email sent");
    //       })
    //       .catch(function (error) {
    //         alert("invalid email or bad network connection");
    //       });
    //   };