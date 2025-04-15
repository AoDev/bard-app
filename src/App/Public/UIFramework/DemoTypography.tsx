import {memo} from 'react'

function Between({children}: {children: React.ReactNode}) {
  return <div className="flex-row-center justify-between gap-1">{children}</div>
}

const fontSizes = [90, 100, 110, 120, 150, 200]
const headings = ['h1', 'h2', 'h3', 'h4']
const colors = ['good', 'bad', 'black', 'blue', 'default', 'gray', 'muted', 'warning', 'white']

export const DemoTypography = memo(() => {
  return (
    <>
      <div className="grid">
        <section className="panel--simple pad-default">
          <div className="panel__header">
            <h3 className="h3">Font size</h3>
          </div>
          <p className="txt-muted">A percentage is applied to the base size in em.</p>
          {fontSizes.map((size) => (
            <Between key={size}>
              <span className={`size-${size}`}>Lorem ipsum dolor</span>
              .size-{size}
            </Between>
          ))}
        </section>

        <section className="panel--simple pad-default">
          <div className="panel__header">
            <h3 className="h3">Colors</h3>
          </div>
          {colors.map((color) => (
            <Between key={color}>
              <span className={`txt-${color}`}>Lorem ipsum dolor</span>
              .txt-{color}
            </Between>
          ))}
        </section>

        <section className="panel--simple pad-default">
          <div className="panel__header">
            <h3 className="h3">Headings</h3>
          </div>
          {headings.map((heading) => (
            <Between key={heading}>
              <h3 className={`${heading} margin-v-05`}>Frontend is complex</h3>
              {heading}
            </Between>
          ))}
        </section>

        <section className="panel--simple pad-default">
          <div className="panel__header">
            <h3 className="h3">Utilities</h3>
          </div>
          <div>
            <Between>
              <span>
                10 <span className="txt-unit">USD</span> 10 <span className="txt-unit">%</span>
              </span>
              .txt-unit
            </Between>
            <Between>
              <div className="reading-width">
                <p>
                  The <i>reading-width</i> class is used to limit the width of the text for an
                  optimal reading. It is roughly a maximum of 13 words or 70 characters. The css
                  class itself sets a width of 32em. And for example, this very paragraph is using
                  the reading-width class.
                </p>
              </div>
              .reading-width
            </Between>
          </div>
        </section>
      </div>
    </>
  )
})
