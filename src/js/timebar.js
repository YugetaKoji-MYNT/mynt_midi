import { Event } from './event.js'

export class Timebar{
  constructor(){
    this.set_event()
  }

  static get elm_timebar_area(){
    return document.querySelector(`.timebar-area`)
  }
  static get elm_timebar_scroll(){
    return document.querySelector(`.timebar-scroll`)
  }
  static get elm_timebar_icon(){
    return document.querySelector(`.timebar`)
  }

  set_event(){
    // scroll
    Timebar.elm_timebar_area.addEventListener('scroll', Event.scroll_sync_timeline)
    // drag
    window.addEventListener('mousedown' , Timebar.mousedown)
    window.addEventListener('mousemove' , Timebar.mousemove)
    window.addEventListener('mouseup'   , Timebar.mouseup)
  }

  static mousedown(e){
    const elm = e.target.closest('.timebar')
    if(!elm){return}
    const left = elm.style.getPropertyValue('left')
    Timebar.click_data = {
      mouse_x : e.pageX,
      left    : left ? Number(left.replace('px','')) : 0
    }
  }
  static mousemove(e){
    if(!Timebar.click_data){return}
    let x = Timebar.click_data.left + (e.pageX - Timebar.click_data.mouse_x)
    x = x > 0 ? x : 0
    Timebar.elm_timebar_icon.style.setProperty('left',`${x}px`,'')
  }
  static mouseup(e){
    if(!Timebar.click_data){return}
    delete Timebar.click_data
  }

  static set_width(size){
    Timebar.elm_timebar_scroll.style.setProperty('width',`${size}px`,'')
  }
}