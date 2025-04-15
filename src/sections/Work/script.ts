// Part 1: Dots, Col, and Circuit classes
interface Dot  { opacity: number; x: number; y: number; }
export class Dots {
    spacing: number
    dots: Dot[][]
    alphaStep: number
    cols: number
    rows: number
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    private ghostCanvas: HTMLCanvasElement | null = null; // Cache for ghost canvas
    constructor(width: number, height: number, spacing: number) {
      this.spacing = spacing
      this.dots = []
      this.alphaStep = 1 / 10
      this.cols = Math.floor(width / spacing)
      this.rows = Math.floor(height / spacing)
  
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
  
      if (!ctx) {
        throw new Error("Could not get canvas context")
      }
  
      canvas.width = width
      canvas.height = height
      this.canvas = canvas
      this.ctx = ctx
  
      this.draw()
    }
  
    draw() {
      const ctx = this.ctx
      const spacing = this.spacing
  
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear existing content
      ctx.fillStyle = "rgba(255, 255, 141, 1)"
      this.dots = Array.from({ length: this.cols }, (_, x) => {
        return Array.from({ length: this.rows }, (_, y) => {
          const dot = {
            opacity: 0.1,
            x: x * spacing,
            y: y * spacing,
          }
  
          ctx.fillRect(dot.x, dot.y, 1, 1)
          return dot
        })
      })
      this.ghostCanvas = null; // Invalidate cached ghost canvas when dots change
    }
  
    ghost() {
      if (this.ghostCanvas) {
        return this.ghostCanvas;
      }
      const ghostDots = document.createElement("canvas")
      ghostDots.width = this.canvas.width
      ghostDots.height = this.canvas.height
  
      const dotsCtx = ghostDots.getContext("2d")
      if (!dotsCtx) {
        throw new Error("Could not get ghost canvas context")
      }
  
      dotsCtx.fillStyle = "rgb(24, 129, 141)"
      this.dots.forEach((col) => {
        col.forEach((dot) => {
          dotsCtx.fillRect(dot.x, dot.y, 1, 1)
        })
      })
      this.ghostCanvas = ghostDots;
      return ghostDots
    }
}

export class Col {
  rows: number[]
  free: number

  constructor(rows: number) {
    this.rows = Array(rows).fill(0)
    this.free = rows
  }
}

export class Circuit {
  start: [number, number]
  cellSize: number
  path: [number, number][]
  end: [number, number] | null
  things: Thing[]
  length: number
  coords: [number, number][]

  constructor(start: [number, number], size: number) {
    this.start = start
    this.cellSize = size
    this.path = []
    this.end = null
    this.things = []
    this.length = 0
    this.coords = []
  }
}

// Part 2: Circuits class

export class Circuits {
  size: number
  width: number
  height: number
  cols: number
  rows: number
  scene: Col[]
  collection: Circuit[]
  minLength: number
  maxLength: number
  canvas: HTMLCanvasElement | null = null;

  constructor(width: number, height: number, size: number, minLength: number, maxLength: number) {
    this.size = size
    this.width = width
    this.height = height
    this.cols = ~~(width / size)
    this.rows = ~~(height / size)

    this.scene = Array.from({ length: this.cols }, () => new Col(this.rows))

    this.collection = []
    this.minLength = minLength
    this.maxLength = maxLength

    this.populate()
    this.draw()
  }

  draw() {
    if (!this.canvas) {
      this.canvas = document.createElement("canvas")
      this.canvas.width = this.width
      this.canvas.height = this.height
    }
    
    const ctx = this.canvas.getContext("2d")
    const size = this.size

    if (!ctx) {
      throw new Error("Could not get canvas context")
    }

    ctx.strokeStyle = "rgba(59, 177, 188, 1)"
    ctx.lineWidth = Math.round(size / 10)
    this.collection.forEach((circuit) => {
      const point: [number, number] = [circuit.start[0], circuit.start[1]]
      const path = circuit.path

      ctx.beginPath()
      ctx.moveTo(
        point[0] * size + size / 2 + (path[0][0] * size) / 4,
        point[1] * size + size / 2 + (path[0][1] * size) / 4,
      )
      path.forEach((dir, index) => {
        point[0] += dir[0]
        point[1] += dir[1]
        if (index === path.length - 1) {
          ctx.lineTo(point[0] * size + size / 2 - (dir[0] * size) / 4, point[1] * size + size / 2 - (dir[1] * size) / 4)
        } else {
          ctx.lineTo(point[0] * size + size / 2, point[1] * size + size / 2)
        }
      })
      ctx.stroke()
    })

    ctx.lineWidth = ~~(this.size / 5)
    ctx.strokeStyle = "rgba(59, 177, 188, .6)"
    this.collection.forEach((circuit) => {
      ctx.beginPath()
      ctx.arc(circuit.start[0] * size + size / 2, circuit.start[1] * size + size / 2, size / 4, 0, 2 * Math.PI, false)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(circuit.end![0] * size + size / 2, circuit.end![1] * size + size / 2, size / 4, 0, 2 * Math.PI, false)
      ctx.stroke()
    })

  }

