import { Element }  from './element.js'
import { Timeline } from './timeline.js'
import { Timebar }  from './timebar.js'
import { Player }   from './player.js'

export class Controls{
  constructor(){
    Controls.set_time()
    this.set_event()
  }
  set_event(){
    Element.elm_time.addEventListener('change' , this.change_time.bind(this))
    Controls.elm_play.addEventListener('click' , this.click_play.bind(this))
  }

  static get elm_play(){
    return document.querySelector(`[name='play'] .play`)
  }
  // static get elm_stop(){
  //   return document.querySelector(`[name='play'] .stop`)
  // }
  static get elm_start(){
    return document.querySelector(`[name='play'] .start`)
  }
  static get play_status(){
    return Controls.elm_play.getAttribute('data-status') || null
  }
  static set play_status(status){
    Controls.elm_play.setAttribute('data-status' , status)
  }

  static get time(){
    return Number(Element.elm_time.value) * 1000
  }

  static set_time(time){
    time = time || Timeline.fulltime / 1000
    Element.elm_time.value = time
  }
  change_time(e){
    const time = Number(Element.elm_time.value)
    Timeline.sec = time * Timeline.msec * 10
    new Timeline()
  }

  click_play(e){
    switch(Controls.play_status){
      case 'play':
        Controls.play_status = ''
        break
      default:
        Controls.play_status = 'play'
        this.play()
        new Player()
        break
    }
  }

  play(){
    if(Controls.play_status !== 'play'){
      Controls.play_time = null
      return
    }

    // current play start time
    Controls.play_time = Controls.play_time || (+new Date())

    // Progress time
    let progress_time = (+new Date()) - Controls.play_time

    // max
    if(progress_time > Controls.time){
      progress_time = 0
      Controls.play_time = (+new Date())
    }
    

    // get_position
    const left = Timeline.time2pos(progress_time)

    // timebar
    Timebar.set_bar_pos(left)

    // repeat
    window.requestAnimationFrame(this.play.bind(this))
  }
}