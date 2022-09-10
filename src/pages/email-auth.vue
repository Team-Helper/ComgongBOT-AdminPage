<template>
    <div>
        <div class="d-flex h-100 justify-content-center align-items-center">
            <b-modal
                v-model="modalShow"
                title="비정상 접근!"
                ok-only="ok-only"
                no-close-on-backdrop="no-close-on-backdrop"
                hide-header-close
                @ok="handleOk">해당 페이지는 반드시
                <code>id 값</code>이 필요합니다.</b-modal>
            <b-modal
                v-model="authShow"
                title="이메일 전송 완료!"
                ok-only="ok-only"
                hide-backdrop="hide-backdrop"
                no-close-on-backdrop="no-close-on-backdrop">입력하신 이메일 주소로 인증 관련 메일을 전송했어요!
                <br>
                    <code>(메일이 안왔을 시 스팸함을 확인해주세요)</code>
                </b-modal>
                <b-col md="8" class="mx-auto app-login-box" v-show="key">
                    <div class="modal-dialog w-100 mx-auto">
                        <div class="modal-content">
                            <b-form @submit="submit">
                                <div class="modal-body">
                                    <div class="h5 modal-title text-left text-blue">
                                        <b-img
                                            :src="require('../assets/images/comgongBOT-logo.png')"
                                            width="42"
                                            alt="comgongBOT"></b-img>
                                        <b>&nbsp; 이메일 인증</b>
                                    </div>
                                    <br>
                                        <b-form-group
                                            id="exampleInputGroup1"
                                            label-for="exampleInput1"
                                            label="학교 이메일 주소"
                                            label-class="font-weight-bold"
                                            description="본인의 학교 아이디를 입력해주세요.">
                                            <b-input-group append="@sungkyul.ac.kr">
                                                <b-form-input
                                                    id="exampleInput1"
                                                    v-model="form.email"
                                                    type="text"
                                                    required="required"
                                                    autofocus="autofocus"></b-form-input>
                                            </b-input-group>
                                        </b-form-group>
                                        <b-form-group
                                            id="exampleInputGroup3"
                                            label-for="exampleInput3"
                                            label="학번"
                                            label-class="font-weight-bold"
                                            description="본인의 학번 숫자 2자리를 입력해주세요.">
                                            <b-form-input
                                                v-model="form.studentID"
                                                id="exampleInput3"
                                                type="number"
                                                required="required"
                                                min="08"
                                                max="22"
                                                placeholder="ex) 22"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="modal-footer clearfix">
                                        <b-button type="submit" block="block" variant="blue" size="lg">제출</b-button>
                                    </div>
                                </b-form>
                            </div>
                        </div>
                    </b-col>
                </div>
            </div>
        </template>

        <script>
            import {getAuth, sendSignInLinkToEmail} from "firebase/auth";

            export default {
                data() {
                    return {
                        form: {
                            email: '',
                            studentID: ''
                        },
                        key: false,
                        modalShow: true,
                        authShow: false
                    };
                },
                created() {
                    const urlParams = new URL(window.location.href).searchParams;
                    const userKey = urlParams.get('variable');
                    if (userKey) {
                        this.key = true;
                        this.modalShow = false;
                    }
                },
                methods: {
                    submit(event) {
                        event.preventDefault();
                        // console.log(this.form);
                        const auth = getAuth();
                        const email = this.form.email + '@sungkyul.ac.kr';
                        const studentID = this.form.studentID;
                        const urlParams = new URL(window.location.href).searchParams;
                        const userKey = urlParams.get('variable');
                        const linkURL = new URL(
                            'http://localhost:8080/email-link?email=?studentID=?userKey='
                        );
                        linkURL
                            .searchParams
                            .set('email', email);
                        linkURL
                            .searchParams
                            .set('studentID', studentID);
                        linkURL
                            .searchParams
                            .set('userKey', userKey);
                        const webLink = linkURL.href;
                        console.log(webLink);
                        sendSignInLinkToEmail(auth, email, {
                            url: webLink,
                            handleCodeInApp: true
                        })
                            .then(() => {
                                console.log('send email success!');
                                this.authShow = true;
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    },
                    handleOk() {
                        this
                            .$router
                            .go(-1);
                    }
                }
            };
        </script>