import React, { Component } from 'react';
import mouseHandler from '../mouseHandler'
import Range from '../range/range'
import PropTypes from 'prop-types'
import '../../scss/slider.scss'

class Slider extends Component
{
    static propTypes = {
        value: PropTypes.number,
        color: PropTypes.arrayOf(PropTypes.string),
        onUpdateValue: PropTypes.func,
        onMove: PropTypes.func,
        minValue: PropTypes.number,
        maxValue: PropTypes.number,
        steps: PropTypes.arrayOf(PropTypes.number),
        disabled : PropTypes.bool
    }

    static defaultProps = {
        color: ['#dc3545', '#FFFF00', '#28a745'],
        minValue : 0,
        maxValue : 200,
        disabled: false
    }
    
    constructor(props)
    {
        super(props);

        this.state = { 
            dragging : false,
            currentX : 0
        };
    }

    startMove = (e) => {
        let allowDragging = !this.props.disabled;
        this.setState(prevState => prevState.dragging = allowDragging);
    }

    onMove = (e) => {
        if (this.state.dragging) {
            let position = this.mouseHandler.currentMousePosition(e);

            this.sliderElement.style.left = (position.x - this.initialX) + 'px';
            this.raiseOnMoveUpdate();
        }
    }

    endMove = (e) => {
        if (this.state.dragging) {
            let pos = this.mouseHandler.currentMousePosition(e);

            this.setState({
                dragging: false,
                currentX : pos.x,
            });

            this.raiseUpdateValue();
        }
    }

    resize = () => {
        this.init();
    }

    init() {
        let x = this.sliderElement.parentElement.offsetLeft;
        let lastPercent = this.mouseHandler && this.mouseHandler.currentPercent();
        this.mouseHandler = new mouseHandler(
            this.sliderElement.parentElement.offsetLeft,
            this.sliderElement.parentElement.offsetWidth - 
                this.sliderElement.clientWidth +
                x,
            this.props.minValue,
            this.props.maxValue,
            this.props.steps
        );

        this.initialX = x;
        if (this.props.value && !lastPercent) {
            x += this.mouseHandler.setPosition(this.props.value) - this.initialX;
        } else if (lastPercent) {
            x = this.mouseHandler.setPosition(lastPercent * 100);
        }

        this.raiseUpdateValue();
        this.setState(prevState => prevState.currentX = x);
    }

    componentDidMount() {
        console.log('mount!');
        window.addEventListener('mousemove', this.onMove);
        window.addEventListener('mouseup', this.endMove);
        window.addEventListener('touchend', this.endMove);
        window.addEventListener('resize', this.resize)

        this.init();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.value !== nextProps.value)
        {
            let x = this.sliderElement.parentElement.offsetLeft + 
                this.mouseHandler.setPosition(nextProps.value) - this.initialX;

            this.raiseUpdateValue();

            this.setState(prevState => prevState.currentX = x);
        }
    } 

    raiseOnMoveUpdate() {
        if (this.props.onMove) {
            this.props.onMove(this, this._createArgs());
        }

        this.rangeElement.updatePercent(this.mouseHandler.currentPercent());
    }

    _createArgs() {
        return {
            currentValue : this.mouseHandler.currentValue(),
            currentPercent : this.mouseHandler.currentPercent() * 100
        };
    }

    raiseUpdateValue() {
        if (this.props.onUpdateValue) {
            this.props.onUpdateValue(this, this._createArgs());
        }

        this.rangeElement.updatePercent(this.mouseHandler.currentPercent());
    }

    handleRangeClick = (e) => {
        let position = this.mouseHandler.currentMousePosition(e);
        let x = this.sliderElement.parentElement.offsetLeft + position.x - this.initialX

        this.raiseUpdateValue();
        this.setState(prevState => prevState.currentX = x);
    }

    render() {
        let animate = !this.state.dragging || (this.state.dragging && this.props.steps);
        let sliderElement = <div className={"slider_element " + ((animate && 'animate') || null)} ref={(val) => this.sliderElement = val} 
                style={{left: `${this.state.currentX - this.initialX}px`}}
                onTouchStart={this.startMove}
                onTouchMove={this.onMove}
                onMouseDown={this.startMove} 
                onMouseUp={this.endMove}></div>;
        
        return <div className={'slider_container ' + (this.props.disabled && "disabled") || null}>
            {sliderElement}
            <Range 
                color={this.props.color}
                ref={(val) => this.rangeElement = val}
                onClick={this.handleRangeClick.bind(this)} />
        </div>
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.onMove);
        window.removeEventListener('mouseup', this.endMove);
        window.removeEventListener('touchend', this.endMove);
        window.removeEventListener('resize', this.resize)
    }
}

export default Slider