(function() {
  function scrollHandler() {

    function scrollRatio(event) {
      let ratio = .8

      if (event.shiftKey) {
        ratio = 12
      }

      return ratio
    }

    function scrollAmount(event) {
      const amount = {
        x: 0,
        y: 0,
      }
      const ratio = scrollRatio(event)

      // horizontal scroll exists
      if (window.scrollMaxX !== 0) {
        let reachedLeft = false
          , reachedRight = false
        const scrollingLeft = event.movementX < 0
        const scrollingRight = event.movementX > 0

        if (window.scrollX === 0) {
          reachedLeft = true
        }
        if (window.scrollX === window.scrollMaxX) {
          reachedRight = true
        }

        if ((! reachedLeft && scrollingLeft)
          || (! reachedRight && scrollingRight)
        ) {
          const documentWidth = Math.max(document.body.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.clientWidth,
            document.documentElement.scrollWidth,
            document.documentElement.offsetWidth
          )

          amount.x = event.movementX * Math.max(1, Math.ceil(documentWidth / (window.innerWidth * ratio)))
        }
      }

      // vertical scroll exists
      if (window.scrollMaxY !== 0) {
        let reachedTop = false
          , reachedBottom = false
        const scrollingUp = event.movementY < 0
        const scrollingDown = event.movementY > 0

        if (window.scrollY === 0) {
          reachedTop = true
        }
        if (window.scrollY === window.scrollMaxY) {
          reachedBottom = true
        }

        if ((! reachedTop && scrollingUp)
          || (! reachedBottom && scrollingDown)
        ) {
          const documentHeight = Math.max(document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          )

          amount.y = event.movementY * Math.max(1, Math.ceil(documentHeight / (window.innerHeight * ratio)))
        }
      }

      return amount
    }

    return function(event) {
      const scrollBy = scrollAmount(event)

      if (scrollBy.x === 0
        && scrollBy.y === 0
      ) {
        return
      }

      window.scrollBy(scrollBy.x, scrollBy.y)
    }
  }

  const handleScroll = scrollHandler()

  function setCursor(cursor) {
    if (cursor) {
      return document.body.style.cursor = cursor
    }

    document.body.style.removeProperty('cursor')

    if (document.body.style.length === 0) {
      document.body.removeAttribute('style')
    }
  }

  let doubleClick = false
  let doubleClickTime = 500
  
  window.addEventListener('mousedown', (event) => {
    if (event.altKey
      || event.ctrlKey
    ) {
      return
    }

    // middle button click
    if (event.button !== 1
      && event.buttons !== 4
    ) {
      return
    }

    // no scroll
    if (window.scrollMaxX === 0
      && window.scrollMaxY === 0
    ) {
      return
    }

    if (doubleClick === true) {
        return
    }
    doubleClick = true
    setTimeout(() => { doubleClick = false }, doubleClickTime);

    event.preventDefault()

    setCursor('move')
    window.addEventListener('mousemove', handleScroll, true)
  })

  window.addEventListener('mouseup', () => {
    setCursor()
    window.removeEventListener('mousemove', handleScroll, true)
  })
}())
