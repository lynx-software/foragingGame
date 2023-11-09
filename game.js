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
        } else if (this.health + add < 0) {
            this.health = 0;
            // MORTIS
        } else {
            this.health += add;
        }

        // visual update
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
    }

    addProgress() {
        if (this.progress + 1 > this.maxProgress) {
            this.progress = this.maxProgress;
            // end game
        } else {
            this.progress += 1;
        }

        // visual update
    }

    eatUncookedPlant(plant, part) {
        // check poison/death
        this.addHunger(2);
    }

    eatCookedPlant(plant, part) {
        // check poison/death
        this.addHunger(4);
        // decrement supply
    }

    moveOn() {
        this.addProgress();
        this.addHunger(1);
    }
}

let game = new Game();

let moveOn = document.getElementById("moveOn");
let eatUncooked = document.getElementById("eatUncooked");
let eatCooked = document.getElementById("eatCooked");
let submit = document.getElementById("submit");
let image = document.getElementById("plantImage");

loadPlant(plants.get("taraxacumOfficinale"));

moveOn.addEventListener("click", moveOn);
eatCooked.addEventListener('click', eatCooked);
eatUncooked.addEventListener("click", eatUncooked);
submit.addEventListener("click", () => {
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
})

// add another set of buttons for each plant part
function loadPartsButtons(plant) {
    let div = document.getElementById("partButtons");
    let parts = plant.allParts();

    div.innerHTML = "";

    for (let i = 0; i < parts.length; i++) {
        const button = document.createElement("button");
        let partName = parts[i].name;

        button.textContent = partName;
        button.value = partName;
        button.id = partName;

        div.appendChild(button);
    }
}

function loadPlant(plant) {
    loadPartsButtons(plant);
    image.src = plant.src;
}