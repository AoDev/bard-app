import {memo} from 'react'

function Between({children}: {children: React.ReactNode}) {
  return <div className="flex-row-center justify-between">{children}</div>
}

export const DemoTypography = memo(() => {
  return (
    <section className="panel--simple pad-default" id="section-typography">
      <div className="panel__header">
        <h3 className="h3">Typography</h3>
      </div>
      <Between>
        <h3 className="h3">A nice heading</h3>
        .h3
      </Between>
      <Between>
        <h4 className="h4">A nice heading</h4>
        .h4
      </Between>

      <Between>
        <span>
          10 <span className="txt-unit">USD</span> 10 <span className="txt-unit">%</span>
        </span>
        .txt-unit
      </Between>
    </section>
  )
})
