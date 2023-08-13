import { Element } from './element.js'

export class Event{
  constructor(){
    // mouse-over
    Element.elm_keyboard.addEventListener('mouseover' , Event.mouseover_key)
    Element.elm_keyboard.addEventListener('mouseout'  , Event.clear_active)
    Element.elm_editor.addEventListener('mouseover'   , Event.mouseover_key)
    Element.elm_editor.addEventListener('mouseout'    , Event.clear_active)
    // scroll
    Element.elm_editor.addEventListener('scroll'      , Event.scroll_sync_editor)
    Element.elm_keyboard.addEventListener('scroll'    , Event.scroll_sync_keyboard)
    Element.elm_timeline.addEventListener('scroll'    , Event.scroll_sync_timeline)
  }

  // ----------
  // mouse-over
  static mouseover_key(e){
    const elm_octave = e.target.closest('.octave')
    const elm_key    = e.target.closest('[data-key]')
    if(!elm_octave || !elm_key){return}
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

  // ----------
  // scroll
  static scroll_sync_editor(e){
    const pos = {
      x : e.target.scrollLeft,
      y : e.target.scrollTop,
    }
    Event.scroll_sync(pos)
  }
  static scroll_sync_keyboard(e){
    const pos = {
      x : Element.elm_editor.scrollLeft,
      y : e.target.scrollTop,
    }
    Event.scroll_sync(pos)
  }
  static scroll_sync_timeline(e){
    const pos = {
      x : e.target.scrollLeft,
      y : Element.elm_editor.scrollTop,
    }
    Event.scroll_sync(pos)
  }
  static scroll_sync(pos){
    Element.elm_keyboard.scrollTop      = pos.y
    Element.elm_timeline.scrollLeft     = pos.x
    Element.elm_editor.scrollTop        = pos.y
    Element.elm_editor.scrollLeft       = pos.x
    Element.elm_timebar_area.scrollLeft = pos.x
  }
}