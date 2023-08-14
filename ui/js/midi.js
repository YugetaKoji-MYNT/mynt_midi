import { Element } from './element.js'

/*
  Ex)
  str : "T32O3CDEFGAB04C"
  T* : テンポ(４分音符が１分間で表示される値)　(60 * 1000 / 12 )* TEMPO
  O* : オクターブ
  CDEFGAB : ドレミファソラシド
  C- : フラット
  C+ : シャープ
  ~  : Fade.out
  S  : Space(Blank)
*/

export class Midi{
  constructor(data){
    this.data = data || null
  }

  static get analyser(){
    const audio = new (window.AudioContext || window.webkitAudioContext)
    return audio.createAnalyser()
  }


  static play(data){
    const code     = Midi.get_code(data)
    Midi.sound(code)
  }

  static get_code(data){
    const datas = [];
    let T    = 120, 
        O    = 5 , 
        S    = "",
        time = 0,
        res  = null,
        reg  = new RegExp("([TOCDEFGAB~S])([0-9\+\-]*)","ig")

    while ((res = reg.exec(data)) !== null) {
      if(!res[1]){continue}
      let mode  = res[1].toUpperCase()
      let value = res[2]
      switch(mode){
        case "T":
          T = value
          continue
        case "O":
          O = value
          continue
        case "~":
          S = "~"
          break
        case "S":
          S = "S"
          break
        case "C":
        case "D":
        case "E":
        case "F":
        case "G":
        case "A":
        case "B":
          S = value ? mode + value : mode
          break
      }
      let tempo = Midi.tdur(T , 4)
      let data = {
        T     : T,
        O     : O,
        S     : S,
        tempo : tempo,
        value : Midi.scale2value(S, O),
        time  : time,
      }
      datas.push(data)
      time += tempo
    }
    return datas
  }

  static scale2value(S, O){
    let scale = 0
    let add   = 12
    switch(S){
      case "B+": // ??
      case "C" : 
        scale = 0
        break
      case "C+":
      case "D-": 
        scale = 1
        break
      case "D" : 
        scale = 2
        break
      case "D+":
      case "E-": 
        scale = 3
        break
      case "F-": // ??
      case "E" : 
        scale = 4
        break
      case "E+": // ??
      case "F" : 
        scale = 5
        break
      case "F+":
      case "G-": 
        scale = 6
        break
      case "G" : 
        scale = 7
        break
      case "G+":
      case "A-": 
        scale = 8
        break
      case "A" : 
        scale = 9
        break
      case "A+":
      case "B-": 
        scale = 10
        break
      case "C-": // ??
      case "B" : 
        scale = 11
        break
      case "S" :
      case "~" : 
        return ""
    }
    const midi = (O * add) + scale
    return Midi.mtof(midi)
  }

  static tdur(tempo, length) {
    return (60 / tempo) * (4 / length)
  }

  static mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12)
  }

  static sound(code){
    const audioContext  = new (window.AudioContext || window.webkitAudioContext)()
    const destination   = audioContext.createAnalyser()
    const oscillator    = audioContext.createOscillator()
    const gain          = audioContext.createGain()
    oscillator.type     = Element.oscillator_type
    destination.fftSize = 2048
    destination.connect(audioContext.destination)

    let time = 0
    for(let i=0; i<code.length; i++){
      let data = code[i]
      if(data.value){
        oscillator.frequency.setValueAtTime(data.value , time)
      }
      else if(data.S === "~"){
        gain.gain.linearRampToValueAtTime(0, time)
      }
      else if(data.S === "S"){
        oscillator.frequency.setValueAtTime(0 , time)
      }
      else{
        continue
      }
      time += data.tempo
    }
    oscillator.start(0)
    oscillator.stop(time)
    oscillator.connect(gain) // OscillatorをAnalyserに接続
    gain.gain.value = 1.0
    gain.connect(destination)
  }
}
