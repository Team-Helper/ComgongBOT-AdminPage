<template>
    <div>
        <div class="d-flex h-100 justify-content-center align-items-center">
            <b-modal
                v-model="modalShow"
                title="비정상 접근!"
                hide-footer="hide-footer"
                no-close-on-backdrop="no-close-on-backdrop"
                hide-header-close="hide-header-close">올바른 접근이 필요합니다.</b-modal>
            <font-awesome-icon
                v-show="loading"
                class="text-blue"
                icon="spinner"
                spin="spin"
                fixedWidth="fixedWidth"
                size="8x"/>
            <b-modal
                v-model="authSuccess"
                title="이메일 인증 성공!"
                hide-footer="hide-footer"
                hide-backdrop="hide-backdrop"
                no-close-on-backdrop="no-close-on-backdrop"
                hide-header-close="hide-header-close">이제 ComgongBOT로 돌아가 자유롭게 이용해보세요.</b-modal>
            <b-modal
                v-model="authFailed"
                title="이메일 인증 실패..."
                hide-footer="hide-footer"
                hide-backdrop="hide-backdrop"
                no-close-on-backdrop="no-close-on-backdrop"
                hide-header-close="hide-header-close">빠른 수정을 위해 개발자 메일주소를 통해 알려주세요!</b-modal>
        </div>
    </div>
</template>
<script>
    import {getAuth, isSignInWithEmailLink, signInWithEmailLink} from "firebase/auth";
    import {library} from '@fortawesome/fontawesome-svg-core';
    import {faSpinner} from '@fortawesome/free-solid-svg-icons';
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
    import axios from 'axios';
    library.add(faSpinner);

    export default {
        data() {
            return {modalShow: true, loading: false, authSuccess: false, authFailed: false};
        },
        created() {
            const auth = getAuth();
            /* 개발/배포 모드를 구분해 로그 출력 */
            if (process.env.NODE_ENV === 'development') {
                if (isSignInWithEmailLink(auth, window.location.href)) {
                    this.modalShow = false;
                    this.loading = true;
                    // console.log(window.location.href);
                    const currentURL = (new URL(window.location.href)).searchParams;
                    const email = currentURL.get('email');
                    const studentID = currentURL.get('studentID');
                    const userKey = currentURL.get('userKey');
                    // console.log(email, studentID, userKey);
                    signInWithEmailLink(auth, email, window.location.href)
                        .then(() => {
                            /* 이메일 인증 후 ComgongBOT 사용자 프로필 DB 생성 API에 사용자 입력 값을 전달하여 프로필 DB 생성 시도 */
                            let data = JSON.stringify({
                                "Data": {
                                    "email": email,
                                    "studentID": studentID,
                                    "userKey": userKey
                                }
                            });
                            // console.log(data);
                            let config = {
                                method: 'post',
                                url: process.env.VUE_APP_URL,
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: data
                            };
                            // console.log(config);

                            axios(config)
                                .then((response) => {
                                    console.log(JSON.stringify(response.data));
                                    this.loading = false;
                                    this.authSuccess = true;
                                })
                                .catch((err) => {
                                    console.error(err);
                                    this.loading = false;
                                    this.authFailed = true;
                                });

                        })
                        .catch((err) => {
                            console.error(err);
                            this.loading = false;
                            this.modalShow = true;
                        });
                }
            } else {
                if (isSignInWithEmailLink(auth, window.location.href)) {
                    this.modalShow = false;
                    this.loading = true;
                    const currentURL = (new URL(window.location.href)).searchParams;
                    const email = currentURL.get('email');
                    const studentID = currentURL.get('studentID');
                    const userKey = currentURL.get('userKey');

                    signInWithEmailLink(auth, email, window.location.href)
                        .then(() => {
                            let data = JSON.stringify({
                                "Data": {
                                    "email": email,
                                    "studentID": studentID,
                                    "userKey": userKey
                                }
                            });
                            let config = {
                                method: 'post',
                                url: process.env.VUE_APP_URL,
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: data
                            };

                            axios(config)
                                .then(() => {
                                    this.loading = false;
                                    this.authSuccess = true;
                                })
                                .catch(() => {
                                    this.loading = false;
                                    this.authFailed = true;
                                });

                        })
                        .catch(() => {
                            this.loading = false;
                            this.modalShow = true;
                        });
                }
            }
        },
        components: {
            'font-awesome-icon': FontAwesomeIcon
        }
    };
</script>