<template>
    <div>
        <div class="d-flex h-100 justify-content-center align-items-center">
            <b-modal
                v-model="modalShow"
                title="비정상 접근!"
                ok-only="ok-only"
                no-close-on-backdrop="no-close-on-backdrop"
                hide-header-close="hide-header-close"
                @ok="handleOk">올바른 접근이 필요합니다.</b-modal>
            <font-awesome-icon
                v-show="loading"
                class="text-blue"
                icon="spinner"
                spin="spin"
                fixedWidth="fixedWidth"
                size="8x"/>
            <p v-show="result">Success!</p>
        </div>
    </div>
</template>
<script>
    import {getAuth, isSignInWithEmailLink, signInWithEmailLink} from "firebase/auth";
    import {library} from '@fortawesome/fontawesome-svg-core';
    import {faSpinner} from '@fortawesome/free-solid-svg-icons';
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
    library.add(faSpinner);

    export default {
        data() {
            return {modalShow: false, loading: false};
        },
        created() {
            const auth = getAuth();
            if (isSignInWithEmailLink(auth, window.location.href)) { // 링크를 누른 경우
                this.loading = true;
                // console.log(window.location.href);
                /* 파라미터 값들 각각 변수처리 */
                const currentURL = (new URL(window.location.href)).searchParams;
                const email = currentURL.get('email');
                const studentID = currentURL.get('studentID');
                const userKey = currentURL.get('userKey');
                console.log(email, studentID, userKey);
                signInWithEmailLink(auth, email, window.location.href)
                    .then((result) => {
                        // Clear email from storage.
                        console.log(result);
                        this.loading = false;
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                this.modalShow = true;
            }
        },
        methods: {
            handleOk() {
                this
                    .$router
                    .go(-1);
            }
        },
        components: {
            'font-awesome-icon': FontAwesomeIcon
        }
    };
</script>