import {Button, Input, Modal, Select} from '@ui'
import {observer} from 'mobx-react'
import type {UIFrameworkVM} from './UIFrameworkVM'

export const DemoModals = observer(({vm}: {vm: UIFrameworkVM}) => {
  return (
    <section className="panel--simple" id="section-modals">
      <div className="pad-default">
        <div className="panel__header">
          <h3 className="h3">Modals</h3>
        </div>
        <div className="flex-row-center gap-1">
          <Button variant="discreet" onClick={vm.testModal.show}>
            Show modal
          </Button>
          <Modal
            fullscreen={vm.iModalFullscreen}
            width={vm.iModalWidth}
            modalVM={vm.testModal}
            withCloseButton={vm.inputModalWithCloseButton}
          >
            <div className="pad-default">
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

      <div className="bg-alternative pad-default">
        <div className="grid grid-colmin10em">
          <div>
            <div>
              <label className="label" htmlFor="iModalWidth">
                width
              </label>
            </div>
            <Select
              id="iModalWidths"
              className="select"
              onChangeNameValue={vm.set}
              name="iModalWidth"
              value={vm.iModalWidth}
              options={['1x', '2x', '3x', '4x']}
            />
          </div>
          <div>
            <Input
              id="inputModalWithCloseButton"
              type="checkbox"
              value={vm.inputModalWithCloseButton}
              onChangeNameValue={vm.toggle}
              name="inputModalWithCloseButton"
            />
            <label className="label margin-left-1" htmlFor="inputModalWithCloseButton">
              withCloseButton
            </label>
          </div>
          <div>
            <Input
              id="iModalFullscreen"
              type="checkbox"
              value={vm.iModalFullscreen}
              onChangeNameValue={vm.toggle}
              name="iModalFullscreen"
            />
            <label className="label margin-left-1" htmlFor="iModalFullscreen">
              fullscreen
            </label>
          </div>
          {/* <div>
            <Input
              id="inputHideOnOverlayClick"
              type="checkbox"
              value={vm.inputHideOnOverlayClick}
              onChangeNameValue={vm.toggle}
              name="inputHideOnOverlayClick"
            />
            <label className="label margin-left-1" htmlFor="inputHideOnOverlayClick">
              hideOnClickOut
            </label>
          </div> */}
        </div>
      </div>
    </section>
  )
})
