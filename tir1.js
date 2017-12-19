var words = {
            rabbit: "ʹрэбит-кролик",
            rhinoceros: "райʹнос(э)рэс-носорог",
            cow: "кау-корова",
            elephant: "ʹэлифэнт-слон",
            horse: "хо:с-лошадь",
            dog: "дог-собака",
            seal: "си:л-тюлень",
            pig: "пиг-свинья",
            monkey: "ʹманки-обезьяна",
            tiger: "ʹтайгэ-тигр",
            fox: "фокс-лиса",
            wolf: "вулф-волк"
        };
       // function getWorws() {
          var wordsEng = [],        
             wordsRu = [];
             for (engWords in words){
            wordsEng.push(engWords);
            wordsRu.push(words[engWords].split('-')[1]);
             }
        //}
        
var button = document.getElementById('startGame');
    var tirDOMTpl = [
        
        '<style>',
        '{',
        'box-sizing: border-box;',
        '}',     
        '#game {',
        'width: 100%;',
        'height: 400px;',
        
        '}',
        
        '#container {',
        'display: inline-block;',
        'position: relative;',
        'width:100%; ',
        'height: 100%;',
        'z-index: 0;',
        '}',
        
        '.rowA {',
        'position: relative;',
        'width: 100%;',
        'height: 151px;',
        'background-color: rgba(45, 76, 143, 0.7);',
        'border: 2px solid black;',
        'z-index: 0;',
        '}',
        '#target {',
        'position: absolute;',
        'left: -15%;',
        'width: 20%;',
        'height: 100%;',
        'cursor: url(/resources/image/cursors/74.svg), pointer;',
        'z-index: 0;',
        '}',
        '</style>',
        '<div id="game">',
        '<div id="сontainer">',
        '<div id="row 1" class="rowA"></div>',
        '<div id="row 2" class="rowA"></div>',
        '<div id="row 3" class="rowA"></div>',
        '</div>',
        '</div>'
    ];
//====замена ДОМ===
var boxContainer = document.getElementById('boxContainer');
    boxContainer.innerHTML = '';
    boxContainer.innerHTML = tirDOMTpl.join('');
//=================

var level = document.getElementById('difficultyLevel');
    var levelName;
    var selectedLevel
    level.onclick = function setLevelTimes(e) {
        if (e.target.classList.contains('level')) {
            levelName = e.target.innerText;
            highlight(e.target);
           //e.target.style.backgroundColor = 'green';
            return levelName;
        }
    }
    function highlight(node) {
      if (selectedLevel) {
        selectedLevel.style.backgroundColor = '';
      }
      selectedLevel = node;
      selectedLevel.style.backgroundColor = 'yellow';
    }

//function tirOnly() {
    var rowList = [
        document.getElementById("row 1"),
        document.getElementById("row 2"),
        document.getElementById("row 3")
    ];

    var elScore = document.getElementById("pointParagraf"),
        elTime = document.getElementById('timer_inp'),
        rowSize = Number(window.getComputedStyle(rowList[0], null).width.slice(0, -2));

    var playCurrent = true,
        speedCurrent = 1.5,
        timeCurrent = 10,
        scoreCurrent = 0;

    var valueCurrent = clearValue(true, speedCurrent, timeCurrent, scoreCurrent);

    function clearValue(playCurrent, speedCurrent, timeCurrent, scoreCurrent) {
        var cleanValue = {};

        cleanValue.play = playCurrent;
        cleanValue.speed = speedCurrent;
        cleanValue.time = timeCurrent;
        cleanValue.score = scoreCurrent;


        return cleanValue;
    }

