/* eslint-disable no-undef */
/* eslint-disable id-length */
import {getAuth, sendSignInLinkToEmail} from "firebase/auth";

(function ($) {

    $('form').submit(function (e) {
        e.preventDefault();
        const email = $('#floatingInput').val();
        const grade = parseInt($('#selectGrade option:selected').val());
        const studentID = parseInt($('#floatingNumber').val());
        console.log(email, grade, studentID);

        if (!email.includes('@sungkyul.ac.kr')) {
            console.error('increect email address');
            $('.alert').css('visibility', 'visible');
            $('#textBlank').text('이메일 주소를 학교 주소로 입력해주세요.');
            // alert('이메일 주소를 학교 주소로 입력해주세요.');
        } else if (isNaN(studentID)) {
            console.error('increect studentID value type');
            $('#textBlank').text('학번을 숫자로 입력해주세요.');
            // alert('학번을 숫자로 입력해주세요.');
        } else if (studentID < parseInt('08')) {
            console.error('increect studentID value');
            $('#textBlank').text('컴공봇은 08학번부터 지원해요.');
            // alert('컴공봇은 08학번부터 지원해요.');
        } else {
            const auth = getAuth();
            // console.log(auth);
            sendSignInLinkToEmail(auth, email, {
                url: 'https://comgong-bot.firebaseapp.com',
                handleCodeInApp: true
            })
                .then(() => {
                    // The link was successfully sent. Inform the user. Save the email locally so
                    // you don't need to ask the user for it again if they open the link on the same
                    // device.
                    console.log('gj');
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                });
        }

    });

})(jQuery);
