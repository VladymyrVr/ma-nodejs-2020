class Planet {
    constructor(name, diameter) {
        this.name = name;
        this.diameter = diameter;
    }

    calculatePlanetVolume() {
        const Pi = 3.1415926535;

        return (4/3 * Pi * Math.pow(this.diameter, 3)).toFixed(3);
    }

    getDetailsOfPlaten() {
        return `Планета ${this.name} має об'єм ${this.calculatePlanetVolume()} кубічних одиниць`
    }
}

const MARS = new Planet('Mars', 20);

console.log(MARS.calculatePlanetVolume());
console.log(MARS.getDetailsOfPlaten());
