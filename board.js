/*jshint esversion: 6 */

class Board {
    constructor(rows, cols, selector) {
      this.Rows = rows;
      this.Cols = cols;
      this.selector = selector;
      this.createBoard();
      this.obstacleCases();
    }
  
    createBoard(){
      const $board = $(this.selector);
      for (let row = 0; row < this.Rows; row++) { // crée les rangés
        const $row = $("<tr>"); // coord Y
        let indexX = row;
          for (let col = 0; col < this.Cols; col++) { // crée les colonnes
            const $col = $("<td>") // coord X
              .addClass("free")
              .attr("data-x", col)
              .attr("data-y", indexX);
            let indexY = col;
  
            if (indexX === 0) {
              if (indexX === 0 && indexY === 0) {
                $col.addClass("left-border top-border"); //  en plus la colonne de gauche
              } else if (indexX === 0 && indexY === 9) {
                $col.addClass("right-border top-border"); //  en plus la colonne de droite
              } else {
                $col.addClass("top-border"); //  la ligne du dessus
              }
            } else if (indexY === 0) {
                $col.addClass("left-border"); //  la colonne de gauche
            } else if (indexX === 9) {
              if (indexX === 9 && indexY === 0) {
                $col.addClass("left-border bot-border"); //  en plus la colonne de gauche
              } else if (indexX === 9 && indexY === 9) {
                $col.addClass("right-border bot-border"); //  en plus la colonne de droite
              } else {
                $col.addClass("bot-border"); //  la ligne du dessus
              }
            } else if (indexY === 9) {
                $col.addClass("right-border"); // la colonne de droite
            }
            $col.attr("id", ((indexX * 10) + indexY)); // ajoute un id de 0 à 99 (cases)
            $row.append($col);
          }
        $board.append($row);
      }
    }
  
    obstacleCases(){
      let boardSize = Number(this.Rows * this.Cols);
      let percent = Math.trunc((15 * boardSize)/100);
        for (let i = 0; i < percent; i++) {
          const random = $("td")[Math.trunc(Math.random() * 100)];
          $(random).removeClass("free").addClass("square-inaccessible");
        }
    }

  }

  
  