/* eslint-disable no-undef */
/* eslint-disable id-length */
(function ($) {
    $('.alert').hide(); // 경고창 숨기기
    /* url의 암호화 값을 찾아 값 유무로 비정상 접근 방지 */
    const urlParams = new URL(window.location.href).searchParams;
    const userKey = urlParams.get('variable');
    // console.log(userKey);
    if (!userKey || (typeof userKey != 'string' || userKey.length != 44)) {
        alert('비정상 접근이예요!');
        history.back();
    }
    const thisYear = new Date() // 올해 년도 뒤 2글자 추출
        .getFullYear()
        .toString()
        .substring(2);
    // console.log(thisYear);

    $('form').submit(async function (e) { // 제출 버튼이 눌렸을 때
        e.preventDefault();
        /* 입력된 이메일, 학년, 학번 값 각각 변수 처리 */
        const email = $('#floatingInput').val();
        const grade = parseInt($('#selectGrade option:selected').val());
        const studentID = $('#floatingNumber').val();
        // console.log(email, grade, studentID);

        if (!email.includes('@sungkyul.ac.kr')) { // 힉교 메일 주소가 아닌 경우
            console.error('increect email address');
            /* 관련 경고창 렌더링 */
            $('.alert-danger').show('fade');
            $('#dangerText').text('이메일 주소를 학교 주소로 입력해주세요.');
            setTimeout(function () {
                $('.alert-danger').hide('fade');
            }, 2000);
        } else if (studentID < parseInt('08') || studentID > thisYear) { // 입력된 학번 값이 08 아래인 경우와 올해 년도보다 큰 값일 경우
            console.error('increect studentID value');

            $('.alert-danger').show('fade');
            $('#dangerText').text('ComgongBOT은 08학번부터 지원해요.');
            setTimeout(function () {
                $('.alert-danger').hide('fade');
            }, 2000);
        } else {
            const check = await firebasePack.checkUser(email); // 가입된 사용자인지 아닌지 판별하는 함수 호출
            // console.log(check);
            if (check) { // 가입되지 않은 사용자라면
                firebasePack.sendLink(email, grade, studentID, userKey); // 인증 링크 관련 이메일 전송 함수 호출
                /* 관련 성공창 렌더링 */
                $('.alert-success').show('fade');
                $('#successText').text('인증 관련 메일을 입력하신 주소로 전송했어요!');
                setTimeout(function () {
                    $('.alert-success').hide('fade');
                }, 3000);
            } else { // 가입되어 있는 사용자라면
                $('.alert-danger').show('fade');
                $('#dangerText').text('이미 가입된 사용자 입니다.');
                setTimeout(function () {
                    $('.alert-danger').hide('fade');
                }, 2000);
            }
        }
    });

})(jQuery);
