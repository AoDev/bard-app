import PropTypes from 'prop-types'
import React from 'react'
import {Switch, InputBasic, Button, Icon} from 'ui-framework'

/**
* @typedef {import ('./AppSettingsVM').default} AppSettingsVM
*/

/**
* @param {{vm: AppSettingsVM}} props
*/
export default function AppSettings ({vm}) {
  const {settings} = vm
  const btnVariant = settings.theme === 'light' ? 'neutral' : 'neutral-inverse'

  return (
    <div className="r-grid-fluid-colmin24em md-padded-1 space-bottom-4">
      <section className="md-panel-group flex-col pos-rel">
        <div className="bg-darken padded-1">
          <h3 className="h-header space-0">Setting section</h3>
        </div>
        <div className="padded-1 flex-fill">
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
        <div className="bg-darken padded-1">
          <h3 className="h-header space-0">Other settings</h3>
        </div>
        <div className="padded-1 flex-fill">
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

      <section className="md-panel-group flex-col pos-rel">
        <div className="bg-darken padded-1">
          <h3 className="h-header space-0">UI</h3>
        </div>
        <div className="padded-1 flex-fill">
          <div className="space-bottom-1">
            <label className="label space-right-1">
              Color theme: <i>{settings.theme}</i>
            </label>
          </div>

          <Button
            square
            className="padded-0"
            variant={btnVariant}
            onClick={settings.switchTheme}>
            <Icon name={settings.theme === 'light' ? '#sun' : '#moon'} small/>
          </Button>
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