var levelSpeed = [4.5, 1.5, 2.5];
    var levelTime = [20, 40, 30];
    var numBlocks;
    function startTir() {

        playCurrent = valueCurrent.play,
        speedCurrent = levelName == 'Guru Hard' ? levelSpeed[0] :
            levelName == 'Guru Low'? levelSpeed[1] :
                levelName == 'Guru Middle' ? levelSpeed[2] : levelSpeed[1];
            //valueCurrent.speed,
        timeCurrent = levelName == 'Guru Hard' ? levelTime[0] :
                      levelName == 'Guru Low'? levelTime[1] :
                      levelName == 'Guru Middle' ? levelTime[2] : levelTime[2];
        //valueCurrent.time,
        scoreCurrent = valueCurrent.score;

        elTime.innerHTML = (timeCurrent);
        elScore.innerHTML = (scoreCurrent);
        numBlocks = levelName == 'Guru Hard' ? 6 :
                        levelName == 'Guru Low'? 4 :
                        levelName == 'Guru Middle' ? 5 : 4;
        var timer = setTimeout(function tick() {
            if (playCurrent == false) {
                clearInterval(timer);
                return;
            }

            timeCurrent -= 1;
            elTime.innerHTML = (timeCurrent);
            elScore.innerHTML = (scoreCurrent);

            if (timeCurrent <= 0) {
                endGame();
                startDemo();
                return;
            }

            if (timeCurrent % 5 == 0) {
                speedCurrent += 0.25;
            }
            timer = setTimeout(tick, 1000);
        }, 1000);

        createTarget(true);
      console.log('startGame');
    }

    function endGame() {
        playCurrent = false;
        rowList.forEach(function (item, i, rowList) {
            while (item.firstChild) item.removeChild(item.firstChild);
        })
        button.classList.remove('play');
    }

    function createTarget(numberRow) {
        var rabbitBox = [
            '<style>',
            '.box {',
            'cursor: url(resources/image/cursors/74.svg), pointer;',
            '}',
            '</style>',
            '<img src="resources/image/rabit.png" alt="" class="rabit hidden-xs">',
            '<div class="box">',
            '<p class="paragrOne" id="targetOne" >Are</p>',
            '<p class="transcriptionOnRus">You</p>',
            '<p class="paragrTwo">Ready?</p>'
        ];

        var target = document.createElement('div');
        target.id = "target";
        target.innerHTML = rabbitBox.join('');
        target.style.width = 95 / numBlocks  + '%';
        if (playCurrent == true) {
            if (numberRow === true) {
                for (numberRow = 0; numberRow < rowList.length; numberRow++) {
                    targetCreateClone(target, numberRow);
                }
            } else {
                targetCreateClone(target, numberRow);
            }
        }
    }

    function targetCreateClone(target, numberRow) {
        var id = getRandomId();
        var idEng = id[0];
        id.sort();
        var idRu = id[0];

        var targetMove;

    target.lastElementChild.firstChild.innerHTML = wordsEng[idEng];
    target.lastElementChild.children[1].innerHTML = '*';
    target.lastElementChild.lastChild.innerHTML = wordsRu[idRu];
    target.className = (idEng == idRu) ? "correct" : "wrong";



        targetMove = target.cloneNode(true);
        rowList[numberRow].appendChild(targetMove);

        if (numberRow != 0 && numberRow % 2 != 0) {
            targetMove.style.left = "inherit";
            targetMove.style.right = "-15%";
        }

        move(targetMove, numberRow);
      
    }

    function getRandomId() {
        var max = wordsEng.length - 1,
            min = 0,
            id = [];

        for (var a = 0; a < 3; a++) {
            id.push(Math.floor(Math.random() * max - min + 1) + min);
        }
        return id;
    }

    function move(targetAlone, numberRow) {
        var distance = 0;

        var left = Number(getComputedStyle(targetAlone, null).left.slice(0, -2)),
            right = Number(getComputedStyle(targetAlone, null).right.slice(0, -2)),
            width = Number(getComputedStyle(targetAlone, null).width.slice(0, -2));

        setInterval(function () {
            distance += speedCurrent;
            if (distance >= rowSize / numBlocks && (left <= rowSize / numBlocks || right <= rowSize / numBlocks)) {
                distance = 0;
                createTarget(numberRow);
            }

            if (numberRow == 0 || numberRow % 2 == 0) {
                if (left >= rowSize) {
                    targetAlone.remove();
                } else {
                    left += speedCurrent;
                    targetAlone.style.left = left + "px";
                }
            } else {
                if (right >= rowSize) {
                    targetAlone.remove();
                } else {
                    right += speedCurrent;
                    targetAlone.style.right = right + "px";
                }
            }
        }, 16);
    }

    boxContainer.onclick = function (element) {
        var targetClick = element.target;
        while (targetClick != this) {
            if (targetClick.className == "correct") {
                scoreCurrent += 1;
                elScore.innerHTML = (scoreCurrent);
                targetClick.lastElementChild.style.backgroundColor = 'green';
                setTimeout(function () {
                    targetClick.remove();
                  }, 200);

                
                return;
            } else if (targetClick.className == "wrong") {
                scoreCurrent -= 1;
                elScore.innerHTML = (scoreCurrent);
                targetClick.lastElementChild.style.backgroundColor = 'red';
                setTimeout(function () {
                    targetClick.remove();
                }, 200);

                //console.log(element.target);
                return;
            }
            targetClick = targetClick.parentNode;
        }
    }
    //startTir();
