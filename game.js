class Game {
    constructor() {
        this.health = 10;
        this.maxHealth = 10;
        this.hunger = 10;
        this.maxHunger = 10;
        this.progress = 0;
        this.maxProgress = 20;
        this.supply = 3;
    }

    addHealth(add) {
        if (this.health + add > this.maxHealth) {
            this.health = this.maxHealth;
        } else if (this.health + add <= 0) {
            this.die();
        } else {
            this.health += add;
        }

        // visual update
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

        // visual update
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

        // visual update
        let meter = document.getElementById("travel");
        meter.value = this.progress;
    }

    useCookingSupply() {
        if (this.supply > 0) {
            // visual update
            this.supply -= 1;
            return true;
        } else {
            return false;
        }
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
            this.addHealth(this.health * -1);
        }        
    }

    eatCookedPlant(part) {
        // check poison/death
        let edibility = part.edibility;
        if ((edibility == "uncooked" ||
        edibility == "cooked")) {
            this.addHunger(4);
            this.useCookingSupply();
            this.addProgress();
        } else if (edibility == "poison") {
            this.addHunger(-2);
            this.addHealth(-2);
        } else if (edibility == "death") {
            this.addHealth(this.health * -1);
        }

    }

    moveOn() {
        this.addProgress();
        this.addHunger(-1);
    }

    die() {
        // MORTIS
        alert("MORTIS");
    }
}

let game = new Game();

// let moveOn = document.getElementById("moveOn");
// let eatUncooked = document.getElementById("eatUncooked");
// let eatCooked = document.getElementById("eatCooked");
let submit = document.getElementById("submit");
let image = document.getElementById("plantImage");

loadPlant(plants.get("taraxacumOfficinale"));

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

    console.log(part);

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
    // progress game
    loadNextPlant();
}

function loadNextPlant() {
    // find current plant
    let current = image.src;
    let next;
    let position = current.indexOf("images/");
    current = current.slice(position+7);
    current = current.slice(0, current.length - 4);

    // find next plant
    let getNext = false;
    for (const [key, value] of plants) {
        if (key == current) {
            getNext = true;
        } else if (getNext) {
            next = value;
            break;
        }
    }

    // load next plant
    loadPlant(next);
}

// add another set of buttons for each plant part
function loadPartsButtons(plant) {
    // let div = document.getElementById("partButtons");
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