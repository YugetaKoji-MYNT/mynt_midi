import { Midi }    from './midi.js'
import { Editor }  from './editor.js'
import { Element } from './element.js'

export class String{
  constructor(){
    this.set_event()
    String.string2editor()
    Editor.scroll_middle()
  }

  static get elm_midi_string(){
    return document.querySelector(`[name='midi-string']`)
  }

  set_event(){
    String.elm_midi_string.addEventListener('input', this.change_string.bind(this))

  }

  change_string(){
    Editor.note_clear()
    String.string2editor()
  }

  // string文字列をEditorの音符に変換する。
  static string2editor(){
    // 文字列取得
    const string = String.elm_midi_string.value
    if(!string){return}

    // 文字列をデータ変換
    const midi_datas = Midi.get_code(string)
    // console.log(midi)
    // this.convert_data()

    // 音符を置く
    let left = 0
    for(const midi_data of midi_datas){
      // 和音
      if(midi_data.S.match(/\[(.*)\]/)){
        const reg = RegExp(`\\[(.+?)\\]` , 'i')
        const res = reg.exec(midi_data.S)
        // console.log(midi_data.S, res)
        const arr = Midi.get_code(res[1])
        // console.log(midi_data,res,arr)
        // console.log(arr)
        for(const midi_data2 of arr){
          String.put_note(midi_data2.O, midi_data2.S, left)
        }
      }
      // 単音
      else{
        String.put_note(midi_data.O, midi_data.S, left)
      }
      // console.log(midi_data.S)
      left += Editor.default_note_width
    }
  }

  // octave,keyから音符を配置
  static put_note(octave, key , left){//console.log(octave,key,left)
    octave = Number(octave)
    key = key.toLowerCase()
    // const left = String.get_note_pos_x()
    const top  = String.get_note_pos_y(octave, key)
    if(top === null){return}
    // console.log(left,top)
    // console.log(octave,key)
    const width = Editor.default_note_width
    const note = document.createElement('div')
    const type = String.get_key_type(key)
    note.classList.add('note')
    note.style.setProperty('left'   , `${left}px`,'')
    note.style.setProperty('top'    , `${top}px`,'')
    note.style.setProperty('width'  , `${width}px`,'')
    note.setAttribute('data-type'   , type)
    note.setAttribute('data-octave' , octave)
    note.setAttribute('data-key'    , key)
    // note.setAttribute('data-status' , 'active')
    Element.elm_editor.appendChild(note)
  }

  // // 音符のx軸を取得
  // static get_note_pos_x(){
  //   return 0
  // }
  // 音符のy軸を取得
  static get_note_pos_y(octave, key){
    // Editor.get_pos_y(key_elm.offsetTop + octave_rect.offsetTop)
    const elm_octave = Element.elm_editor.querySelector(`.octave[data-octave='${octave}']`)
    if(!elm_octave){return null}
    // console.log(key)
    const elm_key    = elm_octave.querySelector(`[data-key='${key}']`)
    if(!elm_key){return null}
    return Editor.get_pos_y(elm_key.offsetTop + elm_octave.offsetTop)
  }
  static get_key_type(key){
    if(key.match(/\-/)){
      return 'flat'
    }
    else{
      return 'key'
    }
  }
}