import Rx from 'rx'
import Cycle from '@cycle/core'
import {a, p, div, makeDOMDriver} from '@cycle/dom'
import isolate from '@cycle/isolate'

import DifferenceSlider from './components/DifferenceSlider/main';
import Counter from './components/Counter/main.js'
import Reset from './components/Reset/main.js'

function main(sources) {
  const reset$ = Reset(sources);

  const counter$ = Counter(sources.DOM, reset$.action$);
  const diff$ = DifferenceSlider(sources.DOM, reset$.action$);

  const divStyle = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px'
  }

  const vtree$ = Rx.Observable.combineLatest(
    diff$.DOM,
    counter$.DOM,
    reset$.DOM,
    (vd1, ...rest) => {
      return div([[vd1, ...rest].map(function (s) {
        return div({style: divStyle}, s)
      })])
    }
  )

  return {
    DOM: vtree$
  }
}

const drivers = {
  DOM: makeDOMDriver('#main-container')
}

Cycle.run(main, drivers)