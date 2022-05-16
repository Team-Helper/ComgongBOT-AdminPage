/* eslint-disable no-undef */
/* eslint-disable id-length */
(function ($) {
    $('.alert').hide();

    $('form').submit(function (e) {
        e.preventDefault();
        const email = $('#floatingInput').val();
        const grade = parseInt($('#selectGrade option:selected').val());
        const studentID = $('#floatingNumber').val();
        // console.log(email, grade, studentID);

        if (!email.includes('@sungkyul.ac.kr')) {
            console.error('increect email address');
            $('.alert-danger').show('fade');
            $('#dangerText').text('이메일 주소를 학교 주소로 입력해주세요.');
            setTimeout(function () {
                $('.alert-danger').hide('fade');
            }, 1500);
        } else if (studentID < parseInt('08')) {
            console.error('increect studentID value');
            $('.alert-danger').show('fade');
            $('#dangerText').text('ComgongBOT은 08학번부터 지원해요.');
            setTimeout(function () {
                $('.alert-danger').hide('fade');
            }, 1500);
        } else {
            firebasePack.sendLink(email);
            const user = {
                'email': email,
                'grade': grade,
                'studentID': studentID
            };
            window
                .localStorage
                .setItem('user', JSON.stringify(user));
            $('.alert-success').show('fade');
            $('#successText').text('인증 관련 메일을 입력하신 주소로 전송했어요!');
            setTimeout(function () {
                $('.alert-success').hide('fade');
            }, 3000);
        }
    });

})(jQuery);
