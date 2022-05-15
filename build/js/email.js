/* eslint-disable no-undef */
/* eslint-disable id-length */
(function ($) {

    $('form').submit(function (e) {
        e.preventDefault();
        const email = $('#floatingInput').val();
        const grade = parseInt($('#selectGrade option:selected').val());
        const studentID = parseInt($('#floatingNumber').val());
        const visibleState = $('.alert').css('visibility');
        // console.log(email, grade, studentID);

        if (!email.includes('@sungkyul.ac.kr')) {
            console.error('increect email address');
            if (visibleState == "hidden") {
                $('.alert').css('visibility', 'visible');
            }
            $('#textBlank').text('이메일 주소를 학교 주소로 입력해주세요.');
            // alert('이메일 주소를 학교 주소로 입력해주세요.');
        } else if (isNaN(studentID)) {
            console.error('increect studentID value type');
            if (visibleState == "hidden") {
                $('.alert').css('visibility', 'visible');
            }
            $('#textBlank').text('학번을 숫자로 입력해주세요.');
            // alert('학번을 숫자로 입력해주세요.');
        } else if (studentID < parseInt('08')) {
            console.error('increect studentID value');
            if (visibleState == "hidden") {
                $('.alert').css('visibility', 'visible');
            }
            $('#textBlank').text('컴공봇은 08학번부터 지원해요.');
            // alert('컴공봇은 08학번부터 지원해요.');
        } else {
            firebasePack.sendLink(email);
        }
    });

})(jQuery);
