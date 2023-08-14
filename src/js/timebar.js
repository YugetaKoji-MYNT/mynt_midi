import { Event }    from './event.js'
import { Element }  from './element.js'
import { Timeline } from './timeline.js'

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
  static get elm_mmdd(){
    return document.querySelector(`input[name='mmdd']`)
  }

  set_event(){
    // scroll
    if(Timebar.elm_timebar_area){
      Timebar.elm_timebar_area.addEventListener('scroll', Event.scroll_sync_timeline)
    }
    // drag
    window.addEventListener('mousedown' , this.mousedown.bind(this))
    window.addEventListener('mousemove' , this.mousemove.bind(this))
    window.addEventListener('mouseup'   , this.mouseup.bind(this))
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
    if(!e.target.closest('.timebar')
    && !e.target.closest('.timeline')){return}
    let left
    if(e.target.closest('.timebar')){
      left = Timebar.elm_timebar_icon.style.getPropertyValue('left')
      left = left ? Number(left.replace('px','')) : 0
    }
    else if(e.target.closest('.timeline')){
      left = this.click_timeline(e)
    }
    Timebar.click_data = {
      mouse_x : e.pageX,
      left    : left
    }
  }
  mousemove(e){
    if(!Timebar.click_data){return}
    const left = this.get_pos(Timebar.click_data.left + (e.pageX - Timebar.click_data.mouse_x))
    this.set_bar_pos(left)
  }
  get_pos(left){
    left = left > 0 ? left : 0
    return Math.round(left / Timeline.scale_size) * Timeline.scale_size
  }
  set_bar_pos(left){
    Timebar.elm_timebar_icon.style.setProperty('left',`${left}px`,'')
    this.follow_line(left)
    this.set_mmdd(left)
  }

  mouseup(e){
    if(!Timebar.click_data){return}
    delete Timebar.click_data
  }

  click_timeline(e){
    if(e.target.closest('.timebar')){return}
    const rect = Element.elm_timeline.getBoundingClientRect()
    const left = this.get_pos(e.pageX - rect.left)
    this.set_bar_pos(left)
    return left
  }

  set_mmdd(left){
    const sec_size  = Timeline.msec * 10
    const sec       = Math.floor(left / sec_size)
    const msec_size = 1000 / sec_size
    const msec      = ('000'+ Math.floor((left - (sec * sec_size)) * msec_size)).slice(-3)
    Timebar.elm_mmdd.value = `${sec}.${msec}`
  }

  static set_width(size){
    Timebar.elm_timebar_scroll.style.setProperty('width',`${size}px`,'')
  }

}