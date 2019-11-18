class Planet {
    constructor(name, diameter) {
        this.name = name;
        this.diameter = diameter;
    }

    calculatePlanetVolume() {
        const Pi = 3.1415926535;

        return ((4 / 3) * Pi * this.diameter ** 3).toFixed(3);
    }

    getDetailsOfPlaten() {
        return `Планета ${this.name} має об'єм ${this.calculatePlanetVolume()} кубічних одиниць`;
    }
}

module.exports = new Planet('Earth', 12756);
