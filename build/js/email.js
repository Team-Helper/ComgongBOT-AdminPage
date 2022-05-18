/* eslint-disable no-undef */
/* eslint-disable id-length */
(function ($) {
    $('.alert').hide();

    $('form').submit(function (e) { // 제출 버튼이 눌렸을 때
        e.preventDefault();
        /* 입력된 이메일, 학년, 학번 값 각각 변수 처리 */
        const email = $('#floatingInput').val();
        const grade = parseInt($('#selectGrade option:selected').val());
        const studentID = $('#floatingNumber').val();
        // console.log(email, grade, studentID);

        if (!email.includes('@sungkyul.ac.kr')) { // 힉교 메일 주소가 아닌 경우
            console.error('increect email address');

            $('.alert-danger').show('fade');
            $('#dangerText').text('이메일 주소를 학교 주소로 입력해주세요.');
            setTimeout(function () {
                $('.alert-danger').hide('fade');
            }, 1500);
        } else if (studentID < parseInt('08')) { // 입력된 학번 값이 08 아래인 경우
            console.error('increect studentID value');

            $('.alert-danger').show('fade');
            $('#dangerText').text('ComgongBOT은 08학번부터 지원해요.');
            setTimeout(function () {
                $('.alert-danger').hide('fade');
            }, 1500);
        } else {
            const urlParams = new URL(window.location.href).searchParams;
            const userKey = urlParams.get('variable');
            // console.log(userKey);
            firebasePack.sendLink(email); // 인증 링크 관련 이메일 전송 함수 호출
            const user = {
                'Data': {
                    'email': email,
                    'grade': grade,
                    'studentID': studentID,
                    'userKey': userKey
                }
            };
            window
                .localStorage
                .setItem('userAbout', JSON.stringify(user)); // 로컬 스토리지에 사용자 입력 정보 저장

            $('.alert-success').show('fade');
            $('#successText').text('인증 관련 메일을 입력하신 주소로 전송했어요!');
            setTimeout(function () {
                $('.alert-success').hide('fade');
            }, 3000);
        }
    });

})(jQuery);
