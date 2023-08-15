import { Element } from './element.js'
import { Timebar } from './timebar.js'

export class Editor{
  constructor(){
    Editor.clear()
    this.set_octove()
    this.set_event()
    Timebar.view_line()
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
    Timebar.set_width(Element.elm_editor.scrollWidth + size)
  }

  // エディターをクリックした時の処理
  click_editor(e){
    // key-lineクリック以外は処理しない
    if(!e.target.closest('[data-key]')){return}
    // console.log(e.target)

    // クリックした座標を取得
    const rect_editor = Element.elm_editor.getBoundingClientRect()
    const pos_y = e.pageY - rect_editor.top + document.scrollingElement.scrollTop + Element.elm_editor.scrollTop
    const pos_x = e.pageX - rect_editor.left + document.scrollingElement.scrollLeft + Element.elm_editor.scrollLeft

    // クリックしたtimeを取得(エディタ面をクリックした座標からtimelineの時間を取得)
    const time = Timebar.get_pos(pos_x)
    this.put_note(pos_y , time , 50)
  }

  get_pos_y(pos_y){

  }

  // 音符を配置
  put_note(top, left , width){
    const note = document.createElement('div')
    note.classList.add('note')
    note.style.setProperty('left'  , `${left}px`,'')
    note.style.setProperty('top'   , `${top}px`,'')
    note.style.setProperty('width' , `${width}px`,'')
    Element.elm_editor.appendChild(note)
  }

}