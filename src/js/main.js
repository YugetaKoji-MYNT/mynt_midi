import { Keyboard }  from './keyboard.js'
import { Editor }    from './editor.js'
import { Event }     from './event.js'
import { Timeline }  from './timeline.js'
import { Timebar }   from './timebar.js'
import { Controls }  from './controls.js'
import { String }    from './string.js'
import { SvgImport } from './common/svg_import.js'

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
      // new Editor((e=>{
      //   Editor.scroll_middle()
      // }))
      new Editor()
      new Timeline()
      new Timebar()
      new Event()
      new Controls()
      new String()
    })
  })
  new SvgImport()
}