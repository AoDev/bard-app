import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import ErrorInfo from 'shared-components/ErrorInfo'

/**
 * Display an error message on unexpected errors.
 * This one shows errors not caught by React ErrorBoundary. (ErrorBoundary is for UI crashes)
 */
export function UnexpectedError(props) {
  const {rootStore} = props
  return (
    <React.Fragment>
      <h3 className="padded-h-2 txt-negative">An unexpected error has occured</h3>
      <div className="r-panel padded-2">
        <p className="margin-top-0">
          It is recommended that you restart the application and report the issue.
        </p>
        <h4>How to report the issue</h4>
        <p>
          You can also send an email at <strong>info_example@bard.dev</strong>.
        </p>
        <hr />
        <h4>Error details</h4>
        <ErrorInfo error={rootStore.unexpectedError} />
      </div>
    </React.Fragment>
  )
}

UnexpectedError.propTypes = {
  rootStore: PropTypes.shape({
    unexpectedError: PropTypes.instanceOf(Error),
  }).isRequired,
}

export default observer(UnexpectedError)
