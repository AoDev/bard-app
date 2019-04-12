import PropTypes from 'prop-types'
import React from 'react'

const variantCssMap = {
  'light': 'pgr-link-light',
  'dark': 'pgr-link-dark',
}

export default class Pagination extends React.Component {
  constructor (props) {
    super(props)
    this.onPageClick = this.onPageClick.bind(this)
  }

  getRange (pageCount, currentPage, maxButtons) {
    let range
    if (maxButtons) {
      range = [
        currentPage > maxButtons ? currentPage - maxButtons : 1,
        currentPage < pageCount - maxButtons ? currentPage + maxButtons : pageCount
      ]

      const rangeDiff = range[1] - range[0]
      const offset = 2 * maxButtons

      if (rangeDiff < offset) {
        if (range[0] === 1) {
          if (pageCount >= offset + 1) {
            range[1] = offset + 1
          }
          else {
            range[1] = pageCount
          }
        }
        else if (range[1] === pageCount) {
          if (pageCount - offset > 1) {
            range[0] = pageCount - offset
          }
          else {
            range[0] = 1
          }
        }
      }
    }
    else {
      range = [1, pageCount]
    }

    return range
  }

  onPageClick (event) {
    event.preventDefault()
    const page = parseInt(event.currentTarget.dataset.page, 10)
    this.props.onPageClick(this.props.zeroBased ? page - 1 : page)
  }

  render () {
    const {totalItems, itemsPerPage, variant, currentPage, withPrevNext, maxButtons} = this.props
    const linkClass = variantCssMap[variant] || 'pgr-link'
    const rest = totalItems % itemsPerPage
    let pageCount = (totalItems - rest) / itemsPerPage
    if (rest > 0) {
      pageCount = pageCount + 1
    }

    let range = this.getRange(pageCount, currentPage, maxButtons)

    let buttons = []

    for (let i = range[0]; i <= range[1]; i++) {
      buttons.push(
        <li key={i} className="pgr-item">
          <a
            href="#"
            className={i === currentPage ? `${linkClass}-active` : linkClass}
            data-page={i}
            aria-label={`Go to page ${i}`}
            onClick={this.onPageClick}>
            {i}
          </a>
        </li>
      )
    }

    return (
      <nav aria-label="Pagination Navigation" className={this.props.className}>
        <ul className="pgr-wrapper">
          {withPrevNext &&
            <li className="pgr-item">
              <a
                href="#"
                className={`${linkClass} pgr-prev ${currentPage === 1 ? 'pgr-disabled' : ''}`}
                data-page={currentPage - 1}
                aria-label={`Go to previous page`}
                onClick={this.onPageClick}>
                ❮
              </a>
            </li>
          }
          {buttons}
          {withPrevNext &&
            <li className="pgr-item">
              <a
                href="#"
                className={`${linkClass} pgr-next ${currentPage === pageCount ? 'pgr-disabled' : ''}`}
                data-page={currentPage + 1}
                aria-label={`Go to previous page`}
                onClick={this.onPageClick}>
                ❯
              </a>
            </li>
          }
        </ul>
      </nav>
    )
  }
}

Pagination.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(['light', 'dark']),
  withPrevNext: PropTypes.bool.isRequired,
  zeroBased: PropTypes.bool.isRequired,
  maxButtons: PropTypes.number,
}

Pagination.defaultProps = {
  itemsPerPage: 10,
  zeroBased: false,
  withPrevNext: true,
}
