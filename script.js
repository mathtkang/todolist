var data
var addButton = document.querySelector('button') 
getData()
// 호출 순서 : getData() -> addButtonClick()
// 저장소에 파일을 새로운 폴더에 다 내려받기 -> 작업했던 파일로 교체 -> 다시 저장소에 올리기
// 할일 추가
addButton.onclick = function() {
    var input = document.querySelector('input')
    // data[0] : 지금 data라는 arr가 존재하는 거임!
    if(input.value == ''){ 
        alert('할일을 입력하세요.')
        return
    }
    data.push({ // data[data.length-1].title.push(input.value) / 이건 안됨 배열의 형태와 맞지 않음
        "userId": 1,
        "id": data.length-1,
        "title":input.value,
        "completed": false
    })
    append(data[data.length-1]) // data[data.length-1]를 append 함수에 가서 todo로 받는거임!
}
// var arr = ['할일1','할일2','할일3']
// 배열에 요소들은 객체로 들어감
// 객체는 할일, 아이디, 완료여부로 구성되어 있음
    // 객체의 속성 == id : 1, title : '밥먹기', completed : false
    // 객체 == {},{}
    // 배열 == []

// 투두리스트 태그 생성
function append(todo){ // todo.title, todo.complted / event가 발생하는 [] == todo
    // li, checkbox 만드는 곳
    // 만든 li에다가 클래스를 적용
    var ul = document.querySelector('ul')
    var li = document.createElement('li')
    var button = document.createElement('button')
    var input = document.createElement('input')
    var v = document.createTextNode(todo.title)

    input.type = "checkbox"
    button.innerHTML = "<i class='fas fa-trash-alt'></i>"

    li.appendChild(input)
    li.appendChild(v)
    li.appendChild(button)

    if(todo.completed == true){
        li.classList.add('completed')
        input.checked = true
    }
    input.onclick = checked
    
    button.onclick = remove
    ul.appendChild(li)
}

// 삭제버튼 클릭시, li태그를 지우는 함수
function remove(e){ 
    var removeli = event.target.parentNode.parentNode
    removeli.parentNode.removeChild(removeli)
}

// 할일 완료 여부 표시
function checked(e){
    e.target.parentNode.classList.toggle('completed')
}

// 할일 데이터 가져오기
function getData(){
    var httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = responseFunction
    httpRequest.open('GET', 'https://jsonplaceholder.typicode.com/todos?userId=1', true) // true: 비동기, flase: 동기
    httpRequest.send()

    function responseFunction() {
        if(httpRequest.readyState === XMLHttpRequest.DONE) {
            if(httpRequest.status === 200) { // 200: 이상없음 404: 없는주소
                // alert('이상없음')
                //JSON.parse : 배열로 바꿔주는 함수
                data = JSON.parse(httpRequest.responseText) //httpRequest.responseText 이 친구를 data라는 배열로 바꾼 상태
                for(i=0; i<data.length; i++){
                    append(data[i])
                }
            }else{
                alert('에러발생')
            }
        }
    }
}