  populate() {
    const size = this.size

    let start: [number, number] | false
    let n = 1000
    const maxLength = this.maxLength
    const minLength = this.minLength
    let length = 0
    let dir: [number, number]

    while ((start = this.getStart()) && n--) {
      length = minLength + ~~(Math.random() * (maxLength - minLength))
      dir = this.getDir(start)

      this.setUsed(start[0], start[1])
      // if we can move from this point
      if (dir[0] !== 0 || dir[1] !== 0) {
        const circuit = new Circuit(start, size)
        let moving = true
        const path: [number, number] = [start[0], start[1]]
      //   const coords: [number, number] = [start[0], start[1]]
        length--

        while (moving && length) {
          circuit.path.push(dir)
          circuit.coords.push([path[0], path[1]])

          path[0] += dir[0]
          path[1] += dir[1]

          // set used
          this.setUsed(path[0], path[1])
          // get new dir
          dir = this.getDir(path, dir)
          if (dir[0] === 0 && dir[1] === 0) {
            moving = false
          }
          length--
        }

        if (circuit.path.length >= minLength) {
          circuit.end = path
          circuit.coords.push([path[0], path[1]])

          let speed = Math.random() * 0.5 + 0.5

          circuit.things.push(this.createThing(circuit, speed * 1))

          if (circuit.path.length > maxLength / 3) {
            speed = Math.random() * 0.5 + 0.5
            circuit.things.push(this.createThing(circuit, -speed, circuit.path.length * size))
          }

          if (circuit.path.length > maxLength / 1.5) {
            speed = Math.random() * 0.5 + 0.5 * (Math.random() >= 0.5 ? -1 : 1)
            circuit.things.push(this.createThing(circuit, speed, Math.random() * circuit.path.length * size))
          }

          circuit.length = circuit.path.length * size
          this.collection.push(circuit)
        }
      }
    }
  }

  getStart(): [number, number] | false {
    let free: number[] = []

    // select cols with free cell
    this.scene.forEach((col, index) => {
      if (col.free) {
        free.push(index)
      }
    })

    if (free.length) {
      // pick one of the col
      const col = this.pickOne(free)

      // select the free cells in the col
      free = []
      this.scene[col].rows.forEach((row, index) => {
        if (row === 0) {
          free.push(index)
        }
      })

      // pick one of the cell
      const row = this.pickOne(free)

      return [col, row]
    }

    return false
  }

  pickOne(array: number[]): number {
    return array[~~(Math.random() * array.length)]
  }

  setUsed(x: number, y: number) {
    this.scene[x].rows[y] = 1
    this.scene[x].free--
  }

  isAvailable(x: number, y: number): boolean {
    return this.scene[x]?.rows[y] === 0
  }

  getDir(fromPoint: [number, number], oldDir: [number, number] | null = null): [number, number] {
    const possibleX: number[] = []
    const possibleY: number[] = []
    const result: [number, number] = [0, 0]

    if (oldDir && Math.random() <= 0.5) {
      if (this.isAvailable(fromPoint[0] + oldDir[0], fromPoint[1] + oldDir[1])) {
        return oldDir
      }
    }

    // Xs
    if (this.isAvailable(fromPoint[0] - 1, fromPoint[1])) {
      possibleX.push(-1)
    }
    if (this.isAvailable(fromPoint[0] + 1, fromPoint[1])) {
      possibleX.push(1)
    }

    // Ys
    if (this.isAvailable(fromPoint[0], fromPoint[1] - 1)) {
      possibleY.push(-1)
    }
    if (this.isAvailable(fromPoint[0], fromPoint[1] + 1)) {
      possibleY.push(1)
    }

    if (possibleX.length && Math.random() < 0.5) {
      result[0] = this.pickOne(possibleX)
    } else if (possibleY.length) {
      result[1] = this.pickOne(possibleY)
    }

    return result
  }

  createThing(circuit: Circuit, velocity: number, done = 0): Thing {
    return new Thing(circuit, velocity, done)
  }
  
  cleanup() {
    this.collection.forEach(circuit => {
        circuit.things = [];
    });
    this.collection = [];
    this.canvas = null;
  }
}

// Part 3: Thing and Things classes

