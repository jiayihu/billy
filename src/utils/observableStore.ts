import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';

export default function observableStore<T>(store: Store<T>): Observable<T> {
  return Observable.create(observer => {
    observer.next(store.getState());

    const unsubscriber = store.subscribe(() => {
      observer.next(this.store.getState());
    });
    return unsubscriber;
  });
}
