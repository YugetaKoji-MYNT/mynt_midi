export class Element{
  static get elm_midiFrame(){
    return document.getElementById('mini_frame')
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