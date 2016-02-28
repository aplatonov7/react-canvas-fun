import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './GameOfLife.scss';

class GameOfLife extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let container = ReactDOM.findDOMNode(this);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext("2d");

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    this.setState({
      canvas: canvas,
      ctx: ctx
    });

    container.appendChild(canvas);

    ctx.fillStyle = "#ddd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < canvas.width; i += 6) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.strokeStyle = "#fff";
      ctx.stroke();
      ctx.closePath();
    }

    for (let i = 0; i < canvas.height; i += 6) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.strokeStyle = "#fff";
      ctx.stroke();
      ctx.closePath();
    }

    window.onresize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
  }

  render() {
    return (
      <div className="game-container">

      </div>
    );
  }
}

export default GameOfLife;