export class Thing {
  circuit: Circuit
  velocity: number
  done: number
  x: number
  y: number
  dots: unknown[]

  constructor(circuit: Circuit, velocity: number, done = 0) {
    this.circuit = circuit
    this.velocity = velocity
    this.done = done
    this.x = 0
    this.y = 0
    this.dots = []
  }

  update() {
    const circuit = this.circuit
    const size = circuit.cellSize

    const length = circuit.length
    const start = circuit.start
    const end = circuit.end!
    const path = circuit.path

    this.done += this.velocity
    if (this.done <= 0) {
      this.done = 0
      this.velocity = -this.velocity
    } else if (this.done >= length) {
      this.done = length
      this.velocity = -this.velocity
    }

    let x: number, y: number

    if (this.done <= size / 2) {
      x = start[0] * size + size / 2 + this.done * path[0][0]
      y = start[1] * size + size / 2 + this.done * path[0][1]
    } else if (this.done > length - size / 2) {
      x = end[0] * size + size / 2 - (length - this.done) * path[path.length - 1][0]
      y = end[1] * size + size / 2 - (length - this.done) * path[path.length - 1][1]
    } else {
      const index = ~~(this.done / size)
      const done = this.done - index * size
      const dir = path[index]
      const point = circuit.coords[index]

      x = point[0] * size + size / 2 + done * dir[0]
      y = point[1] * size + size / 2 + done * dir[1]
    }

    this.x = ~~x
    this.y = ~~y
  }

  distFromSister(): number {
    const circuit = this.circuit
    let dist = Number.POSITIVE_INFINITY
    let tmp: number

    circuit.things.forEach((thing) => {
      if (thing !== this) {
        tmp = Math.abs(thing.done - this.done)
        if (tmp < dist) {
          dist = tmp
        }
      }
    })

    return dist
  }
}

export class Things {
  width: number
  height: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  collection: Thing[]
  lightRadius: number
  dotsGhost: HTMLCanvasElement
  ghostRadial: HTMLCanvasElement
  ghostSuperRadial: HTMLCanvasElement

  constructor(width: number, height: number) {
    
    this.width = width
    this.height = height

    this.canvas = document.createElement("canvas")
    this.canvas.width = width
    this.canvas.height = height

    const ctx = this.canvas.getContext("2d")
    if (!ctx) {
      throw new Error("Could not get canvas context")
    }
    this.ctx = ctx

    this.collection = []
    this.lightRadius = 0
    this.dotsGhost = document.createElement("canvas")
    this.ghostRadial = document.createElement("canvas")
    this.ghostSuperRadial = document.createElement("canvas")
  }

  create(circuit: Circuit, velocity: number, done = 0): Thing {
    const thing = new Thing(circuit, velocity, done)
    this.collection.push(thing)
    return thing
  }

  update() {
    this.collection.forEach((thing) => {
      thing.update()
    })
  }

  draw() {
    const ctx = this.ctx
    const radius = this.lightRadius
  //   const diameter = radius * 2
    const space = radius / 3

    ctx.clearRect(0, 0, this.width, this.height)
    this.collection.forEach((thing) => {
      thing.update()
      let radial = this.ghostRadial
      let diffX = radius
      let diffY = radius // Declare diffY here
      if (thing.distFromSister() <= space) {
        radial = this.ghostSuperRadial
        diffX = radial.width / 2
        diffY = radial.height / 2
      }
      ctx.drawImage(radial, thing.x - diffX, thing.y - diffY, radial.width, radial.height)
    })

    ctx.save()
    ctx.globalCompositeOperation = "destination-in"
    ctx.drawImage(this.dotsGhost, 0, 0)
    ctx.restore()

    ctx.save()
    ctx.globalCompositeOperation = "source-over"
    ctx.fillStyle = "#afe3e9"
    this.collection.forEach((thing) => {
      ctx.beginPath()
      ctx.arc(thing.x, thing.y, radius / 6, 0, 2 * Math.PI, false)
      ctx.fill()
    })
    ctx.restore()
  }

  setDotsGhost(canvas: HTMLCanvasElement) {
    this.dotsGhost = canvas
  }

