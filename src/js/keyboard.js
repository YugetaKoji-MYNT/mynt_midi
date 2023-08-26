import { Element } from './element.js'
import { Convert } from './common/convert.js'
import { Midi }    from './midi.js'

export class Keyboard{
  constructor(options){
    this.options = options || {}
    this.asset_load()
  }

  // 鍵盤HTMLのファイルパス
  get filepath_asset(){
    return 'asset/octave.html'
  }

  // 鍵盤HTMLの読み込み処理
  asset_load(){
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true;
    xhr.open('GET' , this.filepath_asset , true)
    xhr.setRequestHeader("Content-Type", "text/html");
    xhr.onload = this.asset_loaded.bind(this)
    xhr.send()
  }

  // 鍵盤HTMLの読み込み完了処理
  asset_loaded(e){
    this.asset_octave = e.target.response
    this.view_octave()
  }

  // オクターブ別表示
  view_octave(){
    for(let i=0; i<Element.octave_count; i++){
      const html = new Convert(this.asset_octave).double_bracket({octave : i})
      Element.elm_keyboard.insertAdjacentHTML('afterbegin' ,html)
    }
    this.set_event()
    // Keyboard.set_center()
    this.finish()
  }

  // イベントセット
  set_event(){
    Element.elm_keyboard.addEventListener('click' , Keyboard.key_click)
  }

  // 初期位置をオクターブ中心にする
  static set_center(){
    Element.elm_keyboard.scrollTop = (Element.elm_keyboard.scrollHeight - Element.elm_keyboard.offsetHeight) / 2
  }

  // 初期設定終了後処理
  finish(){
    if(this.options.callback){
      this.options.callback()
    }
  }

  // 鍵盤をクリックした時の処理
  static key_click(e){
    const elm_oct = e.target.closest('.octave')
    const elm_key = e.target.closest('[data-key]')
    const oct = elm_oct.getAttribute('data-octave')
    const key = elm_key.getAttribute('data-key')
    console.log(oct,key)
    Midi.play(`T450O${oct}${key}`)
    // Midi.play('T450O7EGO8ECDG') // coin
  }
}