// What will console.log from the following code;

var bar;
for (var foo = 0; foo < 5; foo++) {
  bar = foo;
}
console.log(foo, bar, baz);
var baz = 10;
