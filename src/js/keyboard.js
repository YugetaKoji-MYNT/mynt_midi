import { Element } from './element.js'
import { Convert } from './common/convert.js'
import { Midi }    from './midi.js'

export class Keyboard{
  constructor(options){
    this.options = options || {}
    this.asset_load()
  }
  get filepath_asset(){
    return 'asset/octave.html'
  }
  asset_load(){
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true;
    xhr.open('GET' , this.filepath_asset , true)
    xhr.setRequestHeader("Content-Type", "text/html");
    xhr.onload = this.asset_loaded.bind(this)
    xhr.send()
  }
  asset_loaded(e){
    this.asset_octave = e.target.response
    this.view_octave()
  }
  view_octave(){
    for(let i=0; i<Element.octave_count; i++){
      const html = new Convert(this.asset_octave).double_bracket({octave : i})
      Element.elm_keyboard.insertAdjacentHTML('afterbegin' ,html)
    }
    this.set_event()
    this.finish()
  }
  set_event(){
    Element.elm_keyboard.addEventListener('click' , Keyboard.key_click)
  }

  finish(){
    if(this.options.callback){
      this.options.callback()
    }
  }

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