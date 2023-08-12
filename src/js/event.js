import { Element } from './element.js'


export class Event{
  constructor(){
    Element.elm_keyboard.addEventListener('mouseover' , Event.mouseover_key)
    Element.elm_keyboard.addEventListener('mouseout'  , Event.clear_active)
    Element.elm_editor.addEventListener('mouseover'   , Event.mouseover_key)
    Element.elm_editor.addEventListener('mouseout'    , Event.clear_active)
  }

  static mouseover_key(e){
    const elm_octave = e.target.closest('.octave')
    const elm_key    = e.target.closest('[data-key]')
    const octave_num = elm_octave.getAttribute('data-octave')
    const key        = elm_key.getAttribute('data-key')
    Event.set_active(octave_num,key)
  }

  static set_active(octave, key){
    Event.clear_active()
    const targets = Element.elm_midiFrame.querySelectorAll(`.octave[data-octave='${octave}'] [data-key='${key}'] `)
    for(const target of targets){
      target.setAttribute('data-status' , 'active')
    }
  }

  static clear_active(){
    const actives = Element.elm_midiFrame.querySelectorAll(`[data-status='active']`)
    for(const active of actives){
      active.removeAttribute('data-status')
    }
  }
}