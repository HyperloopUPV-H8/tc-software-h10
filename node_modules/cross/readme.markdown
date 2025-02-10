# cross

cross product

This implementation was ripped directly out of
[gl-matrix](https://npmjs.org/package/gl-matrix).

# example

``` js
var cross = require('cross');
var a = process.argv[2].split(',');
var b = process.argv[3].split(',');
console.log(cross([], a, b));
```

output:

```
$ node cross.js 3,-3,1 4,9,2
[ -15, -2, 39 ]
```

# methods

``` js
var cross = require('cross')
```

## cross(out, a, b)

Save the cross-product of vectors `a` and `b` into `out`, returning `out`.

# install

With [npm](https://npmjs.org) do:

```
npm install cross
```

# license

BSD
