import {Observable} from 'rx';
import {div, label, input} from '@cycle/dom';

function LabeledInputSlider(driver, props) {
  var name = props.classname
    , text = props.text
    , units = props.units
    , min = props.min
    , max = props.max;

  const name1 = name+1;
  const name2 = name+2;
  return {
    intent$: Observable.merge( 
        driver.select(name1).events('input'),
        driver.select(name2).events('input')
      )
      .map(ev => ({
        name : ev.target.className,
        value :ev.target.value,
        time: ev.timeStamp
      })),

    view :(state) => {
      return div([
            label(text),
            input(name1, {
              type: 'range',
              min: min,
              max: max,
              value: state
            }),
            input(name2, {value: state}),
            label(units),
          ]);
    }
  }
}

export default LabeledInputSlider;
