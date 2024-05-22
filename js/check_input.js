const check_input = () => {
    const idsave_check = document.getElementById('idSaveCheck');
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const c = '아이디, 패스워드를 체크합니다';
    alert(c);
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue === '') {
        alert('이메일을 입력하세요.');
        return false;
    }

    if (passwordValue === '') {
        alert('비밀번호를 입력하세요.');
        return false;
    }

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    if (idsave_check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
    }

    else { // 아이디 체크 x
        setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
    }

    function session_set() {
        let session_id = document.querySelector("#typeEmailX");
        if (sessionStorage) {
            sessionStorage.setItem("Session_Storage_test", session_id.value);
        }
        else {
            alert("로컬 스토리지 지원 x");
        }
    }

    function session_get() {
        if (sessionStorage) {
            return sessionStorage.getItem("Session_Storage_test");
        }
        else {
            alert("세션 스토리지 지원 x");
        }
    }

    session_set(); // 세션 생성
    loginForm.submit();
    //document.getElementById('login_form').submit();
};
