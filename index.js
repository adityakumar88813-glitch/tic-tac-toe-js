
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

//for music add
const clickSound = new Audio("clicksound.mp3");
const winSound = new Audio("mixkit-achievement-bell-600.wav");
const tieSound = new Audio("mixkit-cartoon-laugh-voice-2882.wav");
//yaha takk

let currentPlayer ;
let gameGrid;
 const winningposition= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  
 ];

//  lets create function for initialise the game
function initGame(){
    currentPlayer ="X";
    gameGrid =["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player - ${currentPlayer}`;

    //UI pe delete box ke content after click newgame btn karne ke liye
    boxes.forEach((box , index)=>{
        box.innerText ="";
         boxes[index].style.pointerEvents = "all";

         //win ke baad intialize boxes with css propertites again
         box.classList =`box box${index+1}`;
    });
}
initGame();

// har box ke liye ke vala function chlana hai
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

function  handleClick(index){
//       pahle condition jispe click vo khali hona chaiye
        // aur usko unclickable bna dena hai
        // box ke value ko change from X O or O 
        // next click ke pahle check ki jeet to nhi gya

          
    //for music add
 if(gameGrid[index] === ""){

    clickSound.currentTime = 0;
    clickSound.play();
 }

 //yaha tak

 if(gameGrid[index]===""){

    // boxes UI ke liye hai
    boxes[index].innerText =currentPlayer;

    // ye jo uper grid bna hai uske liye
    gameGrid[index] =currentPlayer;
      
    //jo box tic hai uspe curser poinetr nhi banega
    boxes[index].style.pointerEvents = "none";
    //swap
    swapturn();

    //check koi jeet to nhi gya
    checkgameOver();
  
 }

 
}

 function swapturn(){
   if(currentPlayer =="X"){
    currentPlayer = "O";
   }
   else{
     currentPlayer = "X";
   }
   //UI Upadte
   gameInfo.innerText =`Current Player - ${currentPlayer}`;
 }



//win check ke liye
 function  checkgameOver(){
     let answer ="";
     
     winningposition.forEach((position)=>{
        //har winning index pe agar same value to win hoga and non empty
        if((gameGrid[position[0]] !=="" && gameGrid[position[1]] !=="" && gameGrid[position[2]] !=="")
        &&(gameGrid[position[0]] ===gameGrid[position[1]])&&gameGrid[position[1]]===gameGrid[position[2]]){
           
            //check if winner is X
            if(gameGrid[position[0]]=="X")
                answer ="X";
            else
                answer ="O";
            //disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })
       
            //now we know winner  so maeks these boxes green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

        
        
     
    });

       if(answer !==""){
        gameInfo.innerText =`Winner Player -${answer}`;
        newGameBtn.classList.add("active");

        //for music
        if(answer !== ""){
    winSound.currentTime = 0;
    winSound.play();
        return;

        }

       } 
       
       //there is no winner means match tie
       let fillCount = 0;
       gameGrid.forEach((box)=>{
        if(box !==""){
            fillCount++;
        }
       });
       //board if full means fillcount ==9
       if(fillCount===9){
        gameInfo.innerText = "Game Tie!";
        newGameBtn.classList.add("active");
       }
       //for music
       if(fillCount === 9){
    tieSound.currentTime = 0;
    tieSound.play();

       }
 }


 //jitne ke baad new btn pe click ke baad phir sab suru se ho jayega
 newGameBtn.addEventListener("click",initGame);  