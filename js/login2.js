    function session_check() { //세션 검사
        if (sessionStorage.getItem("Session_Storage_test")) {
            alert("이미 로그인 되었습니다.");
            location.href='../login/index_login.html'; // 로그인된 페이지로 이동
        }
    }

    function session_del() {//세션 삭제
        if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
        } else {
        alert ("세션 스토리지 지원 x");
        }
        }

    function logout(){
        session_del(); // 세션 삭제
        location.href='../index.html';
    }

    
    document.getElementById("logout_btn").addEventListener('click', logout);