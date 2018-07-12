/* tslint:disable ban-types */
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from 'react-redux';

type FirstParameterType<T> = T extends () => any
  ? void
  : T extends (arg1: infer U, ...args: any[]) => any ? U : any;

type Handler<Input> = Input extends void ? () => any : (input: Input) => any;

export type HandlerMap<ActionCreator> = {
  [Type in keyof ActionCreator]: ActionCreator[Type] extends Function
    ? Handler<FirstParameterType<ActionCreator[Type]>>
    : HandlerMap<ActionCreator[Type]>
};

type HandlerPropNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];
type HandlerProps<T> = Pick<T, HandlerPropNames<T>>;
type NonHandlerPropNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T];
type NonHandlerProps<T> = Pick<T, NonHandlerPropNames<T>>;

export const simpleConnect = <Props, State = {}>(
  mapStateToProps: MapStateToPropsParam<NonHandlerProps<Props>, Props, State>,
  mapDispatchToProps: MapDispatchToPropsParam<HandlerProps<Props>, Props>
) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  );
