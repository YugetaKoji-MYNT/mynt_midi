import { Element }  from './element.js'
import { Timebar }  from './timebar.js'
import { Timeline } from './timeline.js'

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
    Element.elm_editor.addEventListener('mousedown' , this.note_move_start.bind(this))
    Element.elm_editor.addEventListener('mousemove' , this.note_move_move.bind(this))
    Element.elm_editor.addEventListener('mouseup'   , this.note_move_end.bind(this))
    window.addEventListener('mousedown' , this.click_note.bind(this))
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
  }

  // エディターをクリックした時の処理
  click_editor(e){
    // key-lineクリック以外は処理しない
    if(!e.target.closest('.octave [data-key]')){return}
    const octave      = this.get_octave(e.target)
    const key         = this.get_key(e.target)
    const key_elm     = e.target.closest('[data-key]')
    const octave_rect = key_elm.closest('.octave')
    const key_type    = key_elm.getAttribute('data-type')
    const pos = {
      x : Editor.get_pos_x(e.pageX),
      y : Editor.get_pos_y(key_elm.offsetTop + octave_rect.offsetTop),
    }
    const left        = this.note_pos_adjust(pos.x)
    // if(this.is_note_exist(octave, key, left)){return}
    // クリックしたtimeを取得(エディタ面をクリックした座標からtimelineの時間を取得)
    this.put_note(pos.y , left , key_type , octave , key)
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
    note.setAttribute('data-status' , 'active')
    Element.elm_editor.appendChild(note)
  }

  note_move_start(e){
    const note = e.target.closest('.note')
    if(!note){return}
    this.move_note = {
      elm   : note,
      mouse : e.pageX,
      left  : note.offsetLeft,
    }
  }
  note_move_move(e){
    if(!this.move_note){return}
    const note = this.move_note.elm
    let left = this.move_note.left - (this.move_note.mouse - e.pageX)
    left = this.note_pos_adjust(left)
    // left = left + Element.elm_editor.scrollLeft - (Editor.default_note_width / 2)
    // console.log(left , this.move_note.left , this.move_note.mouse , e.pageX)
    note.style.setProperty('left' , `${left}px` , '')
  }
  note_move_end(e){
    if(!this.move_note){return}
    delete this.move_note
  }
  // 音符(note)を既定値に丸め込む処理(x軸)
  note_pos_adjust(num){
    // 丸める既定値(px)
    const step_size = Timeline.msec / Timeline.msec_step
    return Math.floor(num / step_size) * step_size
  }

  is_note_exist(octave, key, left){
    // console.log(octave, key, left)
    const note = this.search_note(octave, key, left)
    // console.log(note)
    return note ? true : false
  }
  search_note(octave, key, left){
    const notes = Element.elm_editor.querySelectorAll(`.note[data-octave='${octave}'][data-key='${key}']`)
    if(!notes || !notes.length){return}
    left += (Editor.default_note_width / 2)
    for(const note of notes){
      const trans = {
        left  : note.offsetLeft,
        width : note.offsetWidth,
      }
      console.log(left, trans.left, trans.width)
      if(trans.left <= left && trans.left + trans.width >= left){
        return true
      }
    }
  }
  click_note(e){
    this.clear_status_all_note()
    const note = e.target.closest('.editor .note')
    if(note){
      note.setAttribute('data-status' , 'active')
    }
  }
  clear_status_all_note(){
    const elms = Element.elm_editor.querySelectorAll(`.note[data-status='active']`)
    for(const elm of elms){
      elm.removeAttribute('data-status')
    }
  }
}