import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";

import firebaseConfig from './firebaseConfig';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  
  var provider = new firebase.auth.GoogleAuthProvider();
  const [user, setUser] = useState({
    isSignedIn : false,
    name : '',
    email : '',
    photo : ''
  });
  const handleSignIn = () => {
    firebase.auth()
    .signInWithPopup(provider)
    .then(result => {
      const {displayName, email, photoURL, }= result.user;
      const signedInUser = {
        isSignedIn : true,
        name : displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
      console.log(result);
      console.log('Name : '+displayName+' Email: '+ email+ 'Photo Url : '+ photoURL);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error, errorCode, errorMessage);
    })
    console.log('SignIn Click');
  };
  const handleSignOut = () => {
    firebase.auth().signOut()
    .then( res => {
      const signedOutUser = {
        isSignedIn : false,
        name : '',                                      
        email : '',
        photo : ''
      }
      setUser(signedOutUser);
    })
    .catch(error => {
      console.log(error); //Checking error
    })
  };
  return (
    <div className="App">
      {
          user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
          <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome , {user.name}</p>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt="UserPhoto"/>
        </div>
      }
    </div>
  );
}

export default App;
