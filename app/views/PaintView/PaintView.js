import React, {Component}  from 'react'
import SimplePaint from '../../components/SimplePaint/SimplePaint';

export class PaintView extends Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <SimplePaint />
      </div>
    )
  }
}

export default PaintView;