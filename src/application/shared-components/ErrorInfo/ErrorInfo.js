import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Note} from 'ui-framework'

/**
 * @param {{error: Error, stackHidden: boolean}} props
 */
export function ErrorInfo (props) {
  const {error, stackHidden} = props
  return (
    <React.Fragment>
      {error.message &&
        <Note variant="red">
          Message
          <textarea className="textarea inputfield txt-mono" defaultValue={error.message} readOnly/>
        </Note>
      }

      {!stackHidden && error.stack &&
        <Note variant="red">
          Stack
          <textarea className="textarea inputfield txt-mono" defaultValue={error.stack} readOnly/>
        </Note>
      }
    </React.Fragment>
  )
}

ErrorInfo.propTypes = {
  error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.instanceOf(TypeError)]),
}

ErrorInfo.defaultProps = {
  stackHidden: false,
}

export default observer(ErrorInfo)