//}

/*==============================ДЕМО====================*/
    function startDemo() {

        playCurrent = false;//valueCurrent.play;
        speedCurrent = 4;
        createTargetDemo(true);
        console.log('demo');
    }

    function endDemo() {
        playCurrent = true;
        rowList.forEach(function (item, i, rowList) {
            while (item.firstChild) item.removeChild(item.firstChild);
        })
        button.classList.remove('demo');
        console.log('endDemo');
    }

    function createTargetDemo(numberRow) {
        var rabbitBox = [
            '<style>',
            '.box {',
            'cursor: url(resources/image/cursors/74.svg), pointer;',
            '}',
            '</style>',
            '<img src="resources/image/rabit.png" alt="" class="rabit hidden-xs">',
            '<div class="box">',
            '<p class="paragrOne" id="targetOne" >Are</p>',
            '<p class="transcriptionOnRus">You</p>',
            '<p class="paragrTwo">Ready?</p>'
        ];

        var target = document.createElement('div');
        target.id = "target";
        target.innerHTML = rabbitBox.join('');
        if (playCurrent == false) {
            if (numberRow === true) {
                for (numberRow = 0; numberRow < rowList.length; numberRow++) {
                    targetCreateCloneDemo(target, numberRow);
                }
            } else {
                targetCreateCloneDemo(target, numberRow);
            }
        }

    }

    function targetCreateCloneDemo(target, numberRow) {

        var targetMove;

        targetMove = target.cloneNode(true);
        rowList[numberRow].appendChild(targetMove);

        if (numberRow != 0 && numberRow % 2 != 0) {
            targetMove.style.left = "inherit";
            targetMove.style.right = "-15%";
        }

        moveDemo(targetMove, numberRow);

    }

    function moveDemo(targetAlone, numberRow) {
        var distance = 0;

        var left = Number(getComputedStyle(targetAlone, null).left.slice(0, -2)),
            right = Number(getComputedStyle(targetAlone, null).right.slice(0, -2)),
            width = Number(getComputedStyle(targetAlone, null).width.slice(0, -2));

        setInterval(function () {
            distance += speedCurrent;
            if (distance >= rowSize / 4 && (left <= rowSize / 4 || right <= rowSize / 4)) {
                distance = 0;
                createTargetDemo(numberRow);
            }

            if (numberRow == 0 || numberRow % 2 == 0) {
                if (left >= rowSize) {
                    targetAlone.remove();
                } else {
                    left += speedCurrent;
                    targetAlone.style.left = left + "px";
                }
            } else {
                if (right >= rowSize) {
                    targetAlone.remove();
                } else {
                    right += speedCurrent;
                    targetAlone.style.right = right + "px";
                }
            }
        }, 16);

    }

    
    //endGame();
    startDemo();



/*=========================запуск игры======================*/
    

var newGame = document.getElementById('newGame');

newGame.onclick = function () {
    //var $this = $(this);

    button.setAttribute('disabled', true);

    // разблокировка
    setTimeout(function() {
        button.removeAttribute('disabled');
    }, 3000);
    if(!playCurrent) return;// playCurrent = false;
        endGame();
        startDemo();

}

startGame.onclick = function () {
    //var $this = $(this);

    newGame.setAttribute('disabled', true);

    // разблокировка
    setTimeout(function() {
        newGame.removeAttribute('disabled');
    }, 3000);
    if(playCurrent) return;
        endDemo();
        //getWords();
        startTir();
}