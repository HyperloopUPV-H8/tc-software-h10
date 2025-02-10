var cross = require('../');
var test = require('tape');

test('cross', function (t) {
    var out = [];
    var a = [3,-3,1];
    var b = [4,9,2];
    var res = cross(out,a, b);
    t.deepEqual(res, [-15,-2,39]);
    t.equal(out, res, 'return value');
    t.deepEqual(a, [3,-3,1], 'a not modified');
    t.deepEqual(b, [4,9,2], 'b not modified');
    t.end();
});
