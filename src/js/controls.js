import { Element } from './element.js'
import { Timeline } from './timeline.js'

export class Controls{
  constructor(){
    Controls.set_time()
    this.set_event()
  }
  set_event(){
    Element.elm_time.addEventListener('change' , this.change_time)
  }

  static get time(){
    const time = Number(Element.elm_time.value)
    return time * Timeline.msec * 10
  }

  static set_time(time){
    time = time || Timeline.fulltime / 1000
    Element.elm_time.value = time
  }
  change_time(e){
    Timeline.sec = Controls.time
    new Timeline()
  }
}