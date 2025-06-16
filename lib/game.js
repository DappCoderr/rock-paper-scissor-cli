const readline = require("readline");

const validMoves = ["rock", "paper", "scissor"];

const rules_PvC = {
  rock: { rock: "draw", paper: "computer", scissor: "player" },
  paper: { rock: "player", paper: "draw", scissor: "computer" },
  scissor: { rock: "computer", paper: "player", scissor: "draw" },
};

const rules_PvP = {
  rock: { rock: "draw", paper: "player_2", scissor: "player_1" },
  paper: { rock: "player_1", paper: "draw", scissor: "player_2" },
  scissor: { rock: "player_2", paper: "player_1", scissor: "draw" },
};

// Player Vs Player
function playingWithPlayer(player1Move, player2Move) {
  const p1 = player1Move.trim().toLowerCase();
  const p2 = player2Move.trim().toLowerCase();

  if (!validMoves.includes(p1) || !validMoves.includes(p2)) {
    throw { message: "Invalid Move" };
  }

  console.log(`Player_1 selected ${p1}, Player_2 selected ${p2}`);
  const result = rules_PvP[p1][p2];
  console.log(result === "draw" ? "It's a draw" : `${result} has won`);
}

// Player Vs Computer
function playingWithComputer(playerMove) {
  const p = playerMove.trim().toLowerCase();
  if (!validMoves.includes(p)) {
    throw { message: "Invalid Move" };
  }

  const computerM = validMoves[Math.floor(Math.random() * validMoves.length)];
  console.log(`Computer chose: ${computerM}`);
  const result = rules_PvC[p][computerM];
  console.log(result === "draw" ? "It's a draw" : `${result} wins!`);
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "\nWho do you want to play with? \n1. Another Player\n2. Computer\n> ",
    (answer) => {
      if (answer === "1") {
        rl.question("Player One Choose: [rock, paper, scissor] - ", (p1) => {
          rl.question("Player Two Choose: [rock, paper, scissor] - ", (p2) => {
            try {
              playingWithPlayer(p1, p2);
            } catch (e) {
              console.log("Error:", e.message);
            }
            rl.close();
          });
        });
      } else {
        rl.question("Choose rock, paper or scissor: ", (answer) => {
          try {
            playingWithComputer(answer);
          } catch (error) {
            console.log("Error: ", error.message);
          }
          rl.close();
        });
      }
    }
  );
}

module.exports = { main };
