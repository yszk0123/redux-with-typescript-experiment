import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from './Store';

// Action

type ActionCreator<Input, Output> = (input: Input) => Output;

interface IncrementInput {
  count: number;
}

interface IncrementAction {
  type: 'increment';
  payload: { count: number };
}

const increment: ActionCreator<IncrementInput, IncrementAction> = input => ({
  type: 'increment',
  payload: {
    count: input.count
  }
});

// Reducer

const reducer = (state: any = { count: 0 }, action: any) => {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + action.payload.count
      };
    default:
      return state;
  }
};

// Store

const store = createStore(reducer);

// Component

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

interface Props {
  count: number;
  onIncrement: any;
}

class App extends React.Component<Props> {
  render() {
    const { count, onIncrement } = this.props;

    return (
      <div style={styles}>
        Count: {count}
        <button onClick={e => onIncrement(1)}>Increment</button>
      </div>
    );
  }
}

// Container

const getStateToProps = (state: any) => ({
  count: state.count
});

const getDispatchToProps = (dispatch: any) => {
  const onIncrement = (count: number) => store.dispatch(increment({ count }));

  return { onIncrement };
};

// store から生成した props を使ってコンポーネントを再描画
const renderContainer = () => {
  const props = {
    ...getStateToProps(store.getState()),
    ...getDispatchToProps(store.dispatch)
  };

  render(
    <App count={props.count} onIncrement={props.onIncrement} />,
    document.getElementById('root')
  );
};

// 初回の描画
renderContainer();

// Store が更新された時に再描画
store.observe(renderContainer);
