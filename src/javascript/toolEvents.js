
let Tool = (() => { // app for handling tool events

  let penSize = 1,
    penColor = 'red',
    type = 'pen';

  function registerEvents() { // registering tool events

    document.getElementById("pencil").addEventListener("click", function () { // click handler on pen tool
      type = 'pen'
      document.getElementById('mainDiv').classList.remove('penCursor')
      document.getElementById('mainDiv').classList.remove('erasorCursor')
      document.getElementById('mainDiv').classList.add('penCursor')
      document.getElementById("pencil").classList.add('selectedBox')
      document.getElementById("eraser").classList.remove('selectedBox')
    })

    document.getElementById("eraser").addEventListener("click", function () { // click handler on eraser tool
      type = 'eraser'
      document.getElementById('mainDiv').classList.remove('penCursor')
      document.getElementById('mainDiv').classList.remove('erasorCursor')
      document.getElementById('mainDiv').classList.add('erasorCursor')
      document.getElementById("eraser").classList.add('selectedBox')
      document.getElementById("pencil").classList.remove('selectedBox')
      updatePenColor()
      updatePenSize()
    })


    document.getElementById('pen-size').addEventListener('click', function (e) { // click handler on pen size options in tool
      penSize = Number(e.target.dataset.size)
      if (penSize && type === 'pen') {
        updatePenSize()
        e.target.parentElement.classList.add('selectedBox')
      }
    })

    document.getElementById('pen-color').addEventListener('click', function (e) { // click handler on selecting pen color in tools
      penColor = e.target.dataset.color
      if (penColor && type === 'pen') {
        updatePenColor()
        e.target.parentElement.classList.add('selectedBox')
      }
    })
  }

  function getPenColor() {
    return penColor
  }

  function getPenSize() {
    return penSize
  }

  function getToolType() {
    return type
  }

  function updatePenSize() {
    Object.keys(document.getElementById('pen-size').children).forEach(function (i) {
      document.getElementById('pen-size').children[i].classList.remove('selectedBox')
    })
  }
  

  function updatePenColor() {
    Object.keys(document.getElementById('pen-color').children).forEach(function (i) {
      document.getElementById('pen-color').children[i].classList.remove('selectedBox')
    })
  }

  return {
    registerEvents: registerEvents,
    getPenColor: getPenColor,
    getPenSize: getPenSize,
    getToolType: getToolType
  }

})()

export default Tool