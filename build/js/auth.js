/* eslint-disable no-undef */
/* eslint-disable id-length */
(async function ($) {
    $('#spinner').addClass('show');
    const urlParams = new URL(window.location.href).searchParams;
    const apiKey = urlParams.get('apiKey');
    // console.log(apiKey, typeof apiKey, apiKey.length);
    if (!apiKey || typeof apiKey != 'string') {
        alert('비정상 접근이예요!');
        history.back();
    }
    const authResult = await firebasePack.createAccount(); // auth 생성 함수 호출
    // console.log(authResult);
    if (authResult) {
        $('#spinner').removeClass('show');
        $('.display-2').text('메일 인증 완료!');
        $('.display-6').text('이제 ComgongBOT 이용이 가능합니다.');
    } else {
        $('#spinner').removeClass('show');
        $('.display-2').text('메일 인증 실패...');
        $('.display-6').text('빠른 수정을 위해 개발자에게 보고해주세요.');
    }
})(jQuery);
