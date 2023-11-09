const edibilityValues = ["uncooked", "cooked", "poison", "death"];

class PlantPart {
    #partName
    #edibility

    constructor (partName, edibility) {
        this.#partName = partName;
        let validEdibility = false;

        // change to while loop?
        for (let i = 0; (i < edibilityValues.length) && (!validEdibility); i++) {
            if (edibility == edibilityValues[i]) {
                validEdibility = true;
            }
        }

        if (validEdibility) {
            this.#edibility = edibility;
        } else {
            throw error("Invalid edibility value");
        }
    }

    get name() {
        return this.#partName;
    }

    get edibility() {
        return this.#edibility;
    }
}

class Plant {
    #parts
    #src

    constructor (plantParts, src) {
        // // change this to a PlantPart class
        this.#parts = plantParts;
        this.#src = src;
    }

    get src() {
        return this.#src;
    }

    allParts() {
        let parts = this.#parts;
        // console.log(`full parts array:${this.#parts}`);

        // shuffle
        parts.sort(function() {
            // generate random number between -0.5 and 0.5
            return 0.5 - Math.random();
        });

        // console.log(`parts: ${parts}`);
        return parts;
    }
    
    partEdibility (partName) {
        for (let i = 0; i < this.#parts.length; i++) {
            if (this.#parts[i].partName == partName) {
                return this.#parts[i].partEdibility;
            }
        }
        throw error(`part name ${partName} not found for ${this}`);
    }
}

let plants = new Map();

plants.set("taraxacumOfficinale", new Plant([
    new PlantPart("flowers", "uncooked"),
    new PlantPart("young leaves", "uncooked")
], "images/taraxacumOfficinale.jpg"));
plants.set("pinusStrobus", new Plant([
    new PlantPart("needles", "cooked")
], "images/pinusStrobus.jpg"));
// By Rob Routledge, Sault College, Bugwood.org - http://www.forestryimages.org/browse/detail.cfm?imgnum=5443106, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=42049155
plants.set("taxusCanadensis", new Plant([
    new PlantPart("berries", "death")
], "images/taxusCanadensis.jpg"));
// By Skalle-Per Hedenhös - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=80510587
plants.set("urticaDiocia", new Plant([
    new PlantPart("leaves", "poison")
], "images/urticaDiocia.jpg"));