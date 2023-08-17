import { Element } from './element.js'
import { Timebar } from './timebar.js'

export class Editor{
  constructor(){
    Editor.clear()
    this.set_octove()
    this.set_event()
    Timebar.view_line()
  }

  static get default_note_width(){
    return 50
  }

  // エディタ内の表示をクリアする
  static clear(){
    Element.elm_editor.innerHTML = ''
  }

  set_event(){
    Element.elm_editor.addEventListener('click' , this.click_editor.bind(this))
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
    // Timebar.set_width(Element.elm_editor.scrollWidth + size)
  }

  // エディターをクリックした時の処理
  click_editor(e){
    // key-lineクリック以外は処理しない
    if(!e.target.closest('[data-key]')){return}
    // console.log(e.target)
    const octave   = this.get_octave(e.target)
    const key      = this.get_key(e.target)
    const key_elm  = e.target.closest('[data-key]')
    const octave_rect = key_elm.closest('.octave')
    const key_type = key_elm.getAttribute('data-type')

    const pos = {
      x : Editor.get_pos_x(e.pageX),
      y : Editor.get_pos_y(key_elm.offsetTop + octave_rect.offsetTop),
    }
    // クリックしたtimeを取得(エディタ面をクリックした座標からtimelineの時間を取得)
    this.put_note(pos.y , pos.x , key_type , octave , key)
  }
  static get_pos_x(left){
    const editor_rect = Element.elm_editor.getBoundingClientRect()
    left = left - editor_rect.left + Element.elm_editor.scrollLeft - (Editor.default_note_width / 2)
    left = left < 0 ? 0 : left
    return left
  }
  static get_pos_y(top){
    top = top < 0 ? 0 : top
    return top
  }

  get_key(elm){
    const elm_key = elm.closest('[data-key]')
    return elm_key ? elm_key.getAttribute('data-key') : null
  }
  get_octave(elm){
    const elm_ectave = elm.closest('.octave')
    return elm_ectave ? elm_ectave.getAttribute('data-octave') : null
  }

  // 音符を配置
  put_note(top, left , type , octave , key){
    const width = Editor.default_note_width
    const note = document.createElement('div')
    note.classList.add('note')
    note.style.setProperty('left'   , `${left}px`,'')
    note.style.setProperty('top'    , `${top}px`,'')
    note.style.setProperty('width'  , `${width}px`,'')
    note.setAttribute('data-type'   , type)
    note.setAttribute('data-octave' , octave)
    note.setAttribute('data-key'    , key)
    Element.elm_editor.appendChild(note)
  }

}