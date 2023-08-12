export class Element{
  static get elm_midiFrame(){
    return document.querySelector('div.midi-frame')
  }
  static get elm_headerFrame(){
    return document.querySelector('header.midi-frame')
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

  static get octave_count(){
    return 6
  }

}