  setLight(lightRadius: number) {
    this.lightRadius = lightRadius

    this.ghostRadial = document.createElement("canvas")
    this.ghostRadial.width = lightRadius * 2
    this.ghostRadial.height = lightRadius * 2

    const radialCtx = this.ghostRadial.getContext("2d")
    if (!radialCtx) {
      throw new Error("Could not get radial context")
    }

    let gradient = radialCtx.createRadialGradient(lightRadius, lightRadius, lightRadius, lightRadius, lightRadius, 0)
    gradient.addColorStop(0, "rgba(24, 129, 141, 0)")
    gradient.addColorStop(1, "rgba(24, 129, 141, .6)")

    radialCtx.fillStyle = gradient
    radialCtx.fillRect(0, 0, lightRadius * 2, lightRadius * 2)

    // star
    this.ghostSuperRadial = document.createElement("canvas")
    const radWidth = (this.ghostSuperRadial.width = lightRadius * 15)
    const radHeight = (this.ghostSuperRadial.height = lightRadius * 20)

    const superRadialCtx = this.ghostSuperRadial.getContext("2d")
    if (!superRadialCtx) {
      throw new Error("Could not get super radial context")
    }

    gradient = superRadialCtx.createRadialGradient(
      radWidth / 2,
      radHeight / 2,
      radWidth / 2,
      radWidth / 2,
      radHeight / 2,
      0,
    )
    gradient.addColorStop(0, "rgba(37, 203, 223, 0)")
    gradient.addColorStop(1, "rgba(37, 203, 223,  .4)")

    superRadialCtx.fillStyle = gradient

    superRadialCtx.beginPath()
    superRadialCtx.moveTo(radWidth / 2 + lightRadius / 6, radHeight / 2 - lightRadius / 3)
    superRadialCtx.lineTo(radWidth, 0)
    superRadialCtx.lineTo(radWidth / 2 + lightRadius / 3, radHeight / 2 - lightRadius / 6)
    superRadialCtx.lineTo((3 * radWidth) / 4, radHeight / 2)
    superRadialCtx.lineTo(radWidth / 2 + lightRadius / 3, radHeight / 2 + lightRadius / 6)
    superRadialCtx.lineTo(radWidth, radHeight)
    superRadialCtx.lineTo(radWidth / 2 + lightRadius / 6, radHeight / 2 + lightRadius / 3)
    superRadialCtx.lineTo(radWidth / 2, (3 * radHeight) / 4)
    superRadialCtx.lineTo(radWidth / 2 - lightRadius / 6, radHeight / 2 + lightRadius / 3)
    superRadialCtx.lineTo(0, radHeight)
    superRadialCtx.lineTo(radWidth / 2 - lightRadius / 3, radHeight / 2 + lightRadius / 6)
    superRadialCtx.lineTo(radWidth / 4, radHeight / 2)
    superRadialCtx.lineTo(radWidth / 2 - lightRadius / 3, radHeight / 2 - lightRadius / 6)
    superRadialCtx.lineTo(0, 0)
    superRadialCtx.lineTo(radWidth / 2 - lightRadius / 6, radHeight / 2 - lightRadius / 3)
    superRadialCtx.lineTo(radWidth / 2, radHeight / 4)
    superRadialCtx.lineTo(radWidth / 2 + lightRadius / 6, radHeight / 2 - lightRadius / 3)
    superRadialCtx.fill()
  }
  cleanup() {
    this.collection = [];
    this.dotsGhost = document.createElement("canvas");
    this.ghostRadial = document.createElement("canvas");
    this.ghostSuperRadial = document.createElement("canvas");
}
}
  
// Part 4: Background class
export class Background {
  width: number
  height: number
  private cachedCanvas: HTMLCanvasElement | null = null;
  private lastDotsVersion: number = 0;
  private lastCircuitsVersion: number = 0;

  constructor(width: number, height: number) {
      this.width = width
      this.height = height
  }

  getBackground(dots: Dots, circuits: Circuits): HTMLCanvasElement {
      // Reuse canvas if dimensions match and content hasn't changed
      if (!this.cachedCanvas || 
          this.cachedCanvas.width !== this.width || 
          this.cachedCanvas.height !== this.height) {
          this.cachedCanvas = document.createElement("canvas");
          this.cachedCanvas.width = this.width;
          this.cachedCanvas.height = this.height;
      }

      const ctx = this.cachedCanvas.getContext("2d");
      if (!ctx) {
          throw new Error("Could not get background context");
      }

      // Only redraw if components have changed
      if (this.lastDotsVersion !== dots.dots.length || 
          this.lastCircuitsVersion !== circuits.collection.length) {
          
          ctx.clearRect(0, 0, this.width, this.height);
          ctx.drawImage(dots.canvas, 0, 0);
          ctx.drawImage(circuits.canvas as HTMLCanvasElement, 0, 0);
          
          // Store current state versions
          this.lastDotsVersion = dots.dots.length;
          this.lastCircuitsVersion = circuits.collection.length;
      }

      return this.cachedCanvas;
  }

  cleanup() {
      // Properly dereference canvas for GC
      if (this.cachedCanvas) {
          this.cachedCanvas.width = 1;
          this.cachedCanvas.height = 1;
          this.cachedCanvas = null;
      }
  }
}
  