// Fish([pos, cost, image] | {born, die, swimTo, afraid, shakeTail})
// Aquarium([border] | {shine})
// Fishman({catchFish} | [score, fishCaught])
// Leaderboards({registerFishman} | [fishman])


function getRandomIntFrom(min=50, max=880)
{
    min = Math.ceil(min)
    max = Math.floor(max)
    return(Math.floor(Math.random() * (max - min)) + min)
}

function getRandomArbitrary(min, max)
{
    return Math.random() * (max - min) + min;
}

function safe(start, stop, startEdge, stopEdge) {

    if (start < startEdge) start = startEdge
    if (stop > stopEdge) stop = stopEdge
    return [start, stop]
}

function delayReturn(timeoutMs)
{
    setTimeout(()=>{
        return null
    }, timeoutMs)
}


class Fish
{
    static fishesHeadOrientation = {
        1: "left",
        2: "left",
        3: "left",
        4: "left",
        5: "right",
        6: "left",
        7: "right",
        8: "left",
        9: "left",
        10: "left",
        11: "right",
        12: "left",
        13: "right",
    }
    static bendOverAnimaClass = 'bendOver'
    static turnAroundAnimaClass = 'turnAround'
    static moveAnimaClass = 'move'
    constructor(id)
    {
        this.id = id
        this.isAlive = false
        this.newLeft = null
        this.newTop = null
        this._initSpawn()
        this.left = this.newLeft
        this.top = this.newTop
        this._spriteId = null
        this.sprite = this._initRandomSprite()
        this._head = this._initHeadOrientation()
        this._sightDirection = this._head
        this._newSightDirection = null
        this.cost = getRandomIntFrom(100, 1450)
        // this.left = this._spawn.left
        // this.top = this._spawn.top
        this.angle = 0
        this.newAngle = null
        this.speed = 50
        this.newSpeed = null
        this.direction = this._head
        this.newDirection = null
        this.needToTurn = null
        this.scaleX = 1
        this.transition = null
        this.bendOverAnima = false
        this.turnAroundAnima = false
        this.moveAnima = false
        this.bendOverDuration = null
        this.moveDuration = null
        this.turnAroundDuration = 4000
        this.spriteSize = this._initRandomSpriteSize()
    }

    _initRandomSprite()
    {
        this._spriteId = getRandomIntFrom(1, 14)
        return `${this._spriteId}.png`
    }

    _initRandomSpriteSize()
    {
        return getRandomIntFrom(60, 140)
    }

    drawUpRoute()
    {
        this.newLeft = getRandomIntFrom(-20, 120)
        this.newTop = getRandomIntFrom(-20, 120)

        let tan = Math.abs(this.newTop - this.top) / Math.abs(this.newLeft - this.left)
        this.newAngle = Math.atan(tan) * 180 / Math.PI

        if (this.newTop < this.top) this.newAngle = -this.newAngle

        // this.bendOverDuration = getRandomIntFrom(50, 800)
        this.bendOverDuration = 4000
        // this.moveDuration = getRandomIntFrom(900, 4600)
        this.moveDuration = 4000
    }

    getRandomCubicBezier()
    {
        let a = getRandomArbitrary(0, 1)
        let b = getRandomArbitrary(0, 1)
        let c = getRandomArbitrary(0, 1)
        let d = getRandomArbitrary(0, 1)
        return `cubic-bezier(${a},${b},${c},${d})`
    }
    swimTo()
    {
        this.drawUpRoute()
        this._orient()

        this.bendOver()
        this.turnAround()
        this.move()
    }
    swimOut()
    {
        this._initSpawn()
        this._orient()
        this.bendOver()
        this.turnAround()
        this.move()
    }
    bendOver()
    {
        // this.bendOverAnima = true
        // this.transition = `transform ${this.bendOverDuration}ms`
        // console.log('bendOver start')
        this.angle = this.newAngle
        // console.log('bend over end')
        // this.transition = ''
        // this.bendOverAnima = false
    }

    turnAround()
    {
        // this.turnAroundAnima = true
        // this.transition = `transform ${this.turnAroundDuration}ms`
        // console.log('turnAround start')
        this._sightDirection = this._newSightDirection
        // console.log('Turn around end')
        // this.transition = ''
        // this.turnAroundAnima = false
    }

    move()
    {
        // this.moveAnima = true
        // this.transition = `left ${this.moveDuration}ms, top ${this.moveDuration}ms`
        // console.log('Move start')
        this.left = this.newLeft
        this.top = this.newTop
        // this.angle = 0
        // console.log('Move end')
        // this.transition = ''
        // this.moveAnima = false
    }

