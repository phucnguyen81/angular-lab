import { OnDestroy } from '@angular/core';
import { Observable, Subscription, PartialObserver } from 'rxjs';

export abstract class ComponentBase implements OnDestroy {

  private readonly subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected subscribe<T>(
    source: Observable<T>, target?: PartialObserver<T>
  ): void {
    const observer = target || { next(): T { return undefined; } };
    this.subscription.add(source.subscribe(observer));
  }

  protected addSubscription(subscription: Subscription): void {
    this.subscription.add(subscription);
  }

}
