/**
 * shaoky
 * 2017/03/14
 */

/**
 * 滑块组件
 * @param  {number}    [value]      [初始值]
 * @param  {number}    [min]        [最小值]
 * @param  {number}    [max]        [最大值]
 * @param  {number}    [dotSize]    [滑块按钮大小,单位:px]
 * @param  {number}    [step]       [数字间隔,假如 step="3",则数字应该是0、3、6、9以此类推]
 * @param  {number}    [speed]      [动画速度,1 = 1s]
 */

(function(){
    var tm = '<div class="vue-slider-wrap" @click="wrapClick">'+
             '<div class="vue-slider" ref="elem" :style="wrapStyles">'+
             '<div class="vue-slider-always" :style="dotStyles" @touchstart="moveStart" v-if="isMoblie"></div>'+
             '<div class="vue-slider-always" :style="dotStyles" @mousedown="moveStart" v-if="!isMoblie"></div>'+
             '<div class="vue-slider-process" :style="processStyles"></div>'+
             '</div>'+
             '</div>'

    var slider = Vue.extend({
        template: tm,
        data: function () {
            return {
                translateValue: null,
                processValue: null,
                offset: null,
                size: 0,
                time: null
            }
        },
        props: {
            width: {
                type: [Number, String],
                default: 50
            },
            height: {
                type: [Number, String],
                default: 6
            },
            dotSize: {
                type: [Number],
                default: 18
            },
            value: {
                type: [String, Number, Array],
                default: 0
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 1
            },
            data: {
                type: Array,
                default: null
            },
            speed: {
                type: Number,
                default: 0.5
            }
        },
        computed: {
            isMoblie() {
                return this.eventType === 'touch' || this.eventType !== 'mouse' && /(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone|Mobile)/i.test(navigator.userAgent)
            },
            wrapStyles: function () {
                return {
                    height: this.height + 'px'
                }
            },
            dotStyles: function () {
                return {
                    width: this.dotSize + 'px',
                    height: this.dotSize + 'px',
                    top: -(this.dotSize - this.height) / 2 + 'px',
                    transform: 'translateX(' + this.translateValue + 'px)',
                    transition: 'all ' + this.time + 's'
                }
            },
            processStyles: function () {
                return {
                    width: this.processValue + this.dotSize / 2 + 'px',
                    height: this.height + 'px',
                    transition: 'all ' + this.time + 's'
                }
            },
            minimum: function () {
                return this.data ? 0 : this.min
            },
            maximum: function () {
                return this.data ? (this.data.length - 1) : this.max
            },
            total: function () {
                return this.maximum - this.minimum
            },
            gap: function () {
                return this.size / this.total
            }
        },
        created: function () {
            this.setCurrentValue()
            window.addEventListener('resize', this.refresh)
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getStaticData()
                this.bindEvents()
                this.setValue(this.value)
            })
        },
        methods: {
            bindEvents: function () {
                if (this.isMoblie) {
                    document.addEventListener('touchmove', this.moving)
                    document.addEventListener('touchend', this.moveEnd)
                }
                else {
                    document.addEventListener('mousemove', this.moving)
                    document.addEventListener('mouseup', this.moveEnd)
                    document.addEventListener('mouseleave', this.moveEnd)
                }
            },
            unbindEvents() {
                window.removeEventListener('resize', this.refresh)

                if (this.isMoblie) {
                    document.removeEventListener('touchmove', this.moving)
                    document.removeEventListener('touchend', this.moveEnd)
                }
                else {
                    document.removeEventListener('mousemove', this.moving)
                    document.removeEventListener('mouseup', this.moveEnd)
                    document.removeEventListener('mouseleave', this.moveEnd)
                }
            },
            getPos: function (e) {
                return e.clientX - this.offset
            },
            initValue: function (val) {
                var ratio = (val - this.minimum) / ((this.maximum - this.minimum) * this.step)
                this.setValueOnPos(this.size * ratio)
            },
            wrapClick: function (e) {
                var pos = this.getPos(e)
                this.setValueOnPos(pos)
            },
            setValueOnPos: function (pos, bool) {
                var v = Math.round(pos / this.gap + this.minimum)
                if (v > this.maximum) {
                    v = this.maximum
                }
                if (v < this.minimum) {
                    v = this.minimum
                }
                this.setTransform(pos, bool)
                this.setCurrentValue(v)
            },
            setTransform: function (val, bool) {
                var value = val - (this.dotSize / 2)
                if (value < 0 ) {
                    value = -this.dotSize / 2
                    this.processValue = 0
                }
                else {
                    this.processValue = value
                }
                if (value > (this.size - this.dotSize / 2) - 5) {
                    value = this.size - this.dotSize / 2
                    this.processValue = value
                }
                this.translateValue =  value
                bool ? this.time = 0 : this.time = this.speed
            },
            setCurrentValue: function (val) {
                this.val = val * this.step
                this.$emit('callback', this.val)
            },
            setValue: function (val) {
                this.val = val
                this.initValue(this.val)
                this.$emit('callback', this.val)
                this.$emit('input', this.val)
            },
            moveStart(index) {
                this.flag = true
            },
            moving: function (e) {
                if (!this.flag) return false
                e.preventDefault()
                if (this.isMoblie) e = e.targetTouches[0]
                this.setValueOnPos(this.getPos(e), true)
            },
            moveEnd: function (e) {
                this.flag = false
            },
            refresh: function () {
                if (this.$refs.elem) {
                    this.getStaticData()
                }
            },
            getStaticData: function () {
                this.size = this.$refs.elem.offsetWidth
                this.offset = this.$refs.elem.getBoundingClientRect().left
                this.setValue(this.val)
            }
        },
        watch: {
            value(val) {
                console.log(val)
                this.setValue(val)
            }
        },
        beforeDestroy: function () {
            this.unbindEvents()
        }
    })
    window.slider = slider
})()
