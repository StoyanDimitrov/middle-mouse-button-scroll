var ratio = {}


function setRatio()
{
  ratio = {
    x: window.document.body.scrollWidth / (window.innerWidth * .8),
    y: window.document.body.scrollHeight / (window.innerHeight * .8)
  }
}

function scroll(event)
{
  setCursor('move')
  window.scrollBy(Math.ceil(event.movementX * ratio.x), Math.ceil(event.movementY * ratio.y))
}

function setCursor(cursor)
{
  if (cursor) {
    return window.document.body.style.cursor = cursor
  }

  window.document.body.style.removeProperty('cursor')

  if (window.document.body.style.length === 0) {
    window.document.body.removeAttribute('style')
  }
}

window.addEventListener('resize', setRatio)

window.addEventListener('mousedown', function(event) {

  if (event.button !== 1) {
    return
  }

  if (event.buttons !== 4) {
    return
  }

  if (window.scrollMaxY === 0 && window.scrollMaxX === 0) {
    return
  }

  event.preventDefault()

  setRatio()

  window.addEventListener('mousemove', scroll, true)
})

window.addEventListener('mouseup', function() {

  setCursor()
  window.removeEventListener('mousemove', scroll, true)
})