    _orient()
    {
        this.newLeft < this.left ? this._newSightDirection = 'left': this._newSightDirection = 'right'
        this._sightDirection === this._newSightDirection ? this.needToTurn = false: this.needToTurn = true

        if (this.needToTurn) this.scaleX === 1 ? this.scaleX = -1 : this.scaleX = 1

        // this._sightDirection = this._newSightDirection
    }

    _initHeadOrientation()
    {
        return Fish.fishesHeadOrientation[this._spriteId]
    }

    _initSpawn()
    {
        this.isAlive = true
        //TODO Можно оптимизировать, выбирая сначала сторону, а после непосредственно координаты
        this.newLeft = [getRandomIntFrom(-20, -10), getRandomIntFrom(110, 120)][getRandomIntFrom(0, 2)]
        this.newTop = [getRandomIntFrom(-20, -10), getRandomIntFrom(110, 120)][getRandomIntFrom(0, 2)]
    }
}

class RGBA
{
    constructor(r, g, b, a) {
        this.r = null
        this.g = null
        this.b = null
        this.a = null
        this._initColor(r, g, b, a)
    }

    _initColor(r, g, b, a) {
        let colors = [r, g, b]
        console.log(colors)
        if (a < 0 || a > 1) {
            throw Error('Alpha of color must be in (0, 1) range')
        }
        else this.a = a
        for (const color of colors) {
            if (color < 0 || color > 255)
            {
                throw Error('RGB color must be in (0, 255) range')
                return
            }

        }
        [this.r, this.g, this.b] = [...colors]
        // [this.r, this.g, this.b] = [colors[0], colors[1], colors[2]]
    }
    
    generateColor()
    {
        let channels = [this.r, this.g, this.b]
        let newChannels = []
        for (let channel of channels) {
            let start = channel - 1
            let stop = channel + 2
            let safely = safe(start, stop, 0, 255)

            // СУпер классно =)!
            // [start, stop] = [...safe(start, stop, 0, 255)]

            channel = getRandomIntFrom(...safely)
            newChannels.push(channel)
        }
        // console.log(newChannels, '<<<<<<<<<<')

        [this.r, this.g, this.b] = [...newChannels]

        // let start = this.a - 0.02
        // let stop = this.a + 0.02
        // let safely = safe(start, stop, 0, 1)
        // this.a = getRandomArbitrary(...safely)
    }

    getStringView() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
}


class LinearGradient
{
    constructor(deg, lRGBA, rRGBA, transition) {
        this.deg = 0
        this.lRGBA = lRGBA
        this.rRGBA = rRGBA
        this.transition = transition
    }

    generateDegree() {
        let start = this.deg - 0.02
        let stop = this.deg + 0.02
        let safely = safe(start, stop, 0, 100)
        this.deg = getRandomArbitrary(...safely)
    }

    generateTransition() {
        let start = this.transition - 0.02
        let stop = this.transition + 0.02
        let safely = safe(start, stop, 0, 100)
        this.transition = getRandomArbitrary(...safely)
    }

    generateFlow()
    {
        this.generateDegree()
        this.lRGBA.generateColor()
        this.rRGBA.generateColor()
        this.generateTransition()
    }

    getStringView()
    {
        let deg = `${this.deg}deg`
        let lRGBA = `${this.lRGBA.getStringView()}`
        let rRGBA = `${this.rRGBA.getStringView()}`
        let trans = `${this.transition}%`
        return `linear-gradient(${deg}, ${lRGBA}, ${rRGBA} ${trans})`
    }

}


class Aquarium
{
    fishes
    static rgbaGenerator()
    {

    }
    constructor()
    {
        this.fishes = []
        this.fishesCounter = 0
        this.background = null
        this._initBackground()
    }
    addFish()
    {
        let fish = new Fish(this.fishesCounter)
        this.fishes.push(fish)
        ++this.fishesCounter
    }
    clear()
    {
        console.log('clear!!!')
        this.fishesCounter = 0
        this.fishes.splice(0, this.fishes.length)
    }
    _initBackground()
    {
        this.background = []
        this.background.push(new LinearGradient(
            217,
            new RGBA(9, 34, 32, 0.98),
            new RGBA(20, 3, 90, 0.78),
            90
        ))
        this.background.push(new LinearGradient(
            127,
            new RGBA(200, 30, 36, 0.58),
            new RGBA(25, 66, 32, 0.68),
            90
        ))
        this.background.push(new LinearGradient(
            336,
            new RGBA(15, 3, 200, 0.38),
            new RGBA(0, 90, 18, 0.78),
            90
        ))
    }
    shine()
    {
        for (let grad of this.background) {
            grad.generateFlow()
            // console.log(grad.getStringView())
        }
    }
}


