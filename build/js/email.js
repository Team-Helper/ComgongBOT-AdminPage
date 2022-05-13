/* eslint-disable no-undef */
/* eslint-disable id-length */
(function ($) {

    $('form').submit(function (e) {
        e.preventDefault();
        const email = $('#floatingInput')
            .val()
            .includes('@sungkyul.ac.kr');
        const grade = parseInt($('#selectGrade option:selected').val());
        const studentID = parseInt($('#floatingNumber').val());
        // console.log(email, grade, studentID);

        if (!email) {
            console.error('increect email address');
            alert('이메일 주소를 학교 주소로 입력해주세요.');
        } else if (isNaN(studentID)) {
            console.error('increect studentID value type');
            alert('학번을 숫자로 입력해주세요.');
        } else if (studentID < 08) {
            console.error('increect studentID value');
            alert('컴공봇은 08학번부터 지원해요.');
        } else {
            alert('성공!')
        }

    });

})(jQuery);
