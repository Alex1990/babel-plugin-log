# babel-plugin-log

A babel plugin to help to print useful debug log.

### Install

```sh
npm install babel-plugin-log
```

### Usage

Configure babel:

**`.babelrc`**

```json
{
  "plugins": [
    "babel-plugin-log"
  ]
}
```

### Example

**source code**

```js
console.log(a)
console.log(a, b, c)
console.log(a + b)
```

**generated code**

```js
console.log(1)
console.log("a", a);
console.log("a", a, "b", b, "c", c);
console.log("a + b", a + b);
```
### License

MIT
