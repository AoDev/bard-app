import PropTypes from 'prop-types'
import React from 'react'
import {Modal, Button} from 'ui-framework'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export default function UIFramework ({vm}) {
  return (
    <div className="padded-1">
      <h2>UIFramework</h2>
      <h3>Modal</h3>
      <Button onClick={vm.testModal.show}>Show modal</Button>
      <Modal modalVM={vm.testModal}>
        <h3>Modal title</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, at aperiam! Recusandae, architecto obcaecati perspiciatis odio, asperiores quaerat nulla iure rem praesentium et, in aperiam. Ipsum maiores et incidunt ad.</p>
      </Modal>

      <Button onClick={vm.testConfirmDialog.show}>Show confirm dialog</Button>
      <Modal modalVM={vm.testConfirmDialog}>
        <h3>Modal title</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, at aperiam! Recusandae, architecto obcaecati perspiciatis odio, asperiores quaerat nulla iure rem praesentium et, in aperiam. Ipsum maiores et incidunt ad.</p>
      </Modal>
    </div>
  )
}

UIFramework.propTypes = {
  vm: PropTypes.shape({}).isRequired,
}