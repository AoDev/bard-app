import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Modal, Button} from 'ui-framework'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export function DemoModals({vm}) {
  return (
    <React.Fragment>
      <h3 className="space-top-0">Modals</h3>
      <Button onClick={vm.testModal.show}>Show modal</Button>
      <Modal modalVM={vm.testModal}>
        <h3>Modal title</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, at aperiam! Recusandae,
          architecto obcaecati perspiciatis odio, asperiores quaerat nulla iure rem praesentium et,
          in aperiam. Ipsum maiores et incidunt ad.
        </p>
      </Modal>

      <Button onClick={vm.testConfirmDialog.show} disabled={vm.userHasConfirmedModal !== null}>
        {vm.userHasConfirmedModal === true
          ? 'You confirmed...'
          : vm.userHasConfirmedModal === false
          ? 'You canceled...'
          : 'Show confirm dialog'}
      </Button>

      <Modal modalVM={vm.testConfirmDialog}>
        <h3>Modal title</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, at aperiam! Recusandae,
          architecto obcaecati perspiciatis odio, asperiores quaerat nulla iure rem praesentium et,
          in aperiam. Ipsum maiores et incidunt ad.
        </p>
      </Modal>
    </React.Fragment>
  )
}

DemoModals.propTypes = {
  vm: PropTypes.shape({
    testConfirmDialog: PropTypes.shape({
      show: PropTypes.func.isRequired,
    }),
    testModal: PropTypes.shape({
      show: PropTypes.func.isRequired,
    }),
    userHasConfirmedModal: PropTypes.bool,
  }),
}

export default observer(DemoModals)
