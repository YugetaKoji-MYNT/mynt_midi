import { Event }   from './event.js'
import { Element } from './element.js'

export class Timebar{
  constructor(){
    this.set_event()
    this.view_line()
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
  static get elm_timebar_line(){
    return Element.elm_editor.querySelector(`:scope > .line`)
  }

  set_event(){
    // scroll
    if(Timebar.elm_timebar_area){
      Timebar.elm_timebar_area.addEventListener('scroll', Event.scroll_sync_timeline)
    }
    // drag
    window.addEventListener('mousedown' , this.mousedown)
    window.addEventListener('mousemove' , this.mousemove.bind(this))
    window.addEventListener('mouseup'   , this.mouseup)
  }

  // 縦棒ライン
  view_line(){
    const line = document.createElement('div')
    line.classList.add('line')
    const height = Element.elm_editor.scrollHeight
    line.style.setProperty('height',`${height}px`,'')
    Element.elm_editor.appendChild(line)
  }

  // ラインがtimebarに追従する処理
  follow_line(left){
    Timebar.elm_timebar_line.style.setProperty('left',`${left}px`,'')
  }

  mousedown(e){
    const elm = e.target.closest('.timebar')
    if(!elm){return}
    const left = elm.style.getPropertyValue('left')
    Timebar.click_data = {
      mouse_x : e.pageX,
      left    : left ? Number(left.replace('px','')) : 0
    }
  }
  mousemove(e){
    if(!Timebar.click_data){return}
    let left = Timebar.click_data.left + (e.pageX - Timebar.click_data.mouse_x)
    left = left > 0 ? left : 0
    Timebar.elm_timebar_icon.style.setProperty('left',`${left}px`,'')
    this.follow_line(left)
  }
  mouseup(e){
    if(!Timebar.click_data){return}
    delete Timebar.click_data
  }

  static set_width(size){
    Timebar.elm_timebar_scroll.style.setProperty('width',`${size}px`,'')
  }

}