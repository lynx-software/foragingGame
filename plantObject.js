class Plant {
    constructor(uncookedPartsArray, cookedPartsArray, poisonPartsArray, deathPartsArray, image) {
        this.ediblePartsUncooked = uncookedPartsArray;
        this.ediblePartsCooked = cookedPartsArray;
        this.poisonParts = poisonPartsArray;
        this.deathParts = deathPartsArray;
        this.image = image;
    }

    get imageSrc() {
        return this.image;
    }

    get uncooked() {
        return this.ediblePartsUncooked;
    }

    get cooked() {
        return this.ediblePartsCooked;
    }

    get poison() {
        return this.poisonParts;
    }

    get death() {
        return this.deathParts;
    }

    get allParts() {
        let parts = [];
        let arrays = [];
        arrays.push(this.deathParts);
        arrays.push(this.poisonParts);
        arrays.push(this.ediblePartsCooked);
        arrays.push(this.ediblePartsUncooked);

        // iterate through all 4 arrays to compile into 1 array
        for (let i = 0; i < arrays.length; i++) {
            for (let j = 0; j < arrays[i].length; j++) {
                parts.push(arrays[i][j]);
            }
        }

        // shuffle
        parts.sort(function() {
            // generate random number between -0.5 and 0.5
            return 0.5 - Math.random();
        });

        return parts;
    }
}

let plantsArray = [
    commonDandelion = new Plant(["flower", "young leaves"], ["roots"], [], []),
    pineTree = new Plant([], ["needles"], [], []),
    juniperTree = new Plant([], [], [], ["berry"])
];