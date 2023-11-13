$(document).ready(function () {
  var field = [];
  var mines = [];
  var numbered = [];
  var numberedCtr = 0;

  var firstStart = true;

  let min = 1;
  let max = 9;

  var i = 0;

  var revealedTiles = [];

  function revealTiles(tilex, tiley) {
    if (revealedTiles.includes(`${tilex}-${tiley}`)) {
      return;
    }
    revealedTiles.push(`${tilex}-${tiley}`);

    console.log("MAO NING GI CLICK NIMO NA ID: " + tilex + "-" + tiley);
    console.log(numbered.includes(`${tilex}-${tiley}`));

    if (mines.includes(`${tilex}-${tiley}`)) {
      //   $("body").html(" ");
      alert("LOSE!");
      location.reload();
      return;
    } else if (numbered.includes(`${tilex}-${tiley}`)) {
      //   alert("NUMBERED");
      determineBomb(tilex, tiley);
      return;
    } else {
      determineBomb(tilex, tiley);
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          var tilexFinal = x + tilex;
          var tileyFinal = y + tiley;
          if (
            tilexFinal < min ||
            tileyFinal < min ||
            tilexFinal > max ||
            tileyFinal > max
          )
            continue;

          console.log(tilexFinal + " HAHA " + tileyFinal);

          revealTiles(tilexFinal, tileyFinal);
        }
      }
    }
  }

  for (let row = 1; row <= 9; row++) {
    for (let col = 1; col <= 9; col++) {
      $(
        `<div id = "${row}-${col}" class = "gridclass w-[66.7px] h-[66.7px] bg-slate-800 border-1 border-black"></div>`
      ).appendTo(".game-field");

      field[i++] = row + "-" + col;
    }
  }

  console.log(field);

  //MINES GENERATE

  // for (let i = 0; i < 20; i++) {
  //   let row = Math.floor(Math.random() * 9) + 1;
  //   let col = Math.floor(Math.random() * 9) + 1;

  //   console.log(row + "-" + col);

  //   mines[i] = row + "-" + col;
  // }

  function generateMines(excludeX, excludeY) {
    var excludedTiles = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        var tilexFinal = excludeX + x;
        var tileyFinal = excludeY + y;
        excludedTiles.push(`${tilexFinal}-${tileyFinal}`);
      }
    }

    while (mines.length < 20) {
      let row = Math.floor(Math.random() * 9) + 1;
      let col = Math.floor(Math.random() * 9) + 1;
      var bombTile = `${row}-${col}`;

      if (!excludedTiles.includes(bombTile) && !mines.includes(bombTile)) {
        mines.push(bombTile);
      }
    }

    for (let id of mines) {
      $(`#${id}`).addClass("bomb");
    }

    gameMaster();
  }

  //GAME MASTER

  // for (let row = min; row <= max; row++) {
  //   for (let col = min; col <= max; col++) {
  //     let check = row + "-" + col;

  //     if (mines.includes(check)) {
  //       continue;
  //     } else {
  //       determineBombStart(row, col);
  //     }
  //   }
  // }

  function gameMaster() {
    var numberedCtr = 0;
    for (let row = min; row <= max; row++) {
      for (let col = min; col <= max; col++) {
        let check = row + "-" + col;

        if (mines.includes(check)) {
          continue;
        } else {
          determineBombStart(row, col);
        }
      }
    }
  }

  function determineBombStart(tilex, tiley) {
    var ctr = 0;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        let tilexFinal = x + tilex;
        let tileyFinal = y + tiley;

        if (
          tilexFinal < min ||
          tileyFinal < min ||
          tilexFinal > max ||
          tileyFinal > max
        )
          continue;

        let check = tilexFinal + "-" + tileyFinal;

        console.log(`${tilex}-${tiley}: ` + check);
        console.log("Mao ning include: " + mines.includes(check));

        if (mines.includes(check)) ctr++;
      }
    }

    if (ctr != 0) {
      numbered[numberedCtr++] = `${tilex}-${tiley}`;
    }
  }

  function determineBomb(tilex, tiley) {
    var ctr = 0;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        let tilexFinal = x + tilex;
        let tileyFinal = y + tiley;

        if (
          tilexFinal < min ||
          tileyFinal < min ||
          tilexFinal > max ||
          tileyFinal > max
        )
          continue;

        let check = tilexFinal + "-" + tileyFinal;

        console.log(`${tilex}-${tiley}: ` + check);
        console.log("Mao ning include: " + mines.includes(check));

        if (mines.includes(check)) ctr++;
      }
    }

    if (ctr != 0) {
      $(`#${tilex}-${tiley}`).html(`<div id = "${tilex}-${tiley}"
        class="gridclass w-[66.7px] h-[66.7px] bg-white border-1 border-black text-center text-xl flex items-center justify-center font-bold">${ctr}
      </div>`);
    } else {
      $(`#${tilex}-${tiley}`).html(`<div id = "${tilex}-${tiley}"
        class="gridclass w-[66.7px] h-[66.7px] bg-white border-1 border-black text-center text-xl flex items-center justify-center font-bold"> 
      </div>`);
    }
  }

  function handleFirstClick(x, y) {
    generateMines(x, y);
    revealTiles(x, y);
    firstStart = false;
  }

  //buttons
  $(".gridclass").on("click", function (e) {
    var string = e.target.id;
    var x = parseInt(string.charAt(0));
    var y = parseInt(string.charAt(2));

    if (firstStart) {
      handleFirstClick(x, y);
    } else {
      revealTiles(x, y);
    }
  });

  $(".gridclass").on("contextmenu", function (e) {
    console.log(e);
    $(`#${e.target.id}`).toggleClass("flag");
    e.preventDefault();
  });
});
