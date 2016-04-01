import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

class GameOfLife extends Component {
  static defaultProps = {
    size: 20,
    colors: {
      background: '#ddd',
      grid: '#fff',
      cell: '#0a0'
    },
    speed: 1000
  }

  constructor() {
    super();
  }

  componentDidMount() {
    let container = ReactDOM.findDOMNode(this);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext("2d");

    this.setState({
      canvas,
      ctx,
      container
    });

    this.drawGrid(canvas, ctx, container);
    this.init(canvas);
  }

  init(canvas) {
    let universe = [];
    let {width, height} = canvas;

    this.generateUniverse(universe, width, height);
  }

  generateUniverse(universe, width, height) {
    let size = this.props.size;

    for (let i = 0; i < height / size; i++) {
      universe[i] = [];
      for (let j = 0; j < width / size; j++) {
        universe[i][j] = Math.round(Math.random());
      }
    }

    this.setState({
      universe
    });

    setTimeout(this.generateUniverse.bind(this, universe, width, height), this.props.speed);
  }

  drawGrid(canvas, ctx, container) {
    let size = this.props.size;
    let colors = this.props.colors;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    ctx.fillStyle = colors.background;
    ctx.strokeStyle = colors.grid;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    for (let i = 0; i < canvas.width; i += size) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
    }

    for (let i = 0; i < canvas.height; i += size) {
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
    }

    ctx.stroke();
    ctx.closePath();

    container.appendChild(canvas);
  }

  drawPoint(e, state) {
    let {ctx, canvas} = state;
    let size = this.props.size;
    let color = this.props.colors.cell;
    let {top, left} = canvas.getBoundingClientRect();
    let ex = e.pageX - left,
        ey = e.pageY - top,
        x = ex - ex % size,
        y = ey - ey % size;

    ctx.fillStyle = color;
    ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
  }

  draw(state) {
    if (!state) return;
    let {universe, ctx} = state;
    let size = this.props.size;

    for (let i = 0; i < universe.length; i++) {
      for (let j = 0; j < universe[i].length; j++) {
        if (universe[i][j] === 1) {
          ctx.fillStyle = this.props.colors.cell;
        } else {
          ctx.fillStyle = this.props.colors.background;
        }
        ctx.fillRect(j * size + 1, i * size + 1, size - 2, size - 2);
      }
    }
  }

  render() {
    this.draw(this.state);

    return (
      <div className="game-container" onClick={e => this.drawPoint(e, this.state)}>

      </div>
    );
  }
}

export default GameOfLife;
