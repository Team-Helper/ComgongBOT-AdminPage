/* eslint-disable no-undef */
import {initializeApp} from 'firebase/app';
import {getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};
initializeApp(firebaseConfig);
// console.log(firebaseConfig);

const auth = getAuth();
export function sendLink(email) {
    // console.log(email); console.log(auth);
    sendSignInLinkToEmail(auth, email, {
        url: 'https://comgong-bot.web.app/',
        handleCodeInApp: true
    })
        .then(() => {
            console.log('success send email');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        });
}
export function createAccount() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
        // console.log(window.location.href);
        const user = JSON.parse(window.localStorage.getItem('user'));
        // console.log(user);
        signInWithEmailLink(auth, user.email, window.location.href)
            .then((result) => {
                console.log(result);
                window
                    .localStorage
                    .removeItem('user');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    }
}