import {Observable} from 'rx';
import {div, label, input} from '@cycle/dom';

function LabeledInputSlider(DOM, props$, reset$) {
  const intent$ = props$.flatMap((props)=> {

    const sliderClass = `.${props.classname}-slider`;
    const inputClass = `.${props.classname}-input`;
    const resetClass = `.${props.classname}-reset`

    const sliderInputMap = ev => ({
      name : ev.target.className,
      value :ev.target.value,
      time: ev.timeStamp
    });

    const resetMap = (ev)=> ({
      name : resetClass,
      value :props.start,
      time: ev.timeStamp
    });

    return Observable.merge( 
      DOM.select(sliderClass).events('input').map(sliderInputMap),
      DOM.select(inputClass).events('input').map(sliderInputMap),
      reset$.map(resetMap)
    );
  });

  const viewChild$ = (state) => {
    return Observable.of(state)
      .flatMap(state =>
        props$.map( props => {
          return div(`.${props.classname}`,[
            label(props$.text),
            input(`.${props.classname}-slider`, {
              type: 'range',
              min: props$.min,
              max: props$.max,
              value: state
            }),
            input(`.${props.classname}-input`, {value: state}),
            label(props$.units),
          ])
        })
      )
    }

  return {
    intent$,
    viewChild$
  }
}

export default LabeledInputSlider;
