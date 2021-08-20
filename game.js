


document.addEventListener('DOMContentLoaded', () => {


    const launch =  document.getElementById("launchButton") 
    const slayerSelection =  document.getElementById("slayerSelect")
    const launchLabel =  document.getElementById('launch')

    const lives =  document.getElementById('liveCont')
    var canPlay = false; 
    var dotCounter = 0; // stores the value that denotes the amount of white dots in the grid

    var lost = false;
    var liveCounter = 3; // user has 3 attempts o in a game

    const button = document.querySelector('button')
    var slayerPicked = "" // stores the class name of the slayer that the use picks


    var playerLives = document.getElementsByClassName("lives") 
    var index =  playerLives.length - 1 
   

    launch.onclick = function() {
       slayerSelection.style.visibility = 'visible'
        launchLabel.style.color = "black"
    }
  

    



    const grid = document.querySelector('.grid')
    const score = document.getElementById('score')
    const finalScoreLost = document.getElementsByClassName('finalscore')[0]
    const finalScoreWon = document.getElementsByClassName('finalscore')[1]
    
    var isImmune = false;

    let scoreNum = 0;

    const width = 21
    const height = 19

    const layout = [
        
       
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
        1, 4, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 4, 1,
        1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1,
        1, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 1,
        5, 3, 3, 2, 2, 2, 3, 2, 1, 3, 3, 3, 1, 2, 3, 2, 2, 2, 3, 3, 5,
        1, 2, 1, 1, 1, 2, 2, 2, 3, 2, 3, 2, 3, 2, 2, 2, 1, 1, 1, 2, 1,
        1, 2, 2, 2, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 2, 2, 2, 1,
        1, 1, 1, 2, 1, 2, 2, 2, 3, 3, 1, 3, 3, 2, 2, 2, 1, 2, 1, 1, 1,
        1, 2, 2, 2, 2, 2, 1, 2, 1, 3, 1, 3, 1, 2, 1, 2, 2, 2, 2, 2, 1,
        1, 1, 2, 1, 1, 1, 1, 2, 1, 3, 3, 3, 1, 2, 1, 1, 1, 1, 2, 1, 1,
        1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 1,
        1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1,
        1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1,
        1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 1, 1,
        5, 3, 3, 2, 2, 2, 2, 2, 1, 2, 6, 2, 1, 2, 2, 2, 2, 2, 3, 3, 5,
        1, 1, 3, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 3, 1, 1,
        1, 4, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 4, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    const squares = []

    // 1 wall
    // 2 smallDot
    // 3 empty
    // 4 eyes
    // 5 deadend
    // 6 slayer
    // 7 player

    function createBoard() {

      
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)


            if (layout[i] === 1) {
                squares[i].classList.add('wall')
            } else if (layout[i] === 5) {
                squares[i].classList.add('deadend')
            } else if (layout[i] === 3) {
                squares[i].classList.add('empty')
            }  else if (layout[i] === 2) {     
                squares[i].classList.add('smallDot')
                dotCounter++;
            } else if  (layout[i] === 4) {
                squares[i].classList.add('eyes')
            }else if  (layout[i] === 6) {
                squares[i].classList.add('ghost')
            }





        }
    }

    createBoard()

var currentIndex = 325
var flip = false;
function moveGhost(e) {
    if (canPlay) {
    squares[currentIndex].classList.remove('ghost')
    squares[currentIndex].classList.remove('redGhost') 
    // continously updating player location by removing it from the 
    // previous slot and then adding the player to the new index of squares[]

    checkCollision(playerLives)
    
    switch(e.keyCode) {

        case 37: // left key 
            if ((currentIndex   % width )+ 1 === 1) {
        
                currentIndex = currentIndex + width - 1;
                
            } 
            else if (currentIndex % width != 0 && !squares[currentIndex - 1].classList.contains('wall')) {
                currentIndex-=1
        
            }
            flip = true;
            break
        case 38: // up arrow
            if (currentIndex - width >= 0 && !squares[currentIndex - width].classList.contains('wall')) {
                currentIndex-=width
            }
            break
        case 39: // right arrow 
            if (currentIndex % width < width - 1 && !squares[currentIndex + 1].classList.contains('wall')) {
            currentIndex+=1
            }
            else if (squares[currentIndex-width+1].classList.contains('deadend')) {
                currentIndex = currentIndex-width+1
            } 
            flip = false;
            break
        case 40: // down arrow
            if (currentIndex + width < height * width && !squares[currentIndex + width].classList.contains('wall')) {
                currentIndex+=width
            }
            break
    }
  
    consumeDot()
    consumeEyes()
    won()

  
   
   


    squares[currentIndex].classList.add('ghost')
    const player = document.querySelector('.ghost')

    if (flip) {
        player.style.transform = "scaleX(1)"
    } else {
        player.style.transform = "scaleX(-1)"
       
    }
    if(isImmune) {
        squares[currentIndex].classList.add('redGhost')
    } 
} 
    
}

document.addEventListener('keyup',moveGhost)



// A dot is removed from the grid if the player is on its index
function consumeDot() { 

    if (squares[currentIndex].classList.contains('smallDot')) {
        squares[currentIndex].classList.remove('smallDot')
        dotCounter--
        scoreNum += 5;
        score.innerHTML = scoreNum
    }
}

// The eyes class is removed from the grid if the player is on its index
// Player gains immunity for ten seconds
function consumeEyes() { 

    if (squares[currentIndex].classList.contains('eyes')) {
        squares[currentIndex].classList.remove('eyes')
        scoreNum += 10;
        score.innerHTML = scoreNum
        isImmune  = true;
        setTimeout(unImmune, 10000)
    }
}


// Called by setTimeout. After 10 seconds, the user loses immunity after obtaining the eye.
function unImmune() {
    isImmune = false
    squares[currentIndex].classList.remove('redGhost')
}







class Slayer {

    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerId = NaN 
    }
}


