document.addEventListener("DOMContentLoaded", function(event){
    
    var game0 = [4,7,8,2,9,6,0,1,3,2,6,5,1,3,7,4,9,8,9,1,3,8,4,5,2,6,7,7,9,4,3,0,1,6,5,2,3,5,1,6,2,9,7,8,4,6,8,
    2,5,7,4,9,3,1,1,4,9,7,6,8,0,2,5,5,3,6,4,1,2,8,7,9,8,2,7,9,5,3,1,4,6];
    var game1 = [7,8,2,6,5,3,4,1,9,4,3,9,2,7,1,5,8,6,6,1,5,0,9,4,3,7,2,5,7,3,9,1,2,6,4,8,1,9,8,4,3,6,2,5,7,2,4,
    6,5,8,7,9,3,1,8,0,4,0,6,5,1,9,3,3,6,7,1,4,9,8,2,5,9,5,1,3,2,8,7,6,4];
    var game2 = [0,5,3,0,0,7,0,0,0,4,8,0,0,5,3,7,0,0,0,0,2,1,0,4,3,5,0,2,0,7,9,0,0,0,0,0,8,0,0,7,0,5,0,0,6,0,0,
    0,0,0,6,1,0,7,0,4,6,3,0,9,2,0,0,0,0,9,4,7,0,0,6,1,0,0,0,5,0,0,4,3,0];
    // variabile structura html
    var container = document.createElement("div");
    var header = document.createElement("header");
    var h1 = document.createElement("h1");
    var section = document.createElement("section");
    var infoText = document.createElement("div");
    var gameArea = document.createElement("div");
    var divBtn = document.createElement("div");
    var divBtnInt = document.createElement("div");
    var okBtn = document.createElement("button");
    var newGame = document.createElement("button");
    var inputList = document.getElementsByTagName("input");
    var body = document.querySelector("body");
    var successDiv = document.createElement("div");
    
    window.onload = function(){
        // creare structura html
        body.appendChild(container);
        container.setAttribute("id", "container")
        container.appendChild(header);
        header.appendChild(h1);
        h1.innerText = "Sudoku"
        container.appendChild(section);
        section.appendChild(infoText);
        infoText.setAttribute("id", "info")
        section.appendChild(gameArea);
        gameArea.setAttribute("id", "gameArea")
        section.appendChild(divBtn);
        divBtn.appendChild(divBtnInt);
        divBtnInt.appendChild(okBtn);
        okBtn.innerText = "Am Terminat";
        okBtn.setAttribute("id", "okBtn")
        divBtnInt.appendChild(newGame);
        newGame.innerText = "Joc Nou";
        newGame.setAttribute("id", "newGame")
        for (var i = 0; i < 81; i++){
            gameArea.appendChild(document.createElement("input"));
        }
        // alegere nivel
    
        var random = 3;
        do{
            random = Math.floor(Math.random()*10);
        } while (random > 2);
        // completare imputuri in functie de variabila random 
        for(var i = 0; i < 81; i++){
            if(random == 0){
                if(game0[i] == 0){
                    inputList[i].value = "";
                } else {
                    inputList[i].value = game0[i];}
            } else if ( random == 1){
                if ( game1[i] == 0){
                    inputList[i].value = "";
                } else{
                    inputList[i].value = game1[i];
                }
            } else {
                if(game2[i] == 0){
                    inputList[i].value = "";
                } else {
                    inputList[i].value = game2[i];
                }
            }

        }
        // adaugare read only pentru a nu se putea modifica valorile precompletate 
        for ( var i = 0; i < inputList.length; i++){
            if(inputList[i].value.length == 1){
                inputList[i].readOnly = true;
            }
            // limitare input la o singura litera/cifra
            inputList[i].setAttribute("maxlength", "1");
            if(inputList[i].value.length == 0){
                inputList[i].setAttribute("class", "empty");
            }
        }
        // mesaj catre jucator cu ce nivel joaca
        infoText.innerText = "Joci jocul " + random + " din 2";
        for ( var i = 0; i <inputList.length; i++){
            // verificare daca in input s-a introdus o litera sau o cifra
            inputList[i].addEventListener("keyup", listen);
            function listen(){
                if(isNaN(parseInt(this.value))){
                    infoText.innerText = "Te rugam sa introduci doar cifre in casute";
                    this.value = "";
                }
            }
            // schimbare background pentru toate inputurile care au aceiasi valoare
            inputList[i].addEventListener("click", function(e){
                var hItem = this.value
                for(var j = 0; j <inputList.length; j++){
                    if(hItem == inputList[j].value && inputList[j].value.length != 0){
                        inputList[j].classList.add("hover");
                    }
                }
            })
            // revenire la default 
            inputList[i].addEventListener("mouseout", function(e){
                for(var k = 0; k <inputList.length; k++){
                    if(inputList[k].hasAttribute("class") == true){
                        inputList[k].classList.remove("hover");
                    }
                }
            })
        }
    };
    // joc nou 
    newGame.addEventListener("click", function(e){
        location.reload(true);
    });
    // verificare daca este bine completat
    okBtn.addEventListener("click", function(e){
        // verifica daca sunt coloabe goale
        for( var i = 0; i < inputList.length; i++){
            if(inputList[i].value.length == 0){
                infoText.innerText = "Nu toate casutele sunt completate";
                return
            } 
        }
        // verifica daca s-a completet corect pe orizontala
        var mult = 1;
        var count = 0;
        for( var a = 0; a < inputList.length; a++){
            count++
            for ( var b = a +1; b < 9*mult; b++){
                if(inputList[a].value == inputList[b].value){
                    infoText.innerText = "Jocul nu a fost completat corect";
                    return
                }         
            }
            if(count == 8*mult){
                a++ 
                mult++
            }
        }
        // verificare pe verticala
        // creare array nou din input list
        var newInputList = [];
        var counter = 0;
        var runner = 0;
        var pusher = 9;
        for ( var i = 0; i <inputList.length; i++){
            counter++
            if(counter == 1){
                newInputList.push(parseInt(inputList[runner].value));     
            } else if (counter != 0){
                newInputList.push(parseInt(inputList[pusher].value));
                pusher +=9;
            }
            if(counter == 9){
                counter = 0;
                runner++
                pusher = runner + 9;
            }
        }
        // verificare array nou
        var newMult = 1;
        var newCount = 0;
        for( var c = 0; c <= newInputList.length; c++){
            newCount++
            for ( var d = c+1; d < 9*newMult; d++){
                if(newInputList[c].value == newInputList[d]){
                    infoText.innerText = "Jocul nu a fost completat corect";
                    return
                }         
            }
            if(newCount == 8*newMult){
                c++ 
                newCount++
            }
            if(c == newInputList.length){
                section.replaceChild(successDiv, gameArea);
                successDiv.setAttribute("id", "success");
                successDiv.innerText = "Bravo";
                infoText.innerText = "";
            }
        }
    });
});
   