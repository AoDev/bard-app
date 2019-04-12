import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Note} from 'ui-framework'

export function ErrorInfo (props) {
  const {error} = props
  return (
    <React.Fragment>
      {error.message && !error.stack &&
        <Note variant="red">
          <textarea className="textarea inputfield txt-mono" defaultValue={error.message} readOnly/>
        </Note>
      }

      {error.stack &&
        <Note variant="red">
          <textarea className="textarea inputfield txt-mono" defaultValue={error.stack} readOnly/>
        </Note>
      }
    </React.Fragment>
  )
}

ErrorInfo.propTypes = {
  error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.instanceOf(TypeError)]),
}

export default observer(ErrorInfo)
