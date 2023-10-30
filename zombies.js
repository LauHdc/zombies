const container = document.querySelector('.plateau');

const scoreBoard = document.querySelector('.score');

const btnStart = document.querySelector('.btnStart');


let derniereCachette = false;

let gameOver = false;

let score;

btnStart.addEventListener('click',startGame);
    
    function startGame() {
        
        btnStart.style.display = 'none';
        
        creationPlateau();
        
        startZombies();
        
        score = 0;
        
        scoreBoard.innerHTML = score;
        
        scoring();
    
    }

    function startZombies() {
        
        let cachette = randomUp();
        
        let temp = Math.floor(Math.random() * 3) + 1;
        
        
        let tempClass = temp > 1 ? 'up' : 'up2';
        
        cachette.classList.add(tempClass);
        
        const time = Math.round(Math.random()* (1500 - 250) +250);
        
        setTimeout(function() {
            
            cachette.classList.remove(tempClass);
            
            if(!gameOver) startZombies();
            
            },time);
        
        }
            

    function randomUp() {
        
        const cachettes = document.querySelectorAll('.cachette');
        
        const idx = Math.floor(Math.random()* cachettes.length);
        
        if(cachettes[idx].zombieId === derniereCachette) {
            
            return randomUp();
            
        }
        
        derniereCachette = cachettes[idx].zombieId;
        
            return cachettes[idx];
        
    }

    function creationPlateau() {
        
        let cachetteCrees = 9;
        
        container.innerHTML = ' ';
        
        for(let x = 0; x< cachetteCrees; x++) {
            
            let div = document.createElement('div');
            
            div.setAttribute('class','cachette');
            
            div.zombieId = x;
            
            let zombie = document.createElement('div');
            zombie.setAttribute('class','zombie');
            zombie.onclick = tir;
            div.appendChild(zombie);
            
            let lola = document.createElement('div');
            lola.setAttribute('class','lola');
            lola.onclick = tir2;
            div.appendChild(lola);
            
            let mur = document.createElement('div');
            mur.setAttribute('class','mur');
            div.appendChild(mur);
            
            container.appendChild(div);
            
        }
        
    }

    function scoring() {
        
        scoreBoard.innerHTML = "Score : " + score;
        
        let message = score >=10 ? "C'est gagné ! " : "Vous avez perdu, voulez-vous rejouer ?";
        
        if(score >= 10 || score <0) {
            
            gameOver = true;
            btnStart.style.display = 'block';
            
            confirm(message);
            document.location.href = "zombies.html";
            
        }
        
    }
   
    function tir(e) {
        
        score++;
        
        this.parentNode.classList.remove('up');
        scoring();
        
    }

    function tir2() {
        
        score = score -5;
        
        this.parentNode.classList.remove('up2');
        scoring();
        
    }