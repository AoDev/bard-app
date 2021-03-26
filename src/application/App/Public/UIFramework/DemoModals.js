import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Modal, Button, Input} from 'ui-framework'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export function DemoModals({vm}) {
  return (
    <React.Fragment>
      <div className="md-padded-2">
        <div className="margin-bottom-1">
          <Button onClick={vm.testModal.show}>Show modal</Button>
          <Modal
            modalVM={vm.testModal}
            small={vm.inputSmallModal}
            hideOnClickOut={vm.inputHideOnOverlayClick}
            withCloseButton={vm.inputModalWithCloseButton}
          >
            <div className="md-padded-2">
              <h3>Modal title</h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, at aperiam!
                Recusandae, architecto obcaecati perspiciatis odio, asperiores quaerat nulla iure
                rem praesentium et, in aperiam. Ipsum maiores et incidunt ad.
              </p>
            </div>
          </Modal>
        </div>
        <div className="margin-bottom-1">
          <Button onClick={vm.testModalWithTransition.show}>Show modal with transition</Button>
          <Modal
            modalVM={vm.testModalWithTransition}
            small={vm.inputSmallModal}
            hideOnClickOut={vm.inputHideOnOverlayClick}
            withCloseButton={vm.inputModalWithCloseButton}
          >
            <div className="md-padded-2">
              <h3>Modal title</h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, at aperiam!
                Recusandae, architecto obcaecati perspiciatis odio, asperiores quaerat nulla iure
                rem praesentium et, in aperiam. Ipsum maiores et incidunt ad.
              </p>
            </div>
          </Modal>
        </div>
        <div className="margin-bottom-1">
          <div className="flex-row-center">
            <Button
              onClick={vm.testConfirmDialog.show}
              disabled={vm.userHasConfirmedModal !== null}
            >
              {vm.userHasConfirmedModal === true
                ? 'You confirmed...'
                : vm.userHasConfirmedModal === false
                ? 'You canceled...'
                : 'Show confirm dialog'}
            </Button>
          </div>
          <Modal
            modalVM={vm.testConfirmDialog}
            small={vm.inputSmallModal}
            hideOnClickOut={vm.inputHideOnOverlayClick}
            withCloseButton={vm.inputModalWithCloseButton}
          >
            <div className="md-padded-2">
              <h3>Modal title</h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, at aperiam!
                Recusandae, architecto obcaecati perspiciatis odio, asperiores quaerat nulla iure
                rem praesentium et, in aperiam. Ipsum maiores et incidunt ad.
              </p>
            </div>
          </Modal>
        </div>
      </div>

      <div className="bg-alternative md-padded-2">
        <div className="grid-fluid-colmin10em">
          <div>
            <Input
              id="inputSmallModal"
              type="checkbox"
              value={vm.inputSmallModal}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputSmallModal"
            />
            <label className="label margin-left-1" htmlFor="inputSmallModal">
              small
            </label>
          </div>
          <div>
            <Input
              id="inputModalWithCloseButton"
              type="checkbox"
              value={vm.inputModalWithCloseButton}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputModalWithCloseButton"
            />
            <label className="label margin-left-1" htmlFor="inputModalWithCloseButton">
              withCloseButton
            </label>
          </div>
          <div>
            <Input
              id="inputHideOnOverlayClick"
              type="checkbox"
              value={vm.inputHideOnOverlayClick}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputHideOnOverlayClick"
            />
            <label className="label margin-left-1" htmlFor="inputHideOnOverlayClick">
              hideOnClickOut
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

DemoModals.propTypes = {
  vm: PropTypes.shape({
    inputHideOnOverlayClick: PropTypes.any,
    inputModalWithCloseButton: PropTypes.any,
    inputSmallModal: PropTypes.any,
    testConfirmDialog: PropTypes.shape({
      show: PropTypes.func.isRequired,
    }),
    testModal: PropTypes.shape({
      show: PropTypes.func.isRequired,
    }),
    testModalWithTransition: PropTypes.shape({
      show: PropTypes.any,
    }),
    toggle: PropTypes.any,
    userHasConfirmedModal: PropTypes.bool,
  }),
}

export default observer(DemoModals)
