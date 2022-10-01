const looper = (file, callback) => {
  fetch(file)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      let source

      const stop = () => {
        if (source) {
          source.stop()
          source = null
        }
      }

      const play = (context) => {
        stop()
        
        context.decodeAudioData(arrayBuffer, (buffer) => {
          source = context.createBufferSource()
          source.connect(context.destination)

          source.buffer = buffer
          source.loop = true

          source.start(0)
        }, (error) => {
          console.error(error)
          callback(new Error(`File ${file} did not load, sorry`))
        })
      }

      callback(null, {
        play,
        stop,
      })
    })
}

export default looper
