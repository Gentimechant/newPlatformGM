/*jshint esversion: 6 */

$(function() {
    const board = new Board(10, 10, ".gameArea");
    const freeCases = $("td[class*='free']");

    let weapons = [melee, axe, sword, shovel, hammer];
    let players = [joueur1, joueur2];

    axe.spawn();
    sword.spawn();
    shovel.spawn();
    hammer.spawn();
    const playerOne = $("td[data-y='0'][class*='free']");
    const playerTwo = $("td[data-y='9'][class*='free']");
    joueur1.spawn(playerOne);
    joueur2.spawn(playerTwo);

  
    let round = 1;
    //fonction qui incrémente le nombre de tour
    function nextRound() {
        round++;
        switchPlayer();
    }
   
    function switchPlayer() {
        let myTimer;
        // function countTime() {
        //     let myTimer = setTimeout(function(){nextRound();}, 14000);
        // }
        
        function timeOut(player, position) {
            if (player.position != position) {
                clearTimeout();
                nextRound();
            }
        }
    
        //si le tour est un nombre pair alors c'est le joueur 2 qui peut joueur sinon le joueur 1
          if (round % 2 === 0) {
              joueur2.canPlay = true;
              joueur1.canPlay = false;
              joueur2.availableCase();
              let myOldPosition = joueur2.position;
              joueur2.move();
            //   let myTimer = setTimeout(timeOut(joueur2, myPosition), 14000);             
            //   countTime();
            //   timeOut(joueur2, myPosition);

            setTimeout(function(){					
                // if (joueur2.canPlay === false) {
                console.log(myOldPosition);
                console.log(joueur2.position);
                if (joueur2.position != myOldPosition) {
                clearTimeout();
                }
                  nextRound();
                
                // }
              }, 9000);
            
  
          } else {
              joueur1.canPlay = true;
              joueur2.canPlay = false;
              joueur1.availableCase();
              let myOldPosition = joueur1.position;
              joueur1.move();
            //   let myTimer = setTimeout(timeOut(joueur1, myPosition), 14000);
            //   countTime();
            //   timeOut(joueur1, myPosition);

            setTimeout(function(){					
                // if (joueur2.canPlay === false) {
                console.log(myOldPosition);
                console.log(joueur1.position);
                
                  nextRound();
                
                // }
            }, 9000);

              
          }
    }
      switchPlayer();


  
  });
  