var data
var addButton = document.querySelector('button') 
getData()
// 호출 순서 : getData() -> addButtonClick()
// 저장소에 파일을 새로운 폴더에 다 내려받기 -> 작업했던 파일로 교체 -> 다시 저장소에 올리기

// 할일 추가
addButton.onclick = function() {
    var input = document.querySelector('input')
    if(input.value == ''){ 
        alert('할일을 입력하세요.')
        return
    }

    //C : 추가
    var title = input.value 
    fetch(`http://localhost:3000/todo/insert/${title}`)
    .then(res => res.json()) // 서버에서 받은 jsonData를 자바스크립트 객체로 변환
    .then(() => {
        // data.push({title})
        // append(data[data.length-1])
        getData()
    })
    .catch(() => alert('에러발생'))
}

// 투두리스트 태그 생성
function append(todo){ // todo.title, todo.complted / event가 발생하는 [] == todo
    var ul = document.querySelector('ul')
    var li = document.createElement('li')
    li.id = todo.id
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
    //D
    var id = event.target.parentNode.parentNode.id
    console.log(id)
    fetch(`http://localhost:3000/todo/delete/${id}`) // '휴지통 클릭한 (할 일의) 아이디'를 주소로 전달
    .then(res => res.json())
    .then(() => {
        getData()
    })
    .catch(() => alert('에러발생'))
}

// 할일 완료 여부 표시
function checked(e){
    // U : 수정
    var id = event.target.parentNode.id
    var completed = event.target.checked ? 1 : 0
    fetch(`http://localhost:3000/todo/update/${id}/${completed}`)
    .then(res => res.json())    
    .then(() => {
        // 체크박스 선택 시(할일 완료 여부)
        // e.target.parentNode.classList.toggle('completed') // 필요없음 - 새로가져온 getData()에서 클래스입혀줌
        getData()
    })
    .catch(() => alert('에러발생'))
}

// 할일 데이터 가져오기 : R
function getData(){
    document.querySelector('ul').innerHTML = ''    //기존에 있던 리스트를 지우기
    fetch('http://localhost:3000/todo')
    .then(res => res.json())
    .then(jsonData => {
        data = jsonData
        for(i=0; i<data.length; i++){
            append(data[i])
        }
    })
    .catch(err => alert('에러발생'))
}