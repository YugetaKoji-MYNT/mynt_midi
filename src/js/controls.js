import { Element } from './element.js'
// import { Css }     from './common/css.js'
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
    // console.log(time , Timeline.fulltime , Timeline.sec, Timeline.msec)
    return time * Timeline.msec * 10
  }

  static set_time(time){
    time = time || Timeline.fulltime / 1000
    Element.elm_time.value = time
  }
  change_time(e){//console.log(Timeline.sec,Timeline.msec)
    // const time = Timeline.fulltime / 1000
    // Controls.set_time(time)
    // const time = Number(e.target.value)
    // this.set_time_value(time)
    console.log(Controls.time, Timeline.sec, Timeline.msec , Timeline.fulltime)
    Timeline.sec = Controls.time
    new Timeline()
  }
  // static get_time(){
  //   return Timeline.fulltime / 1000
  // }
  // static set_time_value(){
  //   Element.elm_time.value = Controls.get_time
  // }
}