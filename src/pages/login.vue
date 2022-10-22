<template>
    <div>
        <div class="d-flex h-100 justify-content-center align-items-center">
            <b-modal
                v-model="loginFailed"
                title="로그인 실패..."
                ok-only="ok-only"
                no-close-on-backdrop="no-close-on-backdrop"
                hide-backdrop="hide-backdrop">올바른 패스워드나 아이디를 입력해주세요!
            </b-modal>
            <b-col md="8" class="mx-auto app-login-box">
                <div class="modal-dialog w-100 mx-auto">
                    <div class="modal-content">
                        <b-form @submit="submit">
                            <div class="modal-body">
                                <div class="h5 modal-title text-center text-blue">
                                    <b-img
                                        :src="require('../assets/images/comgongBOT-logo.png')"
                                        width="42"
                                        alt="comgongBOT"></b-img>
                                    <b>&nbsp; ComgongBOT 관리자</b>
                                </div>
                                <br>
                                    <b-form-group
                                        id="exampleInputGroup1"
                                        label-for="exampleInput1"
                                        label="아이디"
                                        label-class="font-weight-bold">
                                        <b-form-input
                                            id="exampleInput1"
                                            v-model="form.id"
                                            type="text"
                                            required="required"
                                            autofocus="autofocus"></b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        id="exampleInputGroup2"
                                        label-for="exampleInput2"
                                        label="비밀번호"
                                        label-class="font-weight-bold">
                                        <b-form-input
                                            id="exampleInput2"
                                            v-model="form.password"
                                            type="password"
                                            required="required"></b-form-input>
                                    </b-form-group>
                                    <div class="mb-0">
                                        <a href="javascript:void(0);" class="text-blue btn-link">비밀번호를 잊었습니까?</a>
                                    </div>
                                </div>
                                <div class="modal-footer clearfix">
                                    <b-button type="submit" block="block" variant="blue" size="lg">로그인</b-button>
                                </div>
                            </b-form>
                        </div>
                    </div>
                </b-col>
            </div>
        </div>
    </template>

    <script>
        import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
        export default {
            data() {
                return {
                    form: {
                        id: '',
                        password: ''
                    },
                    loginFailed: false // 로그인 실패 UI 출력 Flag 값
                };
            },
            methods: {
                submit(event) {
                    event.preventDefault();
                    const auth = getAuth();
                    const email = this.form.id + '@sungkyul.ac.kr';
                    const password = this.form.password;
                    /* 개발/배포 모드를 구분해 로그 출력 및 */
                    if (process.env.NODE_ENV === 'development') {
                        signInWithEmailAndPassword(auth, email, password)
                            .then((result) => {
                                console.log(result);
                                this
                                    .$router
                                    .push('/index');
                            })
                            .catch((err) => {
                                console.error(err);
                                this.loginFailed = true;
                            });
                    } else {
                        signInWithEmailAndPassword(auth, email, password)
                            .then(() => {
                                this
                                    .$router
                                    .push('/index');
                            })
                            .catch(() => {
                                this.loginFailed = true;
                            });
                    }

                }
            }
        };
    </script>