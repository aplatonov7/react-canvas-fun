import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './SimplePaint.scss';

class SimplePaint extends Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      mouseDown: false,
      colors: ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white'],
      color: 'black'
    };
  }

  componentDidMount() {
    let container = ReactDOM.findDOMNode(this);
    let canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    this.state.ctx = canvas.getContext("2d");
    this.state.canvas = canvas;

    container.appendChild(canvas);

    window.onresize = () => {
      function cloneCanvas(oldCanvas) {
        //create a new canvas
        var newCanvas = document.createElement('canvas');
        var contextCopy = newCanvas.getContext('2d');
        newCanvas.width = oldCanvas.width;
        newCanvas.height = oldCanvas.height;
        contextCopy.drawImage(oldCanvas, 0, 0);
        return newCanvas;
      }

      let copy = cloneCanvas(canvas);
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      this.state.ctx.drawImage(copy, 0, 0);
    };
  }

  handleMouseMove(e) {
    e.preventDefault();
    let ctx = this.state.ctx;
    let line = this.state.line;

    function draw() {
      ctx.beginPath();
      ctx.moveTo(this.state.prevX, this.state.prevY);
      ctx.lineTo(this.state.currX, this.state.currY);
      ctx.strokeStyle = this.state.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      //ctx.arc(this.state.currX - 1, this.state.currY - 1, 1, 0, 2*Math.PI);
      //ctx.fillStyle = this.state.color;
      //ctx.fill();
      ctx.closePath();

      this.state.prevX = this.state.currX;
      this.state.prevY = this.state.currY;
    }

    function getCoords(elem) {
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }

    if (this.state.mouseDown) {
      let x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      let y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      this.state.currX = x - getCoords(this.state.canvas).left;
      this.state.currY = y - getCoords(this.state.canvas).top;
      draw.call(this);
    }
  }

  handleMouseDown(e) {
    function getCoords(elem) { // кроме IE8-
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }

    let x = e.type === 'touchmove' ? e.changedTouches[0].pageX : e.pageX;
    let y = e.type === 'touchmove' ? e.changedTouches[0].pageY : e.pageY;

    this.state.prevX = x - getCoords(this.state.canvas).left;
    this.state.prevY = y - getCoords(this.state.canvas).top;
    this.state.mouseDown = true;
  }

  handleMouseUp() {
    this.state.mouseDown = false;
  }

  handleMouseOut() {
    this.state.mouseDown = false;
  }

  clearCanvas() {
    this.state.ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
  }

  render() {
    return (
      <div className="paint-container"
           onMouseDown={(e) => this.handleMouseDown(e)}
           onTouchStart={(e) => this.handleMouseDown(e)}
           onMouseMove={(e) => this.handleMouseMove(e)}
           onTouchMove={(e) => this.handleMouseMove(e)}
           onMouseUp={(e) => this.handleMouseUp(e)}
           onTouchEnd={(e) => this.handleMouseUp(e)}
           onMouseOut={(e) => this.handleMouseOut(e)}
      >
        <div className="clear" onClick={(e) => this.clearCanvas(e)}>Clear</div>
        <ul className="pallete">
          {this.state.colors.map(c => {
            let btnClasses = "pallete-color";
            if (c === this.state.color) btnClasses += " active";
            return <li className={btnClasses} key={c} style={{backgroundColor: c}}
                       onClick={() => this.setState({color: c})}/>
          })}
        </ul>
      </div>
    );
  }
}

export default SimplePaint;
