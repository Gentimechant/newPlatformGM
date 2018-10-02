/*jshint esversion: 6 */

class Weapon {
    constructor(name, damage, skin) {
        this.name = name;
        this.damage = damage;
        this.skin = skin;
    }
    spawn() {
      // const randomPlayer = playerZ[Math.trunc(Math.random() * playerZ.length)];
      const place = $("td[class*='free']");
      const random = place[Math.trunc(Math.random() * place.length)];

          $(random).removeClass("free").attr("weapon", this.name);
          console.log($(random));
    }
}


const melee = new Weapon("melee", 10, "img/melee.png");
const axe = new Weapon("axe", 30, "img/axe.png");
const sword = new Weapon("sword", 20, "img/sword1.png");
const shovel = new Weapon("shovel", 30, "img/shovel.png");
const hammer = new Weapon("hammer", 20, "img/hammer.png");


function scanWeapon(weapon) {
  if (weapon.attr("weapon") === "sword") {
    return "swordAvailable";
  } else if (weapon.attr("weapon") === "shovel"){
    return "shovelAvailable";
  } else if (weapon.attr("weapon") === "hammer") {
    return "hammerAvailable";
  } else if (weapon.attr("weapon") === "axe") {
    return "axeAvailable";
  } else if (weapon.attr("weapon") === "melee") {
    return "meleeAvailable";
  }
}