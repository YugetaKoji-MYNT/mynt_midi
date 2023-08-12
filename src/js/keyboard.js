import { Element } from './element.js'
import { Convert } from './common/convert.js'

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
      Element.elm_keyboard.insertAdjacentHTML('beforeend' ,html)
    }
    this.finish()
  }
  finish(){
    if(this.options.callback){
      this.options.callback()
    }
  }
}