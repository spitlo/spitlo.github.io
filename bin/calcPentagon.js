const PI = Math.PI
const sides = 5
const args = process.argv.slice(2)

const calc = (centerX = 0, centerY = 0, radius = 0) => {
  let points = []
  for (let i = 0; i < sides; i++) {
    let angle = PI + 2 * PI * i / sides
    let x = Math.round(centerX + radius * Math.cos(angle))
    let y = Math.round(centerY + radius * Math.sin(angle))
    points.push([x, y])
  }
  points = points.map((p) => p.join(','))
  console.log('Points:')
  console.log(points.join(' '))
}

if (args.length < 3) {
  console.error('Please supply three arguments: Center X, Center Y and Radius')
} else {
  calc(Number(args[0]), Number(args[1]), Number(args[2]))
}
