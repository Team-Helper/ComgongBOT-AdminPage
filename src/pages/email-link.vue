<template>
    <div>Hello!</div>
</template>
<script>
    import {getAuth, isSignInWithEmailLink} from "firebase/auth";
    export default {
        beforeMount() {
            const auth = getAuth();
            if (isSignInWithEmailLink(auth, window.location.href)) { // 링크를 누른 경우
                // console.log(window.location.href);
                /* 파라미터 값들 각각 변수처리 */
                const currentURL = (new URL(window.location.href)).searchParams;
                const email = currentURL.get('email');
                const grade = currentURL.get('grade');
                const studentID = currentURL.get('studentID');
                const userKey = currentURL.get('userKey');
                console.log(email, grade, studentID, userKey);
            }
        }
    };
</script>