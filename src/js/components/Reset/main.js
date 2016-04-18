import {Observable} from 'rx';
import {button, div} from '@cycle/dom';
import isolate from '@cycle/isolate';


function Reset(sources) {
  const action$ = sources.DOM.select('.reset')
      .events('click').map(ev => true).startWith(true);

  const vtree$ = action$.map(evt =>
    div([

      button('.reset', 'Reset')
    ])
  )

  return {
    DOM: vtree$,
    action$
  }
}
export default (sources) => isolate(Reset)(sources)