var tan =  document.querySelector('.Tanjiro')
var boar =  document.querySelector('.Nezuko')
var zen =  document.querySelector('.Zenitsu')
var nez =  document.querySelector('.Inosuke')
var start =  document.getElementById('start')
const slayerSelected =  document.getElementById('characterSelected')
const startButton =  document.getElementById('start')


    // Character Selection
    tan.onclick = function() {

    slayerSelected.innerHTML = tan.className
    showStart()
    slayerPicked = tan.className
    }
    boar.onclick = function() {

    slayerSelected.innerHTML = boar.className
    showStart()
    slayerPicked = boar.className
    }
    
    zen.onclick = function() {

    slayerSelected.innerHTML = zen.className
    showStart()
    slayerPicked = zen.className
    }
    nez.onclick = function() {

    slayerSelected.innerHTML = nez.className
    showStart()
    slayerPicked = nez.className
    }


    var slayer =  new Slayer(slayerPicked,136,200)

    function showStart() { // shows the start button 
        startButton.style.visibility = 'visible'
    }
    

   // User can play the game once the start button has been clicked
    start.onclick = function() { 
        slayerSelection.style.visibility = 'hidden'
        startButton.style.visibility = 'hidden'
        canPlay = true;
        launch.style.visibility = 'hidden'

        button.disabled = true
    
        lives.style.visibility = 'visible'
    
        squares[136].classList.add(slayerPicked)
        moveSlayers(slayer);
    
    }

// Check is the slayer and the player class are on the same index
// Post-condition: player class is relocated to the starting location
// if the condition is met
function checkCollision(playerLives) { 

    const loseWindow = document.getElementById('lost')

    if (squares[currentIndex].classList.contains(slayerPicked) && !isImmune) {
    
        if(playerLives[index] && playerLives[index].parentElement) {
            playerLives[index].parentElement.removeChild(playerLives[index]);
            index--
            liveCounter--
        }
        squares[currentIndex].classList.remove('ghost')
        currentIndex = 325
        squares[currentIndex].classList.add('ghost')

    }
    if (liveCounter === 0) {
        lost = true;
        finalScoreLost.innerHTML = scoreNum
        loseWindow.style.visibility = 'visible'
    }


}



var starting = 0
var ending = 0
var containsWall = false
var isInRange = false;
var playerIsAhead = false

function checkSameRow() {
    var range = Math.abs(currentIndex - slayer.currentIndex)
    containsWall = false;
    if (range < 20) {
        isInRange = true;
    if (currentIndex >= slayer.currentIndex) {
        starting = slayer.currentIndex
        ending = currentIndex
        playerIsAhead = false
    } else {
        starting = currentIndex
        ending = slayer.currentIndex
        playerIsAhead = true
    }

    for (var i = starting; i <= ending; i++) {
        if (squares[i].classList.contains('wall')) {
            containsWall = true;
            break;
        }
    }
} else {
    isInRange = false;
    
}
}

// Moves the slayer up or down towards the player
// Pre-condition: there exists no walls above or below between the slayer and the player
// Post-condition: slayer moves down towards the player if the player is at a greater index
// in the same column. Else, the slayer moves up towards the player if the player is at a lower index


// Moves the slayer left or right towards the player
// Pre-condition:  there exists no walls between them and they are
// in the same row
// Post-condition: slayer moves towards the player

