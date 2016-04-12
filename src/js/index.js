import {run} from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import WeightRange from './WeightRange';

const main = WeightRange;

run(main, {
  DOM: makeDOMDriver('#main-container')
});
