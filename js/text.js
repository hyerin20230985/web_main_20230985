var jb = 'hi'; // 변수 선언 후 주석 가능(한줄 주석)
var a = 1;
var b;
b = 5;
const search_message = () => {
    const c = '검색을 수행합니다';
    alert(c);
    };
if (true) {
    let c = 'let 접근';
    var c_1 = 'var 접근';
    }
    //console.log(c); // Error?
    console.log(c_1);
    let d = 5;
    //let d = '값 재할당'; // Error?
    console.log(d);
    const e = '상수1 접근';
    //e = 5;
    //const f // Error?
    console.log(e);

document.getElementById("search_btn").addEventListener('click', search_message); 
//최상위 문서 : document 라고 한다.
//getElementById 문서의 특정 id를 가져온다.
//addEventListener로 이벤트를 등록한다.
//click 은 마우스 이벤트의 한 종류
//search_message는 함수이다.
/*function search_message(){
alert("검색을 수행합니다!");
}*/