var flipSlayer = false;
function moveSlayerRL() {

            checkSameRow()
            if (!containsWall && isInRange) {
                squares[slayer.currentIndex].classList.remove(slayerPicked)
            if (!playerIsAhead &&  !squares[slayer.currentIndex + 1].classList.contains('wall')) {
                slayer.currentIndex+=1
                flipSlayer = false;
                
            
            } else if (playerIsAhead &&  !squares[slayer.currentIndex - 1].classList.contains('wall')) {
                slayer.currentIndex-=1
                flipSlayer = true;
                
            }
            checkCollision(playerLives) 
            squares[slayer.currentIndex].classList.add(slayerPicked)
            const slayerFacingDirection = document.getElementsByClassName(slayerPicked)[1]
            
            if (flipSlayer) {
                slayerFacingDirection.style.transform = "scaleX(1)" 
            } else {
                slayerFacingDirection.style.transform = "scaleX(-1)" 
            }
            
        
        }
}




// Randomly moves the slayer where there isn't a wall
// Pre-condition: no index of the grid are null
// Post-condition:  slayerPicked is relocated to a new index
var starting2 = 0
var ending2 = 0
var containsWall2 = false
var isInRange2 = false
var playerIsAbove = false

function checkSameColumn() {

    var range = Math.abs(currentIndex - slayer.currentIndex)
    containsWall2 = false
    if (range % 21 === 0 ) {
        isInRange2 = true
    if (currentIndex >= slayer.currentIndex) {
        starting2 = slayer.currentIndex
        ending2 = currentIndex
        playerIsAbove = false
        
    } else {
        starting2 = currentIndex
        ending2 = slayer.currentIndex
        playerIsAbove = true
       
    }

    for (var i = starting2; i <= ending2; i+=width) {
        if (squares[i].classList.contains('wall')) {
            containsWall2 = true;
            break;
        }
    }
} else {
    isInRange2 = false;
}

}

// Randomly moves the slayer where there isn't a wall
// Pre-condition: no index of the grid are null
// Post-condition:  slayerPicked is relocated to a new index 
function moveSLayerUD() {


    checkSameColumn()
    if (!containsWall2 && isInRange2) {
        squares[slayer.currentIndex].classList.remove(slayerPicked)
    if (!playerIsAbove &&  !squares[slayer.currentIndex + width].classList.contains('wall')) {
        slayer.currentIndex+=width
        

    } else if (playerIsAbove &&  !squares[slayer.currentIndex - width].classList.contains('wall')) {
        slayer.currentIndex-=width
        

    }
    checkCollision(playerLives) 
    squares[slayer.currentIndex].classList.add(slayerPicked)
}

}


    function moveSlayers(slayer) {
        
        const directions = [-1, 1, width, -width] // slayer can go left, right, up (width) and down (-width)

        let direction = directions[Math.floor(Math.random() * directions.length)]

        
        if (!lost) {
        slayer.timerId = setInterval(function() {
        if (!lost) {

            checkSameRow()
            checkSameColumn();
            if (!containsWall && isInRange)  {
                moveSlayerRL()
            }
            
            else if (!containsWall2 && isInRange2) {
                moveSLayerUD()
            }

        else if (!squares[slayer.currentIndex + direction].classList.contains('wall')) {
    

        squares[slayer.currentIndex].classList.remove(slayerPicked)

        slayer.currentIndex += direction

        if ((slayer.currentIndex % width ) === 0) {
        
            slayer.currentIndex = slayer.currentIndex + width - 1;
            
        }
        else if (squares[slayer.currentIndex-width+1].classList.contains('deadend')) {
            slayer.currentIndex = slayer.currentIndex-width+1
        } 
            
        
           
        
    
     

        squares[slayer.currentIndex].classList.add(slayerPicked)


        const slayerFacingDirection = document.getElementsByClassName(slayerPicked)[1]
        
        
        if (direction === -1 ) {
            
            slayerFacingDirection.style.transform = "scaleX(1)" // the image is flipped to face the left
        
        } else if (direction === 1) {
            slayerFacingDirection.style.transform = "scaleX(-1)" // the image is flipped to face the right
        }

       
        

      

        } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
        }
    
    
    checkCollision( playerLives)
} else {
    canPlay = false
}
    
}


, slayer.speed) 
    
    }
}



    function won() {

        if (dotCounter === 0) {
            const wonWindow = document.getElementById('won')
            wonWindow.style.visibility  = 'visible'
            canPlay = false;
            finalScoreWon.innerHTML = scoreNum
        }
      
    }





})

