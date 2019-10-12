import React from 'react'
import {observer} from 'mobx-react'

export function Faq () {
  return (
    <div className="r-grid-fluid-colmin24em md-padded-1 space-bottom-4">
      <div className="md-panel-group flex-col">
        <div className="bg-gray padded-1">
          <h3 className="space-0 h-header">How to contact us?</h3>
        </div>
        <div className="bg-white padded-1 flex-fill">
          <p>
            Send an email at <strong>info_example@bard.dev</strong>.
          </p>
        </div>
      </div>

      <div className="md-panel-group flex-col">
        <div className="bg-gray padded-1">
          <h3 className="space-0 h-header">How does it work?</h3>
        </div>
        <div className="bg-white padded-1 flex-fill">
          <p>Bard is a guideline with a set of tools to help build mobx react app.</p>
        </div>
      </div>
    </div>
  )
}

export default observer(Faq)
