import {observer} from 'mobx-react'

function Between({children}: {children: React.ReactNode}) {
  return <div className="flex-row-center justify-between">{children}</div>
}

export const DemoLinks = observer(() => {
  const currentUrl = window.location.pathname
  return (
    <section className="panel--simple pad-default" id="section-typography">
      <div className="panel__header">
        <h3 className="h3">Links</h3>
      </div>
      <div className="grid">
        <Between>
          <span>
            This is an <a href={currentUrl}>unstyled link</a> inside a sentence.
          </span>
          a
        </Between>
        <Between>
          <span>
            This is a{' '}
            <a href={currentUrl} className="link">
              default link
            </a>{' '}
            inside a sentence.
          </span>
          .link
        </Between>

        <Between>
          <span>
            This is a{' '}
            <a href={currentUrl} className="link--discreet">
              discreet link
            </a>{' '}
            inside a sentence.
          </span>
          .link--discreet
        </Between>

        <Between>
          <span>
            This is a{' '}
            <a href={currentUrl} className="link--simple-text">
              simple text link
            </a>{' '}
            inside a sentence.
          </span>
          .link--simple-text
        </Between>

        <Between>
          <span>
            This is an{' '}
            <a href={currentUrl} className="link--invisible">
              invisible link
            </a>{' '}
            inside a sentence.
          </span>
          .link--invisible
        </Between>
      </div>
    </section>
  )
})
