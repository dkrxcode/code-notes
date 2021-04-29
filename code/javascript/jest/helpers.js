export function foo() {
  return 1;
}

export function bar() {
  return 'bar';
}

export function baz() {
  return {
    foo: foo(),
    bar: bar(),
  }
}
