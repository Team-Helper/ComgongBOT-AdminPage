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
initializeApp(firebaseConfig); // firebase web init
// console.log(firebaseConfig);

const auth = getAuth();
export function sendLink(email) {
    // console.log(email); console.log(auth);
    /* 지정한 도메인 주소로의 인증 링크 이메일 전송 */
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
    if (isSignInWithEmailLink(auth, window.location.href)) { // 링크를 누른 경우
        // console.log(window.location.href);
        const user = JSON.parse(window.localStorage.getItem('userAbout')); // 로컬 스토리지 값 변수 처리
        // console.log(user);
        signInWithEmailLink(auth, user.Data.email, window.location.href) // auth에 사용자 이메일 등록
            .then((result) => {
                // console.log(result);
                /* 등록 후 프로필 DB 생성 관련 컴공봇 기능 호출 */
                const settings = {
                    "url": process.env.emailAuth,
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": window
                        .localStorage
                        .getItem('userAbout')
                };
                // console.log(settings);
                $
                    .ajax(settings)
                    .done(function (response) { // 프로필 DB 생성 후 로컬 스토리지 값 삭제
                        // console.log(response);
                        console.log('success auth email');
                        window
                            .localStorage
                            .removeItem('userAbout');
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    }
}