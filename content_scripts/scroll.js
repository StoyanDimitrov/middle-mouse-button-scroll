var ratio = {}


function setRatio()
{
  ratio = {
    x: document.body.scrollWidth / (window.innerWidth * .8),
    y: document.body.scrollHeight / (window.innerHeight * .8)
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
    return document.body.style.cursor = cursor
  }

  document.body.style.removeProperty('cursor')

  if (document.body.style.length === 0) {
    document.body.removeAttribute('style')
  }
}

window.addEventListener('resize', setRatio)

window.addEventListener('mousedown', (event) => {

  if (event.altKey || event.ctrlKey || event.shiftKey) {
    return
  }

  if (event.button !== 1 && event.buttons !== 4) {
    return
  }

  if (window.scrollMaxY === 0 && window.scrollMaxX === 0) {
    return
  }

  event.preventDefault()

  setRatio()

  window.addEventListener('mousemove', scroll, true)
})

window.addEventListener('mouseup', () => {

  setCursor()
  window.removeEventListener('mousemove', scroll, true)
})
