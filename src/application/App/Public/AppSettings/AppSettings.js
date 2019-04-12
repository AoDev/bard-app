import PropTypes from 'prop-types'
import React from 'react'
import {Switch, InputBasic} from 'ui-framework'

export default function AppSettings ({vm}) {
  const {settings} = vm
  return (
    <div className="r-grid-fluid-colmin32em space-bottom-4">
      <section className="md-panel-group flex-col pos-rel">
        <div className="bg-gray lg-padded-v1-h2">
          <h3 className="h-header space-0">Setting section</h3>
        </div>
        <div className="bg-white lg-padded-2 flex-fill">
          <div className="input-group">
            <label className="label space-right-1" htmlFor="settings-some-flag">
              Some flag
            </label>
            <Switch
              id="settings-some-flag"
              name="someFlag"
              value={settings.someFlag}
              onChange={settings.set}
              onChangeEmit="name-value"/>
          </div>
        </div>
      </section>

      <section className="md-panel-group flex-col pos-rel">
        <div className="bg-gray lg-padded-v1-h2">
          <h3 className="h-header space-0">Other settings</h3>
        </div>
        <div className="bg-white lg-padded-2 flex-fill">
          <div className="input-group">
            <label className="label space-right-1" htmlFor="settings-some-other-flag">
              Some other flag
            </label>
            <InputBasic
              type="checkbox"
              id="settings-some-other-flag"
              name="someOtherFlag"
              value={settings.someOtherFlag}
              onChange={settings.set}
              onChangeEmit="name-value"/>
          </div>
        </div>
      </section>
    </div>
  )
}

AppSettings.propTypes = {
  vm: PropTypes.shape({
    settings: PropTypes.shape({
      someFlag: PropTypes.bool.isRequired,
      someOtherFlag: PropTypes.bool.isRequired,
      set: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
}
