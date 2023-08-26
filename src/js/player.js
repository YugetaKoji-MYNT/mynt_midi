import { Midi }   from './midi.js'
import { String } from './string.js'

export class Player{
  constructor(){
    Player.play()
  }
  static get elm_midi_string(){
    return document.querySelector(`[name='midi-string']`)
  }
  static play(midi_string){
    midi_string = midi_string || String.elm_midi_string.value
    if(!midi_string){return}
    Midi.play(midi_string)
  }
}