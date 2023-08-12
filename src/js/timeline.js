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
    // Timeline.set_width()
    Timeline.view_second()
    Timeline.view_millisecond()
    Editor.set_addSize(Timeline.diff_size)
  }

  static get full(){
    const size = Css.get_css(':root','--editor-width').replace('px' , '')
    return Number(size)
  }
  static get detail(){
    const size = Css.get_css(':root','--time-size').replace('px' , '')
    return Number(size)
  }
  static set full(size){
    Css.set_css(':root','--editor-width' , `${size}px`)
  }
  static set detail(size){
    Css.set_css(':root','--time-size', `${size}px`)
    return Number(size)
  }
  static get elm_numbers(){
    return Element.elm_timeline.querySelectorAll(`.sec,.msec`)
  }

  // millisecond (1000ms = 1s)
  static get fulltime(){
    return Math.floor(Timeline.full / Timeline.detail * 100)
  }
  // 文字列はみ出しサイズ
  static get diff_size(){
    console.log(Element.elm_timeline.scrollWidth , Timeline.full)
    return Element.elm_timeline.scrollWidth - Timeline.full
  }

  static view_second(){
    // console.log(Css.get_css(':root','--editor-width'))
    // Css.set_css(':root','--editor-width' , '500px')
    // console.log(`${Timeline.fulltime}ms`)
    Timeline.clear_number_value()
    const max_sec = Math.ceil(Timeline.fulltime / 1000)
    for(let sec=1; sec<=max_sec; sec++){
      const div = document.createElement('div')
      div.classList.add('sec')
      div.textContent = `${sec}.0`
      const x = (this.detail * 10) * sec
      div.style.setProperty('left',`${x}px`,'')
      Element.elm_timeline.appendChild(div)
    }
  }
  static view_millisecond(se){
    const max_sec = Math.ceil(Timeline.fulltime / 1000)
    for(let sec=0; sec<max_sec; sec++){
      for(let msec=1; msec<10; msec++){
        const div = document.createElement('div')
        div.classList.add('msec')
        div.textContent = `${sec}.${msec}`
        const x = this.detail * (sec * 10 + msec)
        div.style.setProperty('left',`${x}px`,'')
        Element.elm_timeline.appendChild(div)
      }
    }
  }

  static clear_number_value(){
    for(const elm of Timeline.elm_numbers){
      elm.parentNode.removeChild(elm)
    }
  }

  // static set_width(){
  //   const editor_width = Css.get_css()
  //   Element.elm.timeline.style.setProperty('width' , `${editor_width}` , '')
  // }

}