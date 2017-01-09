import { NgZone } from '@angular/core';
import { NgRedux as Store } from 'ng2-redux';
const defaultReducer = (state, action) => state;

class MockNgZone {
  run(fn) {
    return fn();
  }
}

export function configureStore(state, reducer = defaultReducer) {
  const store = new Store(new MockNgZone() as NgZone);
  store.configureStore(reducer, state);
  return store;
}
