/*jshint esversion: 6 */

class Player {
    constructor(life, infoManquante, damage, weapon, numero, canPlay, position) { // à revoir infoManquante
        this.life = life;
        this.damage = damage;
        this.weapon = weapon;
        this.numero = numero; // id du joueur
        this.canPlay = canPlay; // true or false
        this.position = position; // case de la position à revoir
    }
    spawn(playerZ) {
      //Fait spawn le joueur sur une case ou il n'y à rien  playerOne[Math.trunc(Math.random() * playerOne.length)]
          const randomPlayer = playerZ[Math.trunc(Math.random() * playerZ.length)];
          $(randomPlayer).removeClass("free").addClass("square-character" + this.numero);
          this.position = randomPlayer;
          console.log(this.position);
    }

    displayInfos(){
      $("#life-player" + this.numero).text("Life : " + this.life);
      $("#weapon-player" + this.numero).text("Weapon : " + this.weapon.name);
      $("#damage-weap" + this.numero).text("Damage : " + this.damage);
      $("#skin-weap" + this.numero).html("<img src=" + this.weapon.skin + " alt=" + this.weapon.name + ">");

    }

    availableCase(){
      let positionId = Number($(this.position).attr("id")); // position actuelle <img src="" alt="">
      //TODO factoriser c'est 4 boucles for()

        if (this.canPlay) {
        //   // on vérifie les cases de droite
          for (let i = 1; i < 4; i++) {
            let rightCaseAvailable = $("td[id='"+ (positionId + i) +"']");
            if (rightCaseAvailable !== null  && rightCaseAvailable.hasClass("left-border") === false && freeCases(rightCaseAvailable) === true || rightCaseAvailable.attr("weapon") && rightCaseAvailable.hasClass("left-border") === false ) {
              if (rightCaseAvailable.attr("weapon")) {
                $("td[id='"+ (positionId + i) +"']").addClass("availableCase").attr("weapon", scanWeapon(rightCaseAvailable));
              } else {
                $("td[id='"+ (positionId + i) +"']").addClass("availableCase");
              }
            } else {
              break;
            }
          }
          
          // on vérifie les cases de gauche
          for (let i = 1; i < 4; i++) {
            let leftCaseAvailable = $("td[id='"+ (positionId - i) +"']");
            if (leftCaseAvailable !== null  && leftCaseAvailable.hasClass("right-border") === false && freeCases(leftCaseAvailable) === true || leftCaseAvailable.attr("weapon") && leftCaseAvailable.hasClass("right-border") === false ) {
              if (leftCaseAvailable.attr("weapon")) {
                $("td[id='"+ (positionId - i) +"']").addClass("availableCase").attr("weapon", scanWeapon(leftCaseAvailable));
              } else {
                $("td[id='"+ (positionId - i) +"']").addClass("availableCase");
              }
            } else {
              break;
            }
          }
          // on vérifie les cases du haut
          for (let i = 1; i < 4; i++) {
            let topCaseAvailable = $("td[id='"+ (positionId - i * 10) +"']");
            if (topCaseAvailable !== null  && topCaseAvailable.hasClass("bot-border") === false && freeCases(topCaseAvailable) === true || topCaseAvailable.attr("weapon") && topCaseAvailable.hasClass("bot-border") === false ) {
              if (topCaseAvailable.attr("weapon")) {
                $("td[id='"+ (positionId - i * 10) +"']").addClass("availableCase").attr("weapon", scanWeapon(topCaseAvailable));
              } else {
                $("td[id='"+ (positionId - i * 10) +"']").addClass("availableCase");
              }
            } else {
              break;
            }
          }
          // on vérifie les cases du bas
          for (let i = 1; i < 4; i++) {
            let botCaseAvailable = $("td[id='"+ (positionId + i * 10) +"']");
            if (botCaseAvailable !== null  && botCaseAvailable.hasClass("top-border") === false && freeCases(botCaseAvailable) === true || botCaseAvailable.attr("weapon")  && botCaseAvailable.hasClass("top-border") === false ) {
              if (botCaseAvailable.attr("weapon")) {
                $("td[id='"+ (positionId + i * 10) +"']").addClass("availableCase").attr("weapon", scanWeapon(botCaseAvailable));
              } else {
                $("td[id='"+ (positionId + i * 10) +"']").addClass("availableCase");
              }
            } else {
              break;
            }
          }

        }

    }
    //
     move(){
       // récupérer la position actuelle
       // éffacer cette position (classe availableCase)
       // récupérer le click sur la nouvelle position
       // lui assigner la classe availableCase

       let positionId = this.position; // position actuelle
       let character = "square-character" + this.numero;
       let oldweapon = this.weapon.name;

       if (this.canPlay) {
         const that = this; 
         const $board = $(".availableCase");
         $board.click(function(){
           $board.off("click").removeClass("availableCase").addClass("free");
           $(positionId).removeClass(character).addClass("free"); // enleve l'ancienne position
           positionId = this;
           $(positionId).removeClass("free").addClass(character);
           that.position = positionId;           
          if ($(that.position).attr("weapon")) { // vérifie s'il y a un arme et remplace si oui            
                if ($(that.position).attr("weapon") === "axeAvailable") {
                    that.weapon = axe;
                    that.damage = that.weapon.damage;
                    $(that.position).attr("weapon", oldweapon);
                } else if ($(that.position).attr("weapon") === "shovelAvailable") {
                    that.weapon = shovel;
                    that.damage = that.weapon.damage;
                    $(that.position).attr("weapon", oldweapon);
                } else if ($(that.position).attr("weapon") === "swordAvailable") {
                    that.weapon = sword;
                    that.damage = that.weapon.damage;
                    $(that.position).attr("weapon", oldweapon);
                } else if ($(that.position).attr("weapon") === "hammerAvailable") {
                    that.weapon = hammer;
                    that.damage = that.weapon.damage;
                    $(that.position).attr("weapon", oldweapon);
                } else if ($(that.position).attr("weapon") === "meleeAvailable") {
                    that.weapon = melee;
                    that.damage = that.weapon.damage;
                    $(that.position).attr("weapon", oldweapon);  // à corriger, CSS (arme qui s'affiche, non pas character)
                } // penser à faire un feed-back sur les côtés (infos joueurs)
            }
          this.displayInfos();
          });

        }

      }

}

let joueur1 = new Player(100, 3, 10, melee, "1");
let joueur2 = new Player(100, 3, 10, melee, "2");



function freeCases(casesToCheck){ // fonction pour vérifier si la case est libre ...
  if ($(casesToCheck).hasClass("free")) {
    return true;
  } else {
    return false;
  }
}

function random(tab){ // pick au hasard une case
  return tab[Math.trunc(Math.random() * tab.length)];
}

function randomCases(player){ // met au hasard un player
  for (var i = 0; i < player.length; i++) {
    let free = $(player[i]).hasClass("free");
    if (free) {
      return random(player);
    } else {
      return false;
    }
  }
}

function randomFreeCases(){
  const freeCases = $("td.free");
  for (var i = 0; i < freeCases.length; i++) {
    return freeCases[Math.trunc(Math.random() * freeCases.length)];
  }
}
