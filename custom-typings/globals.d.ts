interface IAction {
  readonly type: string;
  readonly payload?: any;
  readonly meta?: any;
}
