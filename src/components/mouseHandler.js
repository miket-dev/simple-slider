class MouseHandler {
    constructor(parentMin, parentMax, minValue = 0, maxValue = 0, steps = null)
    {
        this.parentMin = parentMin;
        this.parentMax = parentMax;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.lastKnownPosition = parentMin;
        this.steps = steps;
    }

    fixPosition(position) {
        if (this.steps) {
            let step = this.steps
                .map(x => this.getPosition(x / 100))
                .reduce((a, b) => {
                return (Math.abs(b - (position.x - this.parentMin)) < Math.abs(a - (position.x - this.parentMin)) ? b : a);
              });

            position.x = step + this.parentMin;
        } else {
            position.x = position.x < this.parentMin ? this.parentMin : position.x;
            position.x = position.x > this.parentMax ? this.parentMax : position.x;
        }

        this.lastKnownPosition = position.x;
        
        return position;
    }

    currentMousePosition(e) {
        let ev = e || window.event;
        let x = 0;

        let eventDoc = (ev.target && ev.target.ownerDocument) || document;
        let doc = eventDoc.documentElement;
        let body = eventDoc.body;

        x = ev.clientX +
            ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
            ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);

        x = isNaN(x) ? (ev.touches[0] && ev.touches[0].pageX) : x;

        if (!x) {
            x = this.lastKnownPosition;
        }

        return this.fixPosition({x});
    }

    _currentPosition() {
        return this.lastKnownPosition - this.parentMin;
    }

    currentPercent()
    {
        return this._currentPosition() / (this.parentMax - this.parentMin);
    }

    currentValue() {
        if (this.maxValue === 0 && this.minValue === 0) {
            return this._currentPosition();
        }

        return this.currentPercent() * (this.maxValue - this.minValue) + this.minValue;
    }

    setPosition(x) {
        this.lastKnownPosition = x * ((this.parentMax - this.parentMin) / 100) + this.parentMin;
        return this.lastKnownPosition;
    }

    getPosition(percent) {
        return percent * (this.parentMax - this.parentMin);
    }
}

export default MouseHandler;