import {Observable} from 'rx';
import {button, div, p} from '@cycle/dom';
import isolate from '@cycle/isolate';
import allIntentView from './counter';


const setValue = (x,y) => y===0 ? y : x+y

function model(intent1$, intent2$) {
  return Observable.combineLatest(
    intent1$.startWith(0).scan((x,y) => setValue(x,y)),
    intent2$.startWith(0).scan((x,y) => setValue(x,y)),
    (count1, count2) => {
      let count3 = count1 + count2;
      return {count1, count2, count3}
    }
  );
}

function view(counter1, counter2, state$) {
  return state$.map( state =>
    div([
      counter1(state.count1),
      counter2(state.count2),
      p('Total ' + state.count3)
    ])
  );
}

function main(DOM, reset$) {
  let props1$ = Observable.of('group-one');
  let props2$ = Observable.of('group-two');
  
  let counter1 = allIntentView(DOM, props1$, reset$);
  let counter2 = allIntentView(DOM, props2$, reset$);
  
  let state$ = model(counter1.intent$ ,counter2.intent$);

  let vtree$ = view(
    counter1.templateVTree$,
    counter2.templateVTree$,
    state$
  )
  return {
    DOM: vtree$
  };
}

export default main
