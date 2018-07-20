class ColorHandler {
    constructor(color) {
        if (color.length === 0) {
            throw new Error('colors not passed')
        }

        this.color = color.map(x => this._readColor(x));
    }

    _readColor(color) {
        return color.match(/[A-Fa-f0-9]{2}/g).map(x => parseInt(x, 16));
    }

    getColor(percent) {
        if (this.color.length === 1) {
            return {
                r: this.color[0][0],
                g: this.color[0][1],
                b: this.color[0][2]
            };
        }

        let interval = 100 / (this.color.length - 1);
        let colorInterval = Math.ceil(percent / interval);

        let firstColor = this.color[colorInterval - 1] || this.color[0];
        let secondColor = this.color[colorInterval] || this.color[this.color.length - 1];

        percent = percent / interval % 1;
        percent = percent === 0 ? 1 : percent;
        let w1 = 1 - (percent);
        let w2 = percent;
        
        let [r, g, b] = 
            [Math.round(firstColor[0] * w1 + secondColor[0] * w2),
            Math.round(firstColor[1] * w1 + secondColor[1] * w2),
            Math.round(firstColor[2] * w1 + secondColor[2] * w2)];

        return {r,g,b};
    }
}

export default ColorHandler;