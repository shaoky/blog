## forEach

```javascript
let list = [{
    a: 1,
    b: 2
}]
list.forEach(item => {
    console.log(item) // {a: 1, b: 2}
})
```

## for...of

注意，for...of是ES6新引入的特性。修复了ES5引入的for...in的不足
for...of使用的方法，和上面一样，但是for...of，相比有一个好处是，可以中途退出return
```javascript
let list = [{
    a: 1,
    b: 2
}]
for (let item of this.shopAttrList) {
    if (item.a === 1) {
        return
    }
}
```