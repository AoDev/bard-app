import PropTypes from 'prop-types'
import React from 'react'
import {Button, Icon} from 'ui-framework'

/**
 * @typedef {import ('./AppSettingsVM').default} AppSettingsVM
 */

/**
 * @param {{vm: AppSettingsVM}} props
 */
export default function AppSettings({vm}) {
  const {settings} = vm

  return (
    <div className="padded-1">
      <div className="r-grid-fluid-colmin24em margin-bottom-4">
        <section className="panel--simple pos-rel padded-2 flex-center txt-center">
          <div>
            <h3 className="heading-section margin-0">App Settings</h3>
            <p>All changes are saved on the device automatically.</p>
          </div>
        </section>
        <section className="panel--simple flex-col pos-rel">
          <div className="bg-alternative padded-1">
            <h3 className="margin-0">UI Settings</h3>
          </div>
          <div className="padded-1 flex-fill">
            <div className="margin-bottom-1">
              <label className="label margin-right-1">
                Color theme: <i>{settings.theme}</i>
              </label>
            </div>

            <Button square className="padded-0" variant="neutral" onClick={settings.switchTheme}>
              <Icon name={settings.theme === 'light' ? '#sun' : '#moon'} small />
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

AppSettings.propTypes = {
  vm: PropTypes.shape({
    settings: PropTypes.shape({
      set: PropTypes.func.isRequired,
      someFlag: PropTypes.bool.isRequired,
      someOtherFlag: PropTypes.bool.isRequired,
      switchTheme: PropTypes.func.isRequired,
      theme: PropTypes.oneOf(['light', 'dark']),
    }),
  }),
}
