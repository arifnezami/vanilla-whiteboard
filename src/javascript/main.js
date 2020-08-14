import '../css/styles.css'
import Tool from './toolEvents'
import Canvas from './canvas'

window.addEventListener('load', () => {
    whiteboardApp.init()
})
  
let whiteboardApp = (() => {   // Main whiteboard app

    let canvas = document.getElementById('canvas-0'),
        currentIndex = 0;
        canvas.width = window.innerWidth

    function init() {  // Initialising the main app
        document.getElementById("mainDiv").addEventListener('mousedown', updateContext);  
        document.getElementById("navigation").addEventListener("click", navigate)  
        document.getElementById('addCanvas').addEventListener('click', addCanvas)
        Tool.registerEvents()
        Canvas.registerCanvasEvents(Tool)
    }

    function updateContext(e) {  // function to change context
        if (e.target.nodeName === 'CANVAS') {
            canvas = e.target;
            Canvas.setContext(e.target.getContext('2d'));
        }
    }

    function navigate (e) { // function to navigate between canvases
        let key = e.target.dataset.type
        let count = document.getElementById('mainDiv').children.length
        if (key === 'prev' && currentIndex !== 0) {
            hideCanvas(currentIndex)
            currentIndex--;
        }
        else if (key === 'next' && currentIndex + 1 !== count) {
            hideCanvas(currentIndex)
            currentIndex++;
        }
        showCanvas(currentIndex);
    }

    function addCanvas () {   // function to add a new canvas
        let canvas = document.createElement('canvas')
        let count = document.getElementById('mainDiv').children.length
        canvas.id = `canvas-${count}`
        canvas.width = window.innerWidth
        canvas.height = 600
        canvas.style.border = '1px solid black'
        canvas.style.display = 'none'
        document.getElementById('mainDiv').appendChild(canvas)
        hideCanvas(currentIndex);
        currentIndex = count
        showCanvas(currentIndex)
    }

    function showCanvas(index) {
        document.getElementById(`canvas-${index}`).style.display = 'block'
        document.getElementById('showCount').innerHTML = `${index + 1} of ${document.getElementById('mainDiv').children.length}`
    }

    function hideCanvas(index) {
        document.getElementById(`canvas-${index}`).style.display = 'none'
    }    

    return {
        init: init
    }
})()

