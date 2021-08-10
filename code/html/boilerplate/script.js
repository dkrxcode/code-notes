import { sum } from './sum.js';

(function() {
  document.getElementById('root')
    .append(
      document.createTextNode(`Hello World ${sum(1, 2)}`)
    );
})();
