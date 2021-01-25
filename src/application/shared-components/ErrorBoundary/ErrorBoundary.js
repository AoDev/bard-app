import PropTypes from 'prop-types'
import React from 'react'
import {Note, Icon} from 'ui-framework'

const styles = {
  content: {height: 'calc(100% - 150px)'},
  wrapper: {height: 'calc(100% - 32px'},
}

/**
 * Catch errors in components and display an error message
 */
export class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {hasError: false, error: null, info: null, detailsShown: false}
    this.toggleDetails = this.toggleDetails.bind(this)
  }

  componentDidCatch(error, info) {
    window.scrollTo(0, 0)
    this.setState({hasError: true, error, info})
  }

  toggleDetails() {
    this.setState({
      detailsShown: !this.state.detailsShown,
    })
  }

  render() {
    if (this.state.hasError) {
      const componentTree = this.state.info.componentStack
        .split('\n')
        .filter((line) => !line.includes('in div'))
        .map((line, index) =>
          line
            .replace(/\(.+\)/, '')
            .replace('in', '')
            .trim()
        )
        .filter((line) => line !== '')

      return (
        <div className="max-width-48em center-block space-bottom-4 height-100p">
          <div className="md-panel-group space-v-1" style={styles.wrapper}>
            <div className="flex-row-center bg-content padded-1">
              <Icon name="#smiley-dead" size={96} />
              <div className="space-left-1">
                <h1 className="space-top-0">Oops! Bard crashed :(</h1>
                <p className="txt-11 txt-positive space-0">Please, first try to restart the app.</p>
              </div>
            </div>

            <div className="scroll-y" style={styles.content}>
              <section>
                <div className="bg-content padded-1">
                  <h2>You can help by reporting this issue</h2>
                  <ul className="list-not-padding list-spaced-1 space-bottom-2">
                    <li>
                      <p>
                        You can send an email at{' '}
                        <strong>
                          {' '}
                          <a href="mailto:contact@me">contact@me</a>
                        </strong>
                        .
                      </p>
                    </li>
                    <li>App version: {process.env.APP_VERSION}</li>
                  </ul>
                  <button className="btn--neutral" type="button" onClick={this.toggleDetails}>
                    Toggle crash details
                  </button>
                </div>
                <div className={`bg-content padded-1${this.state.detailsShown ? '' : ' hidden'}`}>
                  <div>
                    <h3>Message</h3>
                    <Note variant="red">
                      <textarea
                        className="textarea inputfield txt-mono"
                        defaultValue={this.state.error.message}
                        readOnly
                      />
                    </Note>

                    <h3>Stack trace</h3>
                    <Note variant="red">
                      <textarea
                        style={{height: '300px'}}
                        className="textarea textarea-no-wrap inputfield txt-mono"
                        defaultValue={this.state.error.stack}
                        readOnly
                      />
                    </Note>

                    <h3>Component tree</h3>
                    <p>Error in: {componentTree[0]}</p>
                    <Note variant="red">
                      <textarea
                        style={{height: '300px'}}
                        className="textarea inputfield txt-mono"
                        defaultValue={componentTree.join('\n')}
                        readOnly
                      />
                    </Note>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
}

export default ErrorBoundary
