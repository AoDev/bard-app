import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Modal} from 'ui-framework'
import {appLogo} from 'app-images'

/**
 * @typedef {import ('../shared-components/viewModels/ConfirmDialogVM').default} ConfirmDialogVM
 */

/**
 * @param {{appUpdateDialog: ConfirmDialogVM}} props
 */
export function AppUpdateNotification({appUpdateDialog}) {
  return (
    <Modal modalVM={appUpdateDialog} confirmText="Update now" small>
      <div className="padded-1">
        <div className="flex-row-center">
          <img src={appLogo} height="64" width="64" alt="Bard" />
          <h2 className="h-header margin-left-1">Update available</h2>
        </div>
        <p>The app will restart to get the latest improvements.</p>
      </div>
    </Modal>
  )
}

AppUpdateNotification.propTypes = {
  appUpdateDialog: PropTypes.shape({}).isRequired,
}

export default observer(AppUpdateNotification)
