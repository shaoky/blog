/**
 * shaoky
 * 2017/03/12
 */

/**
 * 分页组件
 * @param  {int}    [search.page]   [搜索页数]
 * @param  {int}    [search.size]   [搜索条数]
 * @param  {int}    [count]         [总条数]
 * @param  {int}    [showPage]      [设置显示的页数，建议设置奇数3, 5, 7]
 */

(function(){
    var tm = '<div class="page-bar">'+
                '<ul>'+
                '<li @click="prev">上一页</li>'+
                '<li v-for="index in pagenums" :class="{ active: cur == index}" @click="pageChange(index)">'+
                '{{index}}'+
                '</li>'+
                '<li @click="next">下一页</li>'+
                '<li class="all">共<i>{{all}}</i>页</li>'+
                '</ul>'+
              '</div>'
    var page = Vue.extend({
        template: tm,
        data: function () {
            return {
                pagenums: [],
                all: null,
                setPage:null,
                setShowPage: this.showPage || 5,
                cur: this.search.page
            }
        },
        props: ['count', 'search', 'showPage'],
        created: function () {
            // 初始化总页数
            if(this.count / this.search.size > parseInt(this.count / this.search.size)) {
                this.all = parseInt(this.count / this.search.size) + 1
            }else{
                this.all = parseInt(this.count / this.search.size)
            }
            this.setPage = (this.setShowPage - 1) / 2
            if (this.all < this.setShowPage) {
                this.setShowPage = this.all
            }
            // 初始化分页
            for (var i = 0; i < this.setShowPage; i++) {
                this.pagenums.push(i + 1)
            }
        },
        methods: {
            // 上一页
            prev: function () {
                if (this.cur > 1) {
                    this.pageChange(this.cur - 1)
                }
            },
            // 下一页
            next: function () {
                if (this.cur < this.all) {
                    this.pageChange(this.cur + 1)
                }
            },
            // 分页处理
            pageChange: function (cur) {
                    this.cur = cur
                    this.pagenums = []
                    if (this.cur > this.all - this.setPage - 1) {           // 最后数组特殊处理
                        for (var i = 0; i < this.setShowPage; i++) {
                            this.pagenums.push(this.all - (this.setShowPage - 1) + i)
                        }
                    }else if(this.cur < this.setPage + 1){                  // 前面数组特殊处理
                        for (var i = 0; i < this.setShowPage; i++){
                            this.pagenums.push(i + 1)
                        }
                    }else{                                                  // 中间处理
                        for (var i = 0; i < this.setPage; i++){
                            this.pagenums.unshift(this.cur - i - 1)
                        }
                        for (var i = 0; i < this.setPage + 1; i++) {
                            this.pagenums.push(this.cur + i)
                        }
                    }
                this.$emit('callback', this.cur)                            // 返回当前分页数
            }
        }
    })
    window.page = page
})()
