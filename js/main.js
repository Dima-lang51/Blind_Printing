"use strict";


const requestAPI = 'https://baconipsum.com/api/?type=meat-and-filler&sentences=6';

let status = function (response) {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.statusText))
  }
  return Promise.resolve(response)
}

let json = function (response) {
  return response.json()
}

fetch(requestAPI) 
  .then(status)
  .then(json)
  .then(data => checkUsersKey(data)) 
  .catch(function (error) {
    console.log('error', error)
  })


let mistakesCounter = 0;

function getChar(event) {
    if (event.which == null) { 
        if (event.keyCode < 32) return null; 
        return String.fromCharCode(event.keyCode)
    }

    if (event.which != 0 && event.charCode != 0) { 
        if (event.which < 32) return null; 
        return String.fromCharCode(event.which); 
    }

    return null; 
}

function checkUsersKey(levelText) {
    levelText = levelText.join('') 
    let textToHtml = '';
    for (let symbol_id in levelText){
      //каждый символ строки оборачиваем в спан и используем в качестве id его индекс в этой строке
      textToHtml += `<span id=${symbol_id}>${levelText[symbol_id]}</span>` 
    }
    document.querySelector('.textRandom').innerHTML = textToHtml;
  
    let currLetterNumber = 0; //счетчик вводимых символов
    let keyName; // то что ввел пользователь
    let start = 0; 
    let end;


    //функция определения скорости печатания
    let timerId = setInterval(() => {
      if (start != 0)  {
      end = Date.now();
       let speed = (currLetterNumber - mistakesCounter) / ((end - start) / 1000 / 60);
      document.querySelector('#speed-number').innerHTML = Math.round(speed);
      }
    }, 1000);


    function enterKeyEvent(event) {
      if (currLetterNumber == 0) {
        start = Date.now();
      }
        keyName = getChar(event);
        // проверка правельности ввода
        if (levelText[currLetterNumber] == keyName) {  
          let elem = document.getElementById(currLetterNumber) 
          elem.style.color = '#20c997';
            currLetterNumber++;
        } else {
            let elem = document.getElementById(currLetterNumber)
            elem.style.color = 'red';
            mistakesCounter++;
            currLetterNumber++;
        }

        //определение точности ввода
        let accuracy = 100 - mistakesCounter / levelText.length * 100;
        document.querySelector('#accuracy-number').innerHTML = accuracy.toFixed(1);
        
          // Делаем проверку, если текущий символ равен длинне символов
        if (currLetterNumber >= levelText.length) {
          setTimeout(() => { clearInterval(timerId); },)
            document.removeEventListener('keypress', enterKeyEvent);
            return;
        }

    }
    // Добавляем обработку события нажатия клавиши на функцию enterKeyEvent
    // Добавляем только один раз, она будет вызывать enterkKeyEvent после каждого нажатия и удержания клавиши
    document.addEventListener("keypress", enterKeyEvent); 
}




//jquery показ текста d cgksdf.otv jryt
 $(function () {
        jQuery('#startButton').click(function () {
          jQuery('#page1').slideUp();
          jQuery('#page2').slideDown();
        });
 });