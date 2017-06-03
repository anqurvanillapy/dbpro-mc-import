const fs = require('fs')

let [tmplFile, outputFile] = ['.tmpl.js', '.js'].map(ext => `movieclip${ext}`)
let [tmpl, cli] = [tmplFile, 'mc2db'].map(f => {
  return fs.readFileSync(f, 'utf-8').split('\n').filter(Boolean)
})

let scanData = new Promise((resolve, reject) => {
  let deep = false
  let payload = {}
  let func = ''
  let buf = []

  cli.forEach(l => {
    let begin = l.split(' @begin ')[1]
    let end = l.includes('@end')

    if (begin) {
      deep = !deep
      func = begin
      return
    }

    if (deep && end) {
      deep = !deep
      payload[func] = {}
      payload[func].buf = buf
      payload[func].length = buf.length
      buf = []
    }

    if (deep) buf.push(l)
  })

  resolve(payload)
})

let scanTemplate = new Promise((resolve, reject) => {
  let payload = {}

  tmpl.forEach((l, i) => {
    let name = l.split(' @name ')[1]
    if (name) payload[name] = i
  })

  resolve(payload)
})

let render = (d, t) => {
  return new Promise((resolve, reject) => {
    let written = 0
    Object.keys(t).forEach(func => {
      tmpl.splice.apply(tmpl, [t[func] + written, 0].concat(d[func].buf))
      written += d[func].length
    })
    resolve()
  })
}

Promise.all([scanData, scanTemplate]).then(v => {
  let [d, t] = v

  render(d, t).then(_ => {
    fs.writeFileSync(outputFile, tmpl.join('\n'))
  })
})
