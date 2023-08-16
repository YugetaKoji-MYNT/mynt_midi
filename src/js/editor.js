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
    const octave   = this.get_octave(e.target)
    const key      = this.get_key(e.target)
    const key_elm  = e.target.closest('[data-key]')
    const octave_rect = key_elm.closest('.octave')
    const key_type = key_elm.getAttribute('data-type')
    // const octave_rect = key_elm.closest('.octave').getBoundingClientRect()
    // console.log(key_elm)
    // クリックした座標を取得
    const editor_rect = Element.elm_editor.getBoundingClientRect()

    console.log(key_elm.offsetTop, octave_rect.offsetTop)

    const pos = {
      x : Editor.get_pos_x(e.pageX - editor_rect.left),
      // y : Editor.get_pos_y(key_elm.offsetTop),
      y : Editor.get_pos_y(key_elm.offsetTop + octave_rect.offsetTop),
      // y : key_elm.offsetTop,
    }
    // console.log(pos,e.pageX,editor_rect.left,document.scrollingElement.scrollLeft,Element.elm_editor.scrollLeft)
    // const pos_y = e.pageY - editor_rect.top + document.scrollingElement.scrollTop + Element.elm_editor.scrollTop
    // const pos_x = e.pageX - editor_rect.left + document.scrollingElement.scrollLeft + Element.elm_editor.scrollLeft

    // クリックしたtimeを取得(エディタ面をクリックした座標からtimelineの時間を取得)
    // const time = Timebar.get_pos_x(pos)
    this.put_note(pos.y , pos.x , 50 , key_type)
  }
  static get_pos_x(left){
    left = left + Element.elm_editor.scrollLeft
    // left = left + document.scrollingElement.scrollLeft + Element.elm_editor.scrollLeft
    left = left < 0 ? 0 : left
    return left
  }
  static get_pos_y(top){//console.log(top,document.scrollingElement.scrollTop,Element.elm_editor.scrollTop)
    // top = top + Element.elm_editor.scrollTop,
    // top = key_rect.top + document.scrollingElement.scrollTop + Element.elm_editor.scrollTop,
    top = top < 0 ? 0 : top
    return top
  }

  get_octave(elm){
    const octave = elm.closest('.octave')
    return octave ? octave.getAttribute('data-octave') : null
  }
  get_key(elm){
    const elm_key = elm.closest('[data-key]')
    return elm_key ? elm_key.getAttribute('data-key') : null
  }

  // 音符を配置
  put_note(top, left , width , type){
    const note = document.createElement('div')
    note.classList.add('note')
    note.style.setProperty('left'  , `${left}px`,'')
    note.style.setProperty('top'   , `${top}px`,'')
    note.style.setProperty('width' , `${width}px`,'')
    note.setAttribute('data-type' , type)
    Element.elm_editor.appendChild(note)
  }

}