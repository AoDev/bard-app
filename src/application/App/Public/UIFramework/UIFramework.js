import PropTypes from 'prop-types'
import React from 'react'
import DemoModals from './DemoModals'
import DemoTables from './DemoTables'
import DemoButtons from './DemoButtons'
import DemoForms from './DemoForms'
import DemoNotes from './DemoNotes'
import {Button, Icon} from 'ui-framework'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export default function UIFramework({vm}) {
  const {settings} = vm

  return (
    <div className="r-grid-fluid-colmin32em margin-bottom-2">
      <section className="panel--simple pos-rel padded-2 flex-center txt-center">
        <div>
          <h3 className="heading-section">UI Framework</h3>
          <Button square className="padded-0" variant="neutral" onClick={settings.switchTheme}>
            <Icon name={settings.theme === 'light' ? '#sun' : '#moon'} small />
          </Button>
          <div className="label margin-top-05">Light / Dark</div>
          <p>Check this demo source code for actual coding.</p>
        </div>
      </section>
      <div className="panel--simple">
        <div className="bg-alternative md-padded-2">
          <h3 className="margin-0">Modals</h3>
        </div>
        <DemoModals vm={vm} />
      </div>

      <DemoButtons vm={vm} />
      <DemoTables vm={vm} />
      <DemoForms vm={vm} />
      <DemoNotes vm={vm} />
    </div>
  )
}

UIFramework.propTypes = {
  vm: PropTypes.shape({
    settings: PropTypes.shape({
      switchTheme: PropTypes.any,
      theme: PropTypes.string,
    }),
  }),
}
