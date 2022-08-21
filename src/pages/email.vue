<template>
    <div>
        <div class="d-flex h-100 justify-content-center align-items-center">
            <b-col md="8" class="mx-auto app-login-box">
                <div class="modal-dialog w-100 mx-auto">
                    <div class="modal-content">
                        <b-form @submit="submit" v-show="key">
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
                                        id="exampleInputGroup2"
                                        label-for="exampleInput2"
                                        label="학년"
                                        label-class="font-weight-bold"
                                        description="본인의 학년을 선택해주세요.">
                                        <b-form-select v-model="form.grade" required="required">
                                            <b-form-select-option :value="null" disabled="disabled">-- 학년을 선택하세요 --</b-form-select-option>
                                            <b-form-select-option value="1">1학년</b-form-select-option>
                                            <b-form-select-option value="2">2학년</b-form-select-option>
                                            <b-form-select-option value="3">3학년</b-form-select-option>
                                            <b-form-select-option value="4">4학년</b-form-select-option>
                                        </b-form-select>
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
        export default {
            data() {
                return {
                    form: {
                        email: '',
                        grade: null,
                        studentID: ''
                    },
                    key: true
                };
            },
            methods: {
                submit(event) {
                    event.preventDefault();
                    console.log(this.form);
                }
            }
        };
    </script>