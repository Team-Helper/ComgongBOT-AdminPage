/* eslint-disable no-undef */
import {initializeApp} from 'firebase/app';
import {getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink} from 'firebase/auth';

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
// console.log(auth);
export function sendLink(email, grade, studentID, userKey) {
    // console.log(email, grade, studentID, userKey);
    const url = 'https://comgong-bot.web.app/?email=?grade=?studentID=?userKey=';
    const newURL = new URL(url);
    newURL
        .searchParams
        .set('email', email);
    newURL
        .searchParams
        .set('grade', grade);
    newURL
        .searchParams
        .set('studentID', studentID);
    newURL
        .searchParams
        .set('userKey', userKey);
    const webLink = newURL.href; // 연결 페이지 주소에 파라미터 값들 저장
    // console.log(webLink);
    /* 지정한 도메인 주소로의 인증 링크 이메일 전송 */
    sendSignInLinkToEmail(auth, email, {
        url: webLink,
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
        /* 파라미터 값들 각각 변수처리 */
        const getURL = (new URL(window.location.href)).searchParams;
        const email = getURL.get('email');
        const grade = getURL.get('grade');
        const studentID = getURL.get('studentID');
        const userKey = getURL.get('userKey');
        // console.log(email, grade, studentID, userKey);
        signInWithEmailLink(auth, email, window.location.href) // auth에 사용자 이메일 등록
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
                    "data": JSON.stringify({
                        "Data": {
                            'email': email,
                            'grade': grade,
                            'studentID': studentID,
                            'userKey': userKey
                        }
                    })
                };
                // console.log(settings);
                $
                    .ajax(settings)
                    .done(function (response) { // 프로필 DB 생성 후 로컬 스토리지 값 삭제
                        console.log(response);
                        console.log('success auth email and profile DB');
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