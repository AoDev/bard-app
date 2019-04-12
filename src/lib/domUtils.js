/**
 * Return the relative position of mouse cursor when clicking an element
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
function getClickPosition (event) {
  var parentPosition = getPosition(event.currentTarget)
  var xPosition = event.clientX - parentPosition.x
  var yPosition = event.clientY - parentPosition.y
  return {x: xPosition, y: yPosition}
}

/**
 * Return the position of parent element when clicking one of its children
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
function getPosition (element) {
  var xPosition = 0
  var yPosition = 0

  while (element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft)
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop)
    element = element.offsetParent
  }
  return {x: xPosition, y: yPosition}
}

function injectCSS (id, css, options = {}) {
  const head = document.querySelector('head')
  const styleId = `#style-${id}`
  const styleElement = document.getElementById(styleId)

  if (styleElement) {
    // replace content
    styleElement.textContent = css
  }
  else {
    // new element
    let newStyle = document.createElement('style')
    newStyle.setAttribute('type', 'text/css')
    newStyle.setAttribute('id', styleId)
    newStyle.textContent = css

    if (options.prepend) {
      head.insertBefore(newStyle, head.childNodes[0])
    }
    else {
      head.appendChild(newStyle)
    }
  }
}

function removeCSS (id) {
  const styleId = `#style-${id}`
  const styleElement = document.getElementById(styleId)
  document.querySelector('head').removeChild(styleElement)
}

export default {
  getClickPosition,
  getPosition,
  injectCSS,
  removeCSS,
}
