import { Element } from './element.js'
import { Timebar } from './timebar.js'

export class Editor{
  constructor(){
    Editor.clear()
    this.set_octove()
  }

  // エディタ内の表示をクリアする
  static clear(){
    Element.elm_editor.innerHTML = ''
  }

  // オクターブ毎の表示処理
  set_octove(){
    const keyboard_octaves = Element.elm_octaves
    for(const keyboard_octave of keyboard_octaves){
      const octave_num = keyboard_octave.getAttribute('data-octave')
      const editor_octave = document.createElement('div')
      editor_octave.classList.add('octave')
      editor_octave.setAttribute('data-octave' , octave_num)
      Element.elm_editor.appendChild(editor_octave)
      this.set_dataLine(keyboard_octave, editor_octave)
    }
  }

  // キー毎の表示処理
  set_dataLine(keyboard_octave ,editor_octave){
    const keys = keyboard_octave.querySelectorAll(':scope > *')
    for(const key of keys){
      const div = document.createElement('div')
      div.setAttribute('data-type', key.getAttribute('data-type'))
      div.setAttribute('data-key' , key.getAttribute('data-key'))
      editor_octave.appendChild(div)
    }
  }

  static set_addSize(size){
    Element.elm_editor.style.setProperty('padding-right', `${size}px`, '')
    Timebar.set_width(Element.elm_editor.scrollWidth + size)
  }
}