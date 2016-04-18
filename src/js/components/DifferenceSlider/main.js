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
      let range = h - l;
      if (range <= 0 ){
        if (current === high.name) {
          l = h;
          range = 0;
        } else if (current === low.name) {
          h = l;
          range = 0;
        }
      }
      return {range:range, low:l, high:h};
    }
  );
}

function view(state$, lowView, highView) {
  return state$.map(state => {
    return div([
      lowView(state.low),
      highView(state.high),
      h2('Range is ' + state.range)
    ])}
  )
}

function DifferenceSlider(DOM, reset$) {
  // settings
  const lowProps = {
    classname: '.low',
    text: 'Low: ',
    units: 'kg',
    min: 0,
    max: 150
  }
  const highProps = {
    classname: '.high',
    text: 'High: ',
    units: 'kg',
    min: 0,
    max: 150
  }

  // loading intents and views
  const lowRange = LabeledInputSlider(DOM, lowProps, reset$);
  const highRange = LabeledInputSlider(DOM, highProps, reset$);

  const state$ = model(lowRange.intent$, highRange.intent$);
  const vtree$ = view(state$, lowRange.view, highRange.view);
  
  return {
    DOM: vtree$
  };
}

export default (sources) => isolate(DifferenceSlider)(sources)


