import React from 'react'
import {observer} from 'mobx-react'

export function Faq () {
  return (
    <div>
      <div className="r-grid-fluid-colmin24em space-bottom-4">
        <div className="md-panel-group flex-col">
          <div className="bg-gray lg-padded-v1-h2">
            <h3 className="space-0 h-header">How to contact us?</h3>
          </div>
          <div className="bg-white lg-padded-2 flex-fill">
            <p>
              Send an email at <strong>info_example@bard.dev</strong>.
            </p>
          </div>
        </div>

        <div className="md-panel-group flex-col">
          <div className="bg-gray lg-padded-v1-h2">
            <h3 className="space-0 h-header">How does it work?</h3>
          </div>
          <div className="bg-white lg-padded-2 flex-fill">
            <p>Bard is a guideline with a set of tools to help build mobx react app.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Faq)
