import { cold, getTestScheduler } from 'jasmine-marbles';

import * as op from 'rxjs/operators';
import * as rx from 'rxjs';

describe('Test observables in jasmine using marble digrams', () => {

  it('use cold function to describe obserables', () => {
    // after 1 frame, emits 1 then completes
    const p$ = cold('-x-|', {x: 1});
    // after 2 frames, emits 2, 3 then completes
    const q$ = cold('--x-y-|', {x: 2, y: 3});

    // NOTE: use toArray when upgrading rxjs
    const results = [];
    rx.merge(p$, q$).subscribe(x => results.push(x));

    // flush the observables
    getTestScheduler().flush();

    expect(results).toEqual([1,2,3]);
  });

});
