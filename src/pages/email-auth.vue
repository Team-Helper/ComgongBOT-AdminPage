<template>
    <div>
        <div class="d-flex h-100 justify-content-center align-items-center">
            <b-modal
                v-model="modalShow"
                title="비정상 접근!"
                ok-only="ok-only"
                no-close-on-backdrop="no-close-on-backdrop"
                hide-header-close="hide-header-close"
                @ok="handleOk">해당 페이지는 반드시
                <code>id 값</code>이 필요합니다.</b-modal>
            <b-modal
                size="lg"
                v-model="sendSuccess"
                title="이메일 전송 완료!"
                ok-only="ok-only"
                no-close-on-backdrop="no-close-on-backdrop"
                hide-backdrop="hide-backdrop">입력하신 이메일 주소로 인증 관련 메일을 전송했어요!
                <code>(메일이 오지 않았으면 스팸함을 확인해주세요)</code>
            </b-modal>
            <b-modal
                v-model="sendFailed"
                title="이메일 전송 실패..."
                ok-only="ok-only"
                no-close-on-backdrop="no-close-on-backdrop"
                hide-backdrop="hide-backdrop">빠른 수정을 위해 개발자 메일주소를 통해 알려주세요!
            </b-modal>
            <b-modal
                v-model="alreadyHave"
                title="중복 가입"
                ok-only="ok-only"
                no-close-on-backdrop="no-close-on-backdrop"
                hide-backdrop="hide-backdrop">이미 가입된 학생이에요.
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
                                        description="본인의 학번을 입학년도인 숫자 2자리로 입력해주세요.">
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
        import {getAuth, sendSignInLinkToEmail, fetchSignInMethodsForEmail} from "firebase/auth";

        export default {
            data() {
                return {
                    form: {
                        email: '',
                        studentID: ''
                    },
                    /* 사용자의 정상/비정상 접근 상태 UI 출력 Flag 값 */
                    key: false,
                    modalShow: true,
                    /* 이메일 주소 인증 관련 링크 전송 성공/실패 상태 UI 출력 Flag 값 */
                    sendSuccess: false,
                    sendFailed: false,
                    alreadyHave: false // 중복 가입 방지 관련 UI 출력 Flag 값
                };
            },
            created() {
                const urlParams = new URL(window.location.href).searchParams;
                const userKey = urlParams.get('variable');
                /* 사용자가 카카오 채널 id값을 가진채 해당 페이지에 접근하였는지 주소의 파라미터 검증을 통해 확인 */
                if (userKey) {
                    this.key = true;
                    this.modalShow = false;
                }
                // console.log(process.env.NODE_ENV);
            },
            methods: {
                submit(event) {
                    event.preventDefault();
                    const auth = getAuth();
                    const email = this.form.email + '@sungkyul.ac.kr';
                    /* 개발/배포 모드를 구분해 로그 출력 및 링크 페이지 주소 개별 지정 */
                    if (process.env.NODE_ENV === 'development') {
                        fetchSignInMethodsForEmail(auth, email)
                            .then((result) => {
                                // console.log(result);
                                if (result.length === 0) {
                                    const studentID = this.form.studentID;
                                    const urlParams = new URL(window.location.href).searchParams;
                                    const userKey = urlParams.get('variable');
                                    /* 사용자 입력 값을 쿼리스트링으로 추가하여 사용자 프로필 생성 관련 값으로 쓰이기 위해 전달 */
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
                                    // console.log(webLink);
                                    sendSignInLinkToEmail(auth, email, {
                                        url: webLink,
                                        handleCodeInApp: true
                                    })
                                        .then(() => {
                                            console.log('send email success!');
                                            this.sendSuccess = true;
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                            this.sendFailed = true;
                                        });
                                } else {
                                    this.alreadyHave = true;
                                }
                            })
                            .catch((err) => {
                                console.error(err);
                                this.sendFailed = true;
                            });
                    } else {
                        fetchSignInMethodsForEmail(auth, email)
                            .then((result) => {
                                if (result.length === 0) {
                                    const studentID = this.form.studentID;
                                    const urlParams = new URL(window.location.href).searchParams;
                                    const userKey = urlParams.get('variable');
                                    const linkURL = new URL(
                                        'https://comgong-bot.web.app/#/email-link?email=?studentID=?userKey='
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
                                    sendSignInLinkToEmail(auth, email, {
                                        url: webLink,
                                        handleCodeInApp: true
                                    })
                                        .then(() => {
                                            this.sendSuccess = true;
                                        })
                                        .catch(() => {
                                            this.sendFailed = true;
                                        });
                                } else {
                                    this.alreadyHave = true;
                                }
                            })
                            .catch(() => {
                                this.sendFailed = true;
                            });
                    }

                },
                handleOk() {
                    this
                        .$router
                        .go(-1);
                }
            }
        };
    </script>