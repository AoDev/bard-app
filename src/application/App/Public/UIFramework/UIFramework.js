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
    <div className="padded-1">
      <div className="padded-h-1 margin-bottom-2 flex-row-center">
        <h2>UI Framework</h2>
        <Button
          square
          className="margin-left-1 padded-0"
          variant="neutral"
          onClick={settings.switchTheme}
        >
          <Icon name={settings.theme === 'light' ? '#sun' : '#moon'} small />
        </Button>
      </div>
      <div className="r-grid-fluid-colmin24em margin-bottom-2">
        <div className="panel--simple">
          <div className="bg-alternative padded-1">
            <h3 className="margin-0">Modals</h3>
          </div>
          <DemoModals vm={vm} />
        </div>

        <DemoButtons vm={vm} />
        <DemoTables vm={vm} />
        <DemoForms vm={vm} />
        <DemoNotes vm={vm} />
      </div>
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
