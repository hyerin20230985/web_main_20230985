function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수

 
 const idsave_check = document.getElementById('idSaveCheck');

const check_input = () => { 
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const c = '아이디, 패스워드를 체크합니다';
    alert(c);
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    const sanitizedPassword = check_xss(passwordValue);
// check_xss 함수로 비밀번호 Sanitize
    const sanitizedEmail = check_xss(emailValue);
// check_xss 함수로 비밀번호 Sanitize
    if (!sanitizedEmail) {
// Sanitize된 비밀번호 사용
        return false;
    }
    if (!sanitizedPassword) {
// Sanitize된 비밀번호 사용
        return false;
    }   

    
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
   
    if(idsave_check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장 얘가 문제
        alert("쿠키 값 :" + emailValue);
    }
    else{ // 아이디 체크 x
        setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
    }

    session_set();
    loginForm.submit();
    //document.getElementById('login_form').submit();
    };   
    
    function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
        const emailInput = document.getElementById('typeEmailX');
        const idsave_check = document.getElementById('idSaveCheck');
        let get_id = getCookie("id");
        if(get_id) {
            emailInput.value = get_id;
            idsave_check.checked = true;
        }
        session_check(); // 세션 유무 검사
    }

    function init_logined(){
        if(sessionStorage){
            decrypt_text(); // 복호화 함수
        }
        else{
            alert("세션 스토리지 지원 x");
        }
    }

    function decodeByAES256(key, data){
        const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(""),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        return cipher.toString(CryptoJS.enc.Utf8);
    }
    
    function encrypt_text(password){
        const k = "key"; // 클라이언트 키
        const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
        const b = password;
        const eb = this.encodeByAES256(rk, b);
        return eb;
        console.log(eb);
    }

    function decrypt_text(){
        const k = "key"; // 서버의 키
        const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
        const eb = session_get();
        const b = this.decodeByAES256(rk, eb);
        console.log(b);
    }
    
    document.getElementById("login_btn").addEventListener('click', check_input);


    