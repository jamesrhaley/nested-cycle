import {Observable} from 'rx';
import {button, div, p} from '@cycle/dom';

/** 
* identified stating point helper for allIntentView function for the view
* data - any primitive type
* view - a anonymous function that ruturns the observable props$.map
*   below
* horrible name!!
*/
function oViewParcial(data, view){
  return Observable.of(data)
    .flatMap(data => view(data))
}

function allIntentView(DOM, prop$, reset$) {
  const intent$ = prop$.flatMap((prop)=> {
    return Observable.merge(
      DOM.select(`.${prop} .dec`).events('click').map(ev => -1),
      DOM.select(`.${prop} .inc`).events('click').map(ev => +1),
      reset$.map(()=>0)
    )}
  );
  
  const templateVTree$ = (count) => Observable.of(count)
    .flatMap(count =>
      prop$.map( prop =>
        div(`.${prop}`, [
          button(".dec", '--'),
          button(".inc", '++'),
          p('Counter: ' + count)
        ])
      ))
             
  return {
    intent$,
    templateVTree$
  }
}

export default allIntentView



