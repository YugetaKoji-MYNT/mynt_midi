import { Keyboard } from './keyboard.js'
import { Editor }   from './editor.js'
import { Event }    from './event.js'

switch(document.readyState){
  case 'complete':
  case 'interactive':
    new Main()
    break
  default:
    window.addEventListener('DOMContentLoaded' , (()=> new Main()))
    break
}

function Main(){
  new Keyboard({
    callback : (()=>{
      new Editor()
      new Event()
    })
  })
}