class GameSession
{
    static byField(field) {
        return (a, b) => a[field] < b[field] ? 1 : -1
    }

    static checkBest(sessions) {
        while (sessions.length > 10)
        {
            sessions.pop()
        }
    }
    constructor(playerName)
    {
        this.playerName = playerName
        this.scores = 0
        this.fishesCaught = 0
    }
}

class GameInterface
{
    constructor()
    {
        this.start = 'Начать игру'
    }
}


Vue.component('fish', {
    template: `
    <div class="Fish" :class="classObject" @click="catchFish" v-bind:style="styleObject">
<!--    <li class="Fish" v-bind:style="styleObject">-->
    <img class="Fish__sprite" :src="spriteSrc" v-bind:style="spriteStyleObject" alt="Fish Sprite">
    </li>`,
    props: {
        fish: {
            required: true,
            type: Fish
        }
    },
    data()
    {
        return {
            cycleDuration: getRandomIntFrom(),
            cycleId: null,
            caught: false
        }
    },
    methods:
    {
        lifeCycle: function ()
        {
            this.fish.swimTo()
            this.updateCycleDuration()
        },
        catchFish()
        {
            this.caught = true
            // TODO: Плохой способ! См. Vuex, Bus
            if (!app.active)
            {
                console.log('INACTIVEEE')
                return
            }
            //TODO: А если обратиться к экземпляру приложения через переменную app?
            // И таким образом передать туда рыбку? В чем разница?
            console.log('catched!!')

            this.fish.isAlive = false
            setTimeout(()=>{
                this.$emit('fish-caught', this.fish)
            }, 300)

        },
        updateCycleDuration()
        {
            this.cycleDuration = getRandomIntFrom(1500, 7300)
        },
        getCycleDuration()
        {
            return this.cycleDuration
        },
        setLifeCycleId(cycleId)
        {
            this.cycleId = cycleId
        },
        getFishAliveStatus()
        {
            // console.log(this.fish.isAlive, '<<<<fish is alive')
            return this.fish.isAlive
        }


    },
    mounted()
    {
        let boundLifeCycle = this.lifeCycle.bind(this)
        let boundCycleDuration = this.getCycleDuration.bind(this)
        let boundCycleSetter = this.setLifeCycleId.bind(this)
        let boundAliveFishStatus = this.getFishAliveStatus.bind(this)

        let cycleId = setTimeout(function run() {
            if (!boundAliveFishStatus()) return
            boundLifeCycle()
            boundCycleSetter(cycleId)
            cycleId = setTimeout(run, boundCycleDuration())
        }, 1000)

    },
    computed: {
        styleObject: function()
        {
            // console.log(this.fish.getRandomCubicBezier())
            // if (!this.fish.isAlive) return {display: "none"}
            let caught = ""
            if (this.caught)
            {
                caught = ` rotate(0.5turn)`
            }
            return {
                left: `${this.fish.left}%`,
                top: `${this.fish.top}%`,
                // transform: `scaleX(${this.fish.scaleX}) rotate(-${Math.floor(this.fish.angle)}deg)`,
                transform: `scaleX(${this.fish.scaleX})${caught}`,
                transition: `left ${this.cycleDuration}ms ${this.fish.getRandomCubicBezier()},
                top ${this.cycleDuration}ms ${this.fish.getRandomCubicBezier()}, transform 0.3s, opacity 0.3s`,
            }
        },
        spriteStyleObject: function ()
        {
          return {
              width: `${this.fish.spriteSize}px`,
              height: 'auto'
          }
        },
        classObject: function ()
        {
            return {
                "Caught": this.caught
            }
        },
        spriteSrc: function ()
        {
            return `img/fishes/${this.fish.sprite}`
        }
    }
})


Vue.component('game-stat-item', {
    template: `
    <ul>
      <li>{{ getPlace() }}</li>
      <li>{{ game.playerName }}</li>
      <li>{{ game.scores }}</li>
      <li>{{ game.fishesCaught }}</li>
    </ul>
    `,
    mounted() {
        console.log(this.game)
    },
    props: {
        game: {
            required: true,
            type: GameSession
        },
        place: {
            required: true,
            type: Number
        }
    },
    methods: {
      getPlace() {
        return this.place + 1
      },
    },
    data() {
        return {
        }
    }
})

