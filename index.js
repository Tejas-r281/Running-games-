const Score = document.querySelector('.score')
const carGame = document.querySelector('.carGame')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')
const date=document.querySelector('.date');
let key = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }
let player = { speed : 5, score:0};
const keyDown = (e) => {
    // console.log(e)
    e.preventDefault();
    // console.log(e.key);
    key[e.key] = true;
    // console.log(key);
}
const keyUp = (e) => {
    e.preventDefault();
    // console.log(e.key);
    key[e.key] = false;
   
}

 const dates= new Date().toLocaleTimeString();
 const dates1= new Date().toLocaleDateString();
 date.innerHTML=`${dates1} and ${dates}`


const start = () => {
    player.start = true;
    player.score=0;
    // gameArea.classList.remove('hide')
    gameArea.innerHTML= "";
    startScreen.classList.add('hide')
    const game = document.createElement('div');
   
    game.setAttribute('class', 'car');
    
    gameArea.appendChild(game);
   
    // console.log(game.offsetTop);
    // console.log(game.offsetLeft)
    player.x = game.offsetLeft;
    player.y = game.offsetTop;
     
     let road = gameArea.getBoundingClientRect();
    //  console.log(road);
     for(x=0;x<5;x++)
     {
        const roadline=document.createElement('div');
        roadline.setAttribute('class','line');
        roadline.y=(x*150)
        roadline.style.top= roadline.y + "px";
        gameArea.appendChild(roadline);
     }
     for(x=0;x<3;x++)
     {
        const enemycar=document.createElement('div');
        enemycar.setAttribute('class','enemy');
        enemycar.y=((x)*350);
        enemycar.style.top= enemycar.y + "px";
        enemycar.style.backgroundColor=randomcolor();
        enemycar.style.left=Math.floor(Math.random()*350) + "px";
        gameArea.appendChild(enemycar);
     }
     window.requestAnimationFrame(gameplay);
}
const movelines=()=>{
    let lines= document.querySelectorAll('.line')
    lines.forEach((item)=>{
        if(item.y>=640)
        {
            item.y -=700;
        }
        item.y +=player.speed;
        
       item.style.top=item.y + "px";
    })
 }
 const iscollide=(a,b)=>{
     aRect =a.getBoundingClientRect();
     bRect= b.getBoundingClientRect();

     return !((aRect.bottom<bRect.top) || (aRect.top > bRect.bottom) || 
     (aRect.right <bRect.left) || (aRect.left > bRect.right))
 }
 const endgame=()=>{
     player.start=false;
    //  player.score=0;
     startScreen.classList.remove('hide')
     startScreen.innerHTML= `Game over <br> Your final score is = ${player.score} <br>  press here to restart the Game .`;
     startScreen.style.backgroundColor="green";
 }
 const moveenemy=(car)=>{
    let enemies= document.querySelectorAll('.enemy')
    enemies.forEach((item)=>{

        if(iscollide(car,item))
        {
            console.log("Boom Hit");
            // player.score=0;
            endgame();
        }
        if(item.y>=600)
        {
            item.y =-300;
            item.style.left=Math.floor(Math.random()*340) + "px";
        }
        
        item.y +=player.speed;
        
       item.style.top=item.y + "px"; 
    })
 }
const gameplay = () => {
    // console.log('hey i am clicked ');
    let car = document.querySelector('.car');
  
      movelines();
      moveenemy(car);
   
        if (player.start)
    {
        if(key.ArrowUp && player.y>100)
        {
        player.y -= player.speed;
        }
        if(key.ArrowDown && player.y<550)
        {
        player.y += player.speed;
        }
        if(key.ArrowLeft && player.x>5)
        {
        player.x -= player.speed;
        }
        if(key.ArrowRight && player.x<325)
        {
        player.x += player.speed;
        }
    //    console.log(key)
        car.style.top= player.y +"px";
        car.style.left= player.x +"px";
        // console.log(player.y);
        // console.log(player.x);

          window.requestAnimationFrame(gameplay);
          player.score++;
          Score.innerText=` ${dates1} and ${dates} 
           The score of the player := ${player.score} `;
    }
}
function randomcolor(){
    function c(){
        let hex =Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
startScreen.addEventListener('click', start);
