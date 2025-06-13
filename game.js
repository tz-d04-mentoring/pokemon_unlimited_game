import readline from "readline-sync";

let GAME_ACTIVE = true;

const characters = [
  { name: "Tick", weapons: [{ name: "sword", maxDamage: 30 }], health: 100 },
  {
    name: "Trick",
    weapons: [
      { name: "sword", maxDamage: 50 },
      { name: "bow", maxDamage: 70 },
    ],
    health: 100,
  },
  { name: "Track", weapons: [{ name: "gauntlet", maxDamage: 30 }], health: 100 },
];

// mit map kann ich aus einem Array von OBJECTS ein Feld extrahieren
const characterNames = characters.map((character) => character.name);

const enemies = [
  {
    name: "Pick",
    weapons: [
      { name: "sword", maxDamage: 3 },
      { name: "bow", maxDamage: 1 },
    ],
    health: 100,
  },
  {
    name: "Prick",
    weapons: [
      { name: "grenadeLauncher", maxDamage: 20 },
      { name: "bow", maxDamage: 1 },
    ],
    health: 100,
  },
  {
    name: "Prack",
    weapons: [
      { name: "gauntlet", maxDamage: 1 },
      { name: "bow", maxDamage: 1 },
    ],
    health: 100,
  },
];

// function die mir immer ein random item aus dem Array holt
// brauche ich öfter in einem Game, also sourcen wir es in eine Function aus
const randomItemFromArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

if (!GAME_ACTIVE) {
  // process.exit beendet programm, nicht nur eine Loop
  process.exit();
}

// keyInSelect erwartet FLACHEN Array, nicht Array von Objects
// mit Objects kann es nix anfangen und konvertiert jedes object zu einem STRING => [object Object]
const heroIndex = readline.keyInSelect(
  characterNames,
  "Wähl doch mal einen von denen! Wird schon werden...."
);

// picke character object von array
const character = characters[heroIndex];
console.log("Du hast gewählt: ", character.name);
console.log();

// GAME LOOP
while (true) {
  // LOGIC
  // picke ein random element => hole nur eine KOPIE raus!
  // wenn ich die KOPIE ändere, wird das Original nicht verändert
  const enemy = {...randomItemFromArray(enemies)};

  // BATTLE
  // solange noch jemand lebt => geht es weiter. Brutal!
  while(enemy.health > 0 && character.health > 0) {
    // picke random weapon von character
    const weaponHero = randomItemFromArray(character.weapons)
    // picke random weapon von enemy
    const weaponEnemy = randomItemFromArray(enemy.weapons);
    
    console.log(`Du (${character.name}) attackierst mit ${weaponHero.name}`);
    
    // hit enemy with weapon
    enemy.health -= weaponHero.maxDamage;
    console.log(`- Enemy "${enemy.name}" wurde schwer getroffen (Damage: ${weaponHero.maxDamage}). Neue Health: ${enemy.health}`)
    console.log()
  
    // counter attack
    if(enemy.health <= 0) break;

    console.log(`${enemy.name} attackiert mit ${weaponEnemy.name}`);

    character.health -= weaponEnemy.maxDamage;
    console.log(
      "- Du wurdest schwer getroffen (Damage:" +
        weaponEnemy.maxDamage +
        "). Neue Health: ",
      character.health
    );
    console.log();

  }

  // check who lost
  if(character.health < 0) {
    console.log("Du hast es leider nicht geschafft! Aber du warst immer bemüht...")
    break;
  }
  // enemy tot
  else {
    console.log(`Du hast ${enemy.name} besiegt. Sehr gut, weitermachen!`)
  }

  // after battle: neue zeile
  console.log()

    // EXIT condition für die Game Loop gleich am ANFANG coden! Dann wird es auch Spaß machen. vielleicht
  // nach jedem battle frage user ob wir weitermachen wollen
  if (!readline.keyInYN("Willst du weiter battlen?")) {
    break;
  }
  console.log()

}
