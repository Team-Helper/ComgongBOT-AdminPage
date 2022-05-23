/* eslint-disable no-undef */
import {initializeApp} from 'firebase/app';
import {
    getAuth,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    fetchSignInMethodsForEmail,
    deleteUser
} from 'firebase/auth';

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
export async function checkUser(email) { // 가입 유무를 판별하는 함수
    const user = await fetchSignInMethodsForEmail(auth, email); // 0 이면 가입되지 않은, 1이면 가입된 사용자임을 알림
    // console.log(user);
    if (user.length === 0) {
        return true;
    } else {
        return false;
    }
}
export function sendLink(email, grade, studentID, userKey) { // 인증 링크 이메일 전송 함수
    // console.log(email, grade, studentID, userKey);
    /* 연결 도메인 주소에 파라미터 값들을 저장 및 새로운 링크로 반환 */
    const url = 'https://comgong-bot.web.app/linkpage?email=?grade=?studentID=?userKey=';
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
    const webLink = newURL.href;
    // console.log(webLink);
    /* 지정한 도메인 주소로의 인증 링크 이메일 전송 */
    return sendSignInLinkToEmail(auth, email, {
        url: webLink,
        handleCodeInApp: true
    })
        .then(() => {
            // console.log('success send email');
            return true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.error(errorCode, errorMessage);
            return false;
        });
}
export function createAccount() { // 계정 생성 함수
    if (isSignInWithEmailLink(auth, window.location.href)) { // 링크를 누른 경우
        // console.log(window.location.href);
        /* 파라미터 값들 각각 변수처리 */
        const getURL = (new URL(window.location.href)).searchParams;
        const email = getURL.get('email');
        const grade = getURL.get('grade');
        const studentID = getURL.get('studentID');
        const userKey = getURL.get('userKey');
        // console.log(email, grade, studentID, userKey);
        return signInWithEmailLink(auth, email, window.location.href) // auth에 사용자 이메일 등록
            .then(async (result) => {
                // console.log(result);
                // console.log('success email auth');
                /* 등록 후 프로필 DB 생성 관련 ComgongBOT 기능 호출 */
                const settings = {
                    "url": process.env.createProfile,
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
                const resultProfile = await $
                    .ajax(settings)
                    .done(function (response) { // 프로필 생성 완료 후
                        console.log(response);
                    })
                    .catch(err => {
                        console.error(err);
                        const user = auth.currentUser;
                        deleteUser(user);
                        return false;
                    });
                // console.log(resultProfile);
                return resultProfile;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.error(errorCode, errorMessage);
                return false;
            });
    }
}