class Game {
    constructor() {
        // make these automatically visually updated in future
        this.health = 10;
        this.maxHealth = 10;
        this.hunger = 10;
        this.maxHunger = 10;
        this.progress = 0;
        this.maxProgress = 10;
        this.supply = 5;
    }

    isEnded() {
        if (this.progress >= this.maxProgress) {
            return true;
        }
        return false;
    }

    addHealth(add) {
        if (this.health + add > this.maxHealth) {
            this.health = this.maxHealth;
        } else if (this.health + add <= 0) {
            this.health = 0;
            this.die();
        } else {
            this.health += add;
        }

        // why is it updating visuals. bad
        let meter = document.getElementById("health");
        meter.value = this.health;
    }

    addHunger(add) {
        if (this.hunger + add > this.maxHunger) {
            // add excess hunger to health
            this.addHealth(this.hunger + add - this.maxHunger);

            this.hunger = this.maxHunger;
        } else if (this.hunger + add < 0) {
            this.hunger = 0;
            this.addHealth(-3);
        } else {
            this.hunger += add;
        }

        // why is it updating visuals. bad
        let meter = document.getElementById("hunger");
        meter.value = this.hunger;
    }

    addProgress() {
        if (this.progress + 1 > this.maxProgress) {
            this.progress = this.maxProgress;
            // end game
        } else {
            this.progress += 1;
        }

        // why is it updating visuals. bad
        let meter = document.getElementById("travel");
        meter.value = this.progress;
    }

    useCookingSupply() {
        this.supply -= 1;
        let visual = document.getElementById("supplies");
        visual.textContent = this.supply;
    }

    eatUncookedPlant(part) {
        // check poison/death
        if (part.edibility == "uncooked") {
            this.addHunger(2);
            this.addProgress();
        } else if (part.edibility == "cooked" ||
        part.edibility == "poison") {
            this.addHunger(-2);
            this.addHealth(-2);
        } else if (part.edibility == "death") {
            // MORTIS
            let negateHealth = this.health * -1;
            this.addHealth(negateHealth);
        }
    }

    eatCookedPlant(part) {
        // check poison/death
        let edibility = part.edibility;
        if ((edibility == "uncooked" ||
        edibility == "cooked") &&
        this.supply > 0) {
            this.addHunger(4);
            this.useCookingSupply();
            this.addProgress();
        } else if (edibility == "poison" && this.supply > 0) {
            this.addHunger(-2);
            this.addHealth(-2);
            this.useCookingSupply();
        } else if (edibility == "death" && this.supply > 0) {
            this.addHealth(this.health * -1);
        } else {
            // no supplies
            alert("You have no supplies, you must move on.")
            this.moveOn();
        }

    }

    moveOn() {
        this.addProgress();
        this.addHunger(-1);
    }

    die() {
        // MORTIS
        // alert("MORTIS");
        let overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.id = "mortis";
        let image = document.createElement('img');
        image.src = "images/mortis.png";
        overlay.appendChild(image);

        document.getElementsByTagName("main")[0].appendChild(overlay);

        var audio = new Audio('mortis.mp3');
        audio.play();
    }
}

let game = new Game();

let startGameBtn = document.getElementById("startGame");

startGameBtn.addEventListener("click", () => {
    let overlay = document.getElementById("startOverlay");
    overlay.remove();
})

let submit = document.getElementById("submit");
let image = document.getElementById("plantImage");

let firstPlant = plants.entries().next().value[1];
console.log(firstPlant);
loadPlant(firstPlant);

submit.addEventListener("click", takeTurn)

function takeTurn() {
    // get move
    let move = document.getElementById("turnSelect").value;
    let plant = image.src;
    let position = plant.indexOf("images/");
    plant = plant.slice(position+7);
    plant = plant.slice(0, plant.length - 4);

    let part;
    let partName = document.getElementById("partSelect").value;
    let plantParts = plants.get(plant).parts;
    for (plantPart of plantParts) {
        if (plantPart.name == partName) {
            part = plantPart;
        }
    }

    switch (move) {
        case "moveOn":
            game.moveOn();
            break;
        case "eatUncooked":
            game.eatUncookedPlant(part);
            break;
        case "eatCooked":
            game.eatCookedPlant(part);
            break;
    }

    // check if game end
    if (game.isEnded()) {
        endGame();
    } else {
        loadNextPlant();
    }
}

function endGame() {
    let winOverlay = document.createElement("div");
    winOverlay.classList.add("overlay");
    winOverlay.textContent = "congrats";
    document.body.appendChild(winOverlay);

    let audio = new Audio("cheer.mp3");
    audio.play();
}

function loadNextPlant() {
    // find current plant
    let current = image.src;
    let next;
    let position = current.indexOf("images/");
    current = current.slice(position + 7);
    current = current.slice(0, current.length - 4);

    // find next plant
    let getNext = false;
    let foundPlant = false;
    for (const [key, value] of plants) {
        if (key == current) {
            getNext = true;
        } else if (getNext) {
            next = value;
            foundPlant = true;
            break;
        }
    }
    if (!foundPlant) {
        loadPlant(firstPlant);
    } else {
        loadPlant(next);
    }
}

// add another set of buttons for each plant part
function loadPartsButtons(plant) {
    let div = document.getElementById("partSelect");
    let parts = plant.allParts();

    div.innerHTML = "";

    for (let i = 0; i < parts.length; i++) {
        const option = document.createElement("option");

        let partName = parts[i].name;
        option.value = partName;
        option.textContent = partName;

        div.appendChild(option);
    }
}

function loadPlant(plant) {
    loadPartsButtons(plant);
    image.src = plant.src;
}