import { Element } from './element.js'

export class Timebar{
  constructor(){

  }
  set_event(){

  }

  static set_width(size){
    // console.log(Element.elm_editor.offsetWidth, Element.elm_editor.scrollWidth)
    Element.elm_timebar_scroll.style.setProperty('width',`${size}px`,'')
  }
}