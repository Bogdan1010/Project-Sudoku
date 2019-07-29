document.addEventListener("DOMContentLoaded", function(event){
    // creare variabile pentru element
    var firstDiv = document.createElement("div");
    var container = document.createElement("div");
    var firstP = document.createElement("p");
    var secondP = document.createElement("p");
    var startBtn = document.createElement("button");
    var body = document.querySelector("body");
    // adaugare elemente pe ecran
    window.onload = function(){
        body.appendChild(container);
        container.appendChild(firstDiv);
        firstDiv.setAttribute("id", "firstDiv");
        firstDiv.appendChild(firstP);
        firstP.innerText = "Bine ati venit"
        firstDiv.appendChild(secondP);
        secondP.innerText = "Apasati butonul 'Start' pentru a incepe";
        firstDiv.appendChild(startBtn);
        startBtn.innerText= "start";
        startBtn.setAttribute("id", "startBtn")
    }
    // start joc schimbare pagina ( noul link creat in acest fel pentru a merge indiferent de folderul 
    // unde este salvat )
    startBtn.addEventListener("click", function(){
        var currentURL = window.location.href
        var intURL1 = currentURL.split("/");
        var srtLength = intURL1.length
        var intURL2 = intURL1.slice(0,srtLength-1);
        var newPage = "game.html";
        var concatUrl = intURL2.concat(newPage);
        var newURL = concatUrl.join("/");
        firstDiv.parentElement.remove(firstDiv);
        location.replace(newURL);
    });


});