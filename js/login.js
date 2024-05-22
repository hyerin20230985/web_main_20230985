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

    function setCookie(name, value, expiredays) {
        var date = new Date();
        date.setDate(date.getDate() + expiredays);
        document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/";
    }
    
    function getCookie(name) {
        var cookie = document.cookie;
        console.log("쿠키를 요청합니다.");
        if (cookie != "") {
            var cookie_array = cookie.split("; ");
            for ( var index in cookie_array) {
                var cookie_name = cookie_array[index].split("=");
                if (cookie_name[0] == "id") {
                    return cookie_name[1];
                }
            }   
        }
        return ;
        }
        function closePopup() {
            if (document.getElementById('check_login').value) {
                setCookie("id", "N", 1);
                console.log("쿠키를 설정합니다.");
                self.close();
            }
        }
   
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


    function session_set() { //세션 저장
        let session_id = document.querySelector("#typeEmailX");
        let session_pass = document.querySelector("#typePasswordX"); // DOM 트리에서 pass 검색
        if (sessionStorage) {
            let en_text = encrypt_text(session_pass.value);
            sessionStorage.setItem("Session_Storage_id", session_id.value);
            sessionStorage.setItem("Session_Storage_pass", en_text);
        } 
        else {
            alert("로컬 스토리지 지원 x");
        }
    }

    function session_get() { //세션 읽기
        if (sessionStorage) {
            return sessionStorage.getItem("Session_Storage_pass");
        } 
        else {
            alert("세션 스토리지 지원 x");
        }
    }

    function session_check() { //세션 검사
        if (sessionStorage.getItem("Session_Storage_id")) {
            alert("이미 로그인 되었습니다.");
            location.href='../login/index_login.html'; // 로그인된 페이지로 이동
        }
    }
    
    function encodeByAES256(key, data){
        const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), 
        {
            iv: CryptoJS.enc.Utf8.parse(""),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        return cipher.toString();
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