var button2 = document.querySelector('button') // (맨위에있는) 하나만 가져옴      
    // button2.onclick = append(value) 
        // 파라미터를 포함해서 부르고 싶은데 ()가 있으면 바로 동작하니까 - 파라미터있는 함수를 연결하고 싶을때는 아래와같이 씀
    button2.onclick = function() {
        var input = document.querySelector('input')
        value = input.value
        append(value)
    } // 정의만
    
    append('할일1') //html태그와 동일하게 구현됨
    append('할일2')

    function append(value){
        var target = document.querySelector('ul')
        
        var li = document.createElement('li')
        var button = document.createElement('button') //버튼태그생성 : <button></button>
        // innerHTML : text 타입 
        // outerHTML = <button></button> (태그전체가져옴)
        // button = button.속성 (node타입)

        // button.appendChild("<img src='' alt='삭제'>") //이렇게는 불가능 => 안에 노드만 가능
        button.innerHTML = "<img src='' alt='삭제'>" //생성된 버튼태그안에 <img src='' alt='삭제'>를 text가 아니라 태그로 인식해서 넣어줌 / <button onclick='remove()''><img src='' alt='삭제'></button>
        
        li.innerHTML = "<input type='checkbox'>" + value //+ button 해줘도 안먹음 => innerHTML은 지금까지의 것들 싹 다 리셋하는 거라서
        // 이벤트에 연결(해당)된 것 만 innerHTML밖에서 (appendChild로) 해주면 동작함
        li.appendChild(button) //이게 value + '뒷부분'에 해당
        
        // 1) button.addEventListener('click', function(e){
        //     remove(e)
        // })
        // 2) button.addEventListener('click', remove)
        // 3) button.onclick = function (e) {   //.onclick = function : 콜백함수(이름없음)
        //     remove(e)
        // }
        button.onclick = remove //4) 4가지 다 같은 말!!
            // 함수명을 선언해주는 것 까지 = 해당함수와 연결만 
            // remove() : (괄호)까지 적으면 함수를 바로 호출(진행)
        target.appendChild(li) 
    }

    function remove(e){//js에서는 e와 event 둘다 동일하게 이벤트로 인식
        // var remove = document.getElementById('remove')
        // remove.parentNode.removeChild(remove)
        var li = e.target.parentNode.parentNode
        li.parentNode.removeChild(li)
    }  