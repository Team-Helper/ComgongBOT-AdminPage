<template>
    <div>
        <div class="d-flex h-100 justify-content-center align-items-center">
            <b-col md="8" class="mx-auto app-login-box">
                <div class="modal-dialog w-100 mx-auto">
                    <div class="modal-content">
                        <b-form @submit="submit">
                            <div class="modal-body">
                                <div class="h5 modal-title text-left text-blue">
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
                                        label-class="font-weight-bold"
                                        description="관리자 아이디를 입력해 주세요.">
                                        <b-form-input
                                            id="exampleInput1"
                                            v-model="form.id"
                                            type="text"
                                            required="required"
                                            placeholder="admin"
                                            autofocus="autofocus"></b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        id="exampleInputGroup2"
                                        label-for="exampleInput2"
                                        label="비밀번호"
                                        label-class="font-weight-bold"
                                        description="관리자 비밀번호를 입력해 주세요.">
                                        <b-form-input
                                            id="exampleInput2"
                                            v-model="form.password"
                                            type="password"
                                            required="required"
                                            placeholder="Enter password..."></b-form-input>
                                    </b-form-group>
                                    <div class="divider"/>
                                    <h6 class="mb-0">
                                        <a href="javascript:void(0);" class="text-blue btn-lg btn btn-link">비밀번호를 잊으셨나요?</a>
                                    </h6>
                                </div>
                                <div class="modal-footer clearfix">
                                    <b-button type="submit" block="block" variant="blue" size="lg">Sign in</b-button>
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
                        id: '',
                        password: ''
                    }
                };
            }
        };
    </script>