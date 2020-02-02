import { Type } from '@angular/core';
import { Stubbed } from '../typing/stubbed';
import { AugmentedSpy } from '../typing/spied';
import { Observable } from 'rxjs';
import { jasmine } from 'jasmine-core';

export function stubMethods<T>(spiedClass: Type<T>, options: StubOptions<T> = {}) {
  const methodNames = getMethodNames(spiedClass);
  let spyObj = jasmine.createSpyObj(`${spiedClass.name}`, [...methodNames]) as Stubbed<T>;
  spyObj = addObservableStubsOnto(spyObj, options.observables);
  spyObj = addWriteMethodOnto(spyObj);
  return spyObj;
}

export interface StubOptions<T> {
  observables?: Array<keyof T>;
}

function getMethodNames<T>(spiedClass: Type<T>): string[] {
  const names: string[] = [];
  let prototype = spiedClass.prototype;

  while (prototype.constructor !== Object) {
    Object.getOwnPropertyNames(prototype)
      .map(name => [name, Object.getOwnPropertyDescriptor(prototype, name)])
      .filter(([name, descriptor]) => {
        return (descriptor as PropertyDescriptor).value instanceof Function;
      })
      .forEach(([name, descriptor]) => names.push(name as string));
    prototype = prototype.__proto__;
  }

  return names;
}

function addObservableStubsOnto<T>(spyObj: Stubbed<T>, observableMethodNames: Array<keyof T> = []) {
  observableMethodNames.forEach((methodName) => {
    const methodNameString = methodName as string;
    const jasmineSpy: AugmentedSpy = spyObj[methodNameString];

    if (jasmineSpy) {
      jasmineSpy.observers = [];
      jasmineSpy.and.returnValue(new Observable((observer) => {
        jasmineSpy.observer = observer;
        jasmineSpy.observers.push(observer);
      }));
    }
  });

  return spyObj;
}

function addWriteMethodOnto(spyObj: any) {
  return {
    ...spyObj,
    setProperty(propertyName, propertyValue) {
      this[propertyName] = propertyValue;
    }
  };
}
