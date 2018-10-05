/*jshint esversion: 6 */

$(function() {
    const board = new Board(10, 10, ".gameArea");

    // Fait spawn les armes
    axe.spawn();
    sword.spawn();
    shovel.spawn();
    hammer.spawn();

    // fait spawn les joueurs et affiche les informations 
    const playerOne = $("td[data-y='0'][class*='free']");
    const playerTwo = $("td[data-y='9'][class*='free']");
    joueur1.spawn(playerOne);
    joueur1.displayInfos();
    joueur2.spawn(playerTwo);
    joueur2.displayInfos();
    joueur1.name = "Spartacus";
    joueur2.name = "Conan";

    let round = 1;

    //fonction qui incrémente le nombre de tour
    function nextRound() {
        round++;
        switchPlayer();
    }
    
    // fonction d'attendre que le joueur termine son action
    function setTime() {
        setTimeout(function(){
            nextRound();
        }, 5000);  
    }
    
    // fonction qui permet de faire la boucle du jeu
    function switchPlayer() {
        //si le tour est un nombre pair alors c'est le joueur 2 qui peut joueur sinon le joueur 1
          if (round % 2 === 0) {
              joueur2.canPlay = true;
              joueur1.canPlay = false;
              let numPlayer = joueur2.numero;
              let myOldPosition = joueur2.position;
              joueur2.displayInfos();
              $("#can-play" + joueur2.numero).text("YOU CAN PLAY");
              if (joueur1.behavior != 0) {
                joueur2.fight(joueur1);
                setTime();  
              } else {
                joueur2.availableCase(); 
                joueur2.move();
                setTime(); 
              } 
  
          } else {
              joueur1.canPlay = true;
              joueur2.canPlay = false;
              let numPlayer = joueur1.numero;
              let myOldPosition = joueur1.position;
              joueur1.displayInfos();
              $("#can-play" + joueur1.numero).text("YOU CAN PLAY");
              if (joueur2.behavior != 0) {
                joueur1.fight(joueur2); 
                setTime();
              } else {
                joueur1.availableCase(); 
                joueur1.move();
                setTime(); 
              }

          }
    }

    // lance le jeu
      switchPlayer();

  });
  