let app = new Vue({
    el: '#app',
    data:
    {
        player: "",
        active: false,
        stopped: true,
        IGame: new GameInterface(),
        aquarium: new Aquarium(),
        gameSessions: [],
        gameCycleId: null,
        gameTimer: 0,
        currentGameSession: null,
        playerDataIsValid: true

    },
    mounted() {
        let boundShine = this.shine.bind(this)
        let aquaTimer = setTimeout(function flow() {
            boundShine()
            aquaTimer = setTimeout(flow, 17)
      }, 500)
    },
    computed: {
        styleObject: function () {
            console.log('testttt')
            let upperGrad = this.aquarium.background[0].getStringView()
            let middleGrad = this.aquarium.background[1].getStringView()
            let lowerGrad = this.aquarium.background[2].getStringView()
            let my = `${upperGrad},
             ${middleGrad},
             ${lowerGrad}`

            let backgroundColor = `linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)`

            let style = {
                background: [my]
            }
            // console.log('orig>>>', background)
            // console.log('my>>>', my)
            return style
        }
    },
    methods: {
        validatePlayerData()
        {
            if (!this.player) this.playerDataIsValid = false
            else this.playerDataIsValid = true
        },
        shine() {
            this.aquarium.shine()
        },
        startGame: function ()
        {
            this.validatePlayerData()
            if (!this.playerDataIsValid) return

            this.stopped = false
            this.initGameSession()
            this.active = true
            this.IGame.start = 'Сыграть еще раз!'

            this.gameTimer = 0
            this.aquarium.clear()
            let boundTick = this.cycleTick.bind(this)
            let boundGameIsStopped = this.gameIsStopped.bind(this)
            let boundTimer = this.getTimer.bind(this)
            // красава, респект!!!
            let boundStopGame = this._stopGame.bind(this)

            let gameCycleId = setTimeout(function tick(){
                if (boundGameIsStopped() || boundTimer() >= 60)
                {
                    console.log('STOOOOOOOOOOOOOOOOOP')
                    boundStopGame()
                    console.log('retuuuuuuuuuuuurn')
                    return
                }
                boundTick()
                gameCycleId = setTimeout(tick, 1000)
                // console.log(gameCycleId, '<<< new gameCycleID?')
            })

            // setTimeout(()=>{
            //     console.log(gameCycleId, '<<<gameCycleID from clear')
            //     clearTimeout(gameCycleId)
            //     this.stopGame()
            //     console.log('Game over')
            // }, 10000)
        },
        eat()
        {
            console.log('eaaaaaaatttt')
        },
        initGameSession()
        {
            this.currentGameSession = new GameSession(this.player)
            console.log(this.currentGameSession, 'session!!!')
        },
        getTimer()
        {
            return this.gameTimer
        },
        gameIsStopped()
        {
          return this.stopped
        },
        add() {
          this.fi.push(new Fish())
        },
        clear() {
        },
        de()
        {
            this.d.splice(0, this.d.length)
        },
        eatFish(fish)
        {

            this.currentGameSession.scores += fish.cost
            this.currentGameSession.fishesCaught += 1
            let idx = this.aquarium.fishes.indexOf(fish)
            this.aquarium.fishes.splice(idx, 1)
        },
        _stopGame: function (gameCycleId)
        {
            this.active = false
            this.stopped = true
            this.gameSessions.push(this.currentGameSession)
            this.gameSessions.sort(GameSession.byField('scores'))
            GameSession.checkBest(this.gameSessions)

            // this.currentGameSession = null
            console.log('Рыбок поймано>>>', this.gameSessions[0].fishesCaught)
            setTimeout(()=>{
                this.aquarium.clear()
            },7500)
            for (let fish of this.aquarium.fishes)
            {
                // fish._initSpawn()
                // [fish.left, fish.top] = [spawnOut.left, spawnOut.top]
                // fish.swimTo()
                fish.swimOut()
                fish.isAlive = false

                // fish.swimTo()
            }

            // clearTimeout(gameCycleId)
            // console.log('Game over')
            this.$emit('game-over')

        }, // Можно ли иначе как-то увеличивать таймер? Как быть с this в плане свойств объекта
        stopGame()
        {
            this.stopped = true
        },
        cycleTick: function ()
        {
            ++this.gameTimer
            let fishesCount = getRandomIntFrom(1, 3)
            for (let i = 0; i < fishesCount; ++i) {
                this.aquarium.addFish()
            }
            console.log(this.aquarium.fishes.length, '<<<len aaa')
        },
        getStat()
        {
            console.log('а фиг тебе!!!')
        }
    }
})