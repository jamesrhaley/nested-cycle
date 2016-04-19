import {Observable} from 'rx';
import {h2, div} from '@cycle/dom';
import isolate from '@cycle/isolate'
import LabeledInputSlider from './LabeledInputSlider';

function model(weightIntent$, heightIntent$){
  function starter(num){
    return { classname : '', time: 0, value: num};
  };
  return Observable.combineLatest(
    weightIntent$.startWith(starter(0)),
    heightIntent$.startWith(starter(150)),
    (low, high) => {
      let h = high.value;
      let l = low.value;
      const current = high.time > low.time ? high.name: low.name;
      console.log(low)
      let difference = h - l;
      if (difference <= 0 ){
        if (current === high.name) {
          l = h;
          difference = 0;
        } else if (current === low.name) {
          h = l;
          difference = 0;
        }
      }
      return {difference, low:l, high:h};
    }
  );
}

function view(state$, lowView, highView) {
  return state$.map(state => {
    return div([
      lowView(state.low),
      highView(state.high),
      h2('Difference is ' + state.difference)
    ])}
  )
}

function DifferenceSlider(DOM, reset$) {
  const lowProps = Observable.of({
    classname: 'low',
    text: 'Low: ',
    units: 'kg',
    min: 0,
    max: 150,
    start:0
  })
  const highProps = Observable.of({
    classname: 'high',
    text: 'High: ',
    units: 'kg',
    min: 0,
    max: 150,
    start:150
  })

  // loading intents and views
  const lowRange = LabeledInputSlider(DOM, lowProps, reset$);
  const highRange = LabeledInputSlider(DOM, highProps, reset$);

  const state$ = model(lowRange.intent$, highRange.intent$);
  const vtree$ = view(
    state$, lowRange.viewChild$, highRange.viewChild$
  );
  
  return {
    DOM: vtree$
  };
}

export default DifferenceSlider


