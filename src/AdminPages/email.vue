<template>
    <div>
        <div class="d-flex h-100 justify-content-center align-items-center">
            <b-col md="8" class="mx-auto app-login-box">
                <div class="modal-dialog w-100 mx-auto">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="h5 modal-title text-left text-blue">
                                <img width="42" class="rounded-circle" src="./logo.png" alt="">
                                    <b>&nbsp; Email Auth</b>
                            </div>
                            <br>

                                <div class="position-relative form-group">
                                    <label for="exampleEmail" class="">
                                        <b>학교 이메일 주소</b>
                                    </label>
                                    <input
                                        name="email"
                                        id="exampleEmail"
                                        placeholder="ex) test@sungkyul.ac.kr"
                                        type="email"
                                        class="form-control">
                                </div>
                                <div class="position-relative form-group">
                                    <label for="exampleSelect" class="">
                                        <b>학년 선택</b>
                                    </label>
                                    <select name="select" id="exampleSelect" class="form-control">
                                        <option>1학년</option>
                                        <option>2학년</option>
                                        <option>3학년</option>
                                        <option>4학년</option>
                                    </select>
                                </div>
                                <div class="position-relative form-group">
                                    <label for="exampleStudentId" class="">
                                        <b>학번 입력</b>
                                    </label>
                                    <input
                                        name="StudentId"
                                        id="exampleStudentId"
                                        placeholder="ex) 22"
                                        type="number"
                                        class="form-control">
                                </div>
                        </div>
                                <div class="modal-footer clearfix">
                                    <b-button block="block" variant="blue">제출</b-button>
                                </div>
                    </div>
                </div>
            </b-col>
        </div>
    </div>
</template>