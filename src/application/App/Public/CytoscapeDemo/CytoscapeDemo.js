import PropTypes from 'prop-types'
import React from 'react'

const styles = {
  height: '500px',
  width: '500px',
}

export default class CytoscapeDemo extends React.Component {
  render () {
    const {vm} = this.props
    return (
      <React.Fragment>
        <button type="button" onClick={vm.addNode}>Add node</button>
        <div ref={vm.getMountRef} style={styles}/>
      </React.Fragment>
    )
  }
}

CytoscapeDemo.propTypes = {
  vm: PropTypes.shape({
    getMountRef: PropTypes.func.isRequired,
    addNode: PropTypes.func.isRequired,
  }).isRequired,
}
