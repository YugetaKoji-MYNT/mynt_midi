import { Css }     from './common/css.js'
import { Element } from './element.js'
import { Editor }  from './editor.js'

/**
 * Timeline処理
 * 
 * 1秒 = 500pxとして計算
 * 
 */

export class Timeline{
  constructor(){
    Timeline.clear_number_value()
    // Timeline.view_second()
    Timeline.view_second()
    Editor.set_addSize(Timeline.diff_size)
  }

  static get sec(){
    const size = Css.get_css(':root','--time-sec').replace('px' , '')
    return Number(size)
  }
  static get msec(){
    const size = Css.get_css(':root','--time-msec').replace('px' , '')
    return Number(size)
  }
  static set sec(size){
    Css.set_css(':root','--time-sec' , `${size}px`)
  }
  static set msec(size){
    Css.set_css(':root','--time-msec', `${size}px`)
    return Number(size)
  }
  static get elm_numbers(){
    return Element.elm_timeline.querySelectorAll(`.sec,.msec`)
  }

  // millisecond (1000ms = 1s)
  static get fulltime(){
    return Math.floor(Timeline.sec / Timeline.msec * 100)
  }
  // 文字列はみ出しサイズ
  static get diff_size(){
    return Element.elm_timeline.scrollWidth - Timeline.sec
  }

  // static view_second(){
  //   const max_sec = Math.ceil(Timeline.fulltime / 1000)
  //   for(let sec=1; sec<max_sec; sec++){
  //     const div = document.createElement('div')
  //     div.classList.add('sec')
  //     div.textContent = `${sec}.0`
  //     const x = (this.msec * 10) * sec
  //     div.style.setProperty('left',`${x}px`,'')
  //     Element.elm_timeline.appendChild(div)
  //   }
  // }
  static view_second(){
    const max_msec = Timeline.fulltime / 100
    for(let i=1; i<=max_msec; i++){
      const div = document.createElement('div')
      const sec  = Math.floor(i / 10)
      const msec = i - sec * 10
      // sec
      if(i % 10 === 0){
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
}