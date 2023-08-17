import { Css }     from './common/css.js'
import { Element } from './element.js'
import { Editor }  from './editor.js'

/**
 * Timeline処理
 * 
 * 1秒 = 500pxとして計算（css参照）
 * 
 */

export class Timeline{
  constructor(){
    Timeline.clear_number_value()
    Timeline.view_second()
    Editor.set_addSize(Timeline.diff_size)
  }

  // 全体時間のサイズ(px)
  static get width(){
    const size = Css.get_css(':root','--time-sec').replace('px' , '')
    return Number(size)
  }
  // 1秒のサイズ(px)
  static get sec(){
    return Number(Timeline.msec * Timeline.sec_step)
  }
  // 1msecのサイズ(px)
  static get msec(){
    const size = Css.get_css(':root','--time-msec').replace('px' , '')
    return Number(size)
  }
  // 全体時間のサイズ変更(px)
  static set width(size){
    Css.set_css(':root','--time-sec' , `${size}px`)
  }
  // 1秒のサイズ変更(px)
  static set sec(size){
    Css.set_css(':root','--time-msec', `${size}px`)
    return Number(size)
  }
  // 1msecのサイズ変更(px)
  static set msec(size){
    Css.set_css(':root','--time-msec', `${size}px`)
    return Number(size)
  }
  // secの分割数
  static get sec_step(){
    return 10
  }
  // msecの分割数
  static get msec_step(){
    return Number(Css.get_css(':root' , '--time-msec-step') || 1)
  }
  static get elm_numbers(){
    return Element.elm_timeline.querySelectorAll(`.sec,.msec`)
  }

  // millisecond (1000ms = 1s)
  static get fulltime(){
    return Math.floor(Timeline.width / Timeline.msec * 100)
  }
  // 文字列はみ出しサイズ
  static get diff_size(){
    return Element.elm_timeline.scrollWidth - Timeline.width
  }
  // msecの１目盛り秒数
  static get msec_time(){
    return 1000 / Timeline.sec_step / Timeline.msec_step
  }

  static get scale_size(){
    return Timeline.msec / Timeline.msec_step
  }

  static view_second(){
    const max_msec = Timeline.fulltime / 100
    for(let i=1; i<=max_msec; i++){
      const div = document.createElement('div')
      const sec  = Math.floor(i / Timeline.sec_step)
      const msec = i - sec * Timeline.sec_step
      // sec
      if(i % Timeline.sec_step === 0){
        div.classList.add('sec')
        div.textContent = `${sec}.0`
      }
      // msec
      else{
        div.textContent = `${sec}.${msec}`
        div.classList.add('msec')
      }
      const x = this.msec * i
      div.style.setProperty('left',`${x}px`,'')
      Element.elm_timeline.appendChild(div)
    }
  }

  static clear_number_value(){
    for(const elm of Timeline.elm_numbers){
      elm.parentNode.removeChild(elm)
    }
  }

  // 秒数(ms)からtimelineの座標を返す
  static time2pos(msec){
    // msecの１目盛り秒数
    const msec_time = Math.floor(msec / Timeline.msec_time) * Timeline.msec_time
    return msec_time * Timeline.msec / Timeline.msec_step / Timeline.sec_step
  }
}