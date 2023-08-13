export class Element{
  static get elm_midiFrame(){
    return document.querySelector(`.midi-frame[data-type='editor']`)
  }
  static get elm_headerFrame(){
    return document.querySelector(`.midi-frame[data-type='timeline']`)
  }
  static get elm_keyboard(){
    return this.elm_midiFrame.querySelector('.keyboard')
  }
  static get elm_octaves(){
    return this.elm_keyboard.querySelectorAll(':scope > .octave')
  }
  static get elm_editor(){
    return this.elm_midiFrame.querySelector('.editor')
  }
  static get elm_timeline(){
    return this.elm_headerFrame.querySelector('.timeline')
  }

  static get octave_count(){
    return 11
  }

  static get oscillator_type(){
    return document.querySelector(`[name='oscillator_type']`).value
  }

  static get elm_time(){
    return document.querySelector(`input[name='time']`)
  }

  static get elm_timebar_area(){
    return document.querySelector(`.timebar-area`)
  }
  static get elm_timebar_scroll(){
    return document.querySelector(`.timebar-scroll`)
  }

}