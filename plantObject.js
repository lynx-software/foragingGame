const edibilityValues = ["uncooked", "cooked", "poison", "death"];

class PlantPart {
    #partName
    #edibility

    constructor(partName, edibility) {
        this.#partName = partName;
        let validEdibility = false;

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

    constructor(plantParts, src) {
        this.#parts = plantParts;
        this.#src = src;
    }

    get src() {
        return this.#src;
    }

    get parts() {
        return this.#parts;
    }

    allParts() {
        let parts = this.#parts;

        // shuffle
        parts.sort(function () {
            // generate random number between -0.5 and 0.5
            return 0.5 - Math.random();
        });

        return parts;
    }
}

let plants = new Map();

let entries = [["taraxacumOfficinale", new Plant([
    new PlantPart("flowers", "uncooked"),
    new PlantPart("young leaves", "uncooked")
], "images/taraxacumOfficinale.jpg")],
// By John Paul Endicott, CC BY 2.0 DEED, https://creativecommons.org/licenses/by/2.0/
["pinusStrobus", new Plant([
    new PlantPart("needles", "cooked")
], "images/pinusStrobus.jpg")],
// Rob Routledge, Creative Commons Attribution 3.0 Unported, https://creativecommons.org/licenses/by/3.0/deed.en
["taxusCanadensis", new Plant([
    new PlantPart("berries & seeds", "death")
], "images/taxusCanadensis.jpg")],
["urticaDiocia", new Plant([
    new PlantPart("leaves", "poison")
], "images/urticaDiocia.jpg")],
// By Dalgial - Own work, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=7343093
["articumLappa", new Plant([
    new PlantPart("young leaves", "cooked"),
    new PlantPart("flower stalks", "cooked")
], "images/articumLappa.jpg")],
["cicutaMaculata", new Plant([
    new PlantPart("roots", "death")
], "images/cicutaMaculata.jpg")],
["verbascumThapsus", new Plant([
    new PlantPart("leaves", "cooked")
], "images/verbascumThapsus.jpg")],
// Nicholas A. Tonelli from Pennsylvania, USA, CC BY 2.0 <https://creativecommons.org/licenses/by/2.0>, via Wikimedia Commons
["mitchellaRepens", new Plant([
    new PlantPart("berry", "uncooked")
], "images/mitchellaRepens.jpg")],
// James St. John, CC BY 2.0 <https://creativecommons.org/licenses/by/2.0>, via Wikimedia Commons
["fragariaVirginiana", new Plant([
    new PlantPart("berries", "uncooked"),
    new PlantPart("leaves", "cooked")
], "images/fragariaVirginiana.jpg")],
// sonnia hill, CC BY 2.0 <https://creativecommons.org/licenses/by/2.0>, via Wikimedia Commons
["physalisVirginiana", new Plant([
    new PlantPart("ripe fruit", "uncooked"),
    new PlantPart("unripe fruit", "poison"),
    new PlantPart("leaves", "poison")
], "images/physalisVirginiana.jpg")]
];

entries.sort(function () {
    return 0.5 - Math.random();
})

for (entry of entries) {
    plants.set(entry[0], entry[1]);
}