<template>
    <div>
        <div class="d-flex h-100 justify-content-center align-items-center">
            <b-col md="8" class="mx-auto app-login-box">
                <div class="modal-dialog w-100 mx-auto">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="h5 modal-title text-left text-blue">
                                <b-img src="../assets/images/comgongBOT-logo.png"></b-img>
                                <h5 class="mt-2">
                                    <b>&nbsp; 이메일 인증</b>
                                </h5>
                            </div>
                            <br>
                                <b-form-group
                                    id="exampleInputGroup1"
                                    label-for="exampleInput1"
                                    label="학교 이메일 주소"
                                    label-class="font-weight-bold">
                                    <b-form-input
                                        id="exampleInput1"
                                        type="email"
                                        required="required"
                                        placeholder="ex) test@sungkyul.ac.kr"></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="exampleInputGroup2"
                                    label-for="exampleInput2"
                                    label="학년 선택"
                                    label-class="font-weight-bold">
                                    <b-form-select v-model="selected">
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
                                    label="학번 입력"
                                    label-class="font-weight-bold">
                                    <b-form-input
                                        id="exampleInput3"
                                        type="number"
                                        required="required"
                                        placeholder="ex) 22"></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="modal-footer clearfix">
                                <b-button block="block" variant="blue" size="lg">제출</b-button>
                            </div>
                        </div>
                    </div>
                </b-col>
            </div>
        </div>
    </template>

    <script>
        export default {
            data() {
                return {selected: null};
            }
        };
    </script>