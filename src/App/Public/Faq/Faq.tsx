import {memo} from 'react'

export const Faq = memo(() => {
  return (
    <div className="grid-2-col-2x margin-bottom-default">
      <div className="panel--simple pad-default flex-col">
        <div className="panel__header margin-bottom-2">
          <h3 className="h3 margin-0">Where to ask questions?</h3>
        </div>
        <div className="txt-read">
          <p className="margin-top-0">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  )
})
