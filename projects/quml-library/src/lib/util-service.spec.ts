import { TestBed } from '@angular/core/testing';

import { UtilService } from './util-service';
import { options, responseDeclaration, selectedOptions, questions } from './service-data';

describe('UtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilService = TestBed.inject(UtilService);
    expect(service).toBeTruthy();
  });

  it('should return unique id', () => {
    const service: UtilService = TestBed.inject(UtilService);
    const id = service.uniqueId(32);
    expect(id).toBeDefined();
  });

  it('should return time spent text', () => {
    const service: UtilService = TestBed.inject(UtilService);
    const time = service.getTimeSpentText(10);
    expect(time).toBeDefined();
  });

  it('should return dynamic key', () => {
    const service: UtilService = TestBed.inject(UtilService);
    const keys = ['responseDec', 'response1'];
    spyOn(service, 'getKeyValue').and.returnValue('response1');
    const key = service.getKeyValue(keys);
    expect(key).toEqual('response1');
  });

  it('should return question type', () => {
    const service: UtilService = TestBed.inject(UtilService);
    let qType = service.getQuestionType(questions, 0);
    expect(qType).toBe('MCQ');
  })

  it('should check if the array contains the progress classes', () => {
    const service: UtilService = TestBed.inject(UtilService);
    let qType = service.canGo('correct');
    expect(qType).toBe(true);
  });

  it('should scroll the page from parent element to child', () => {
    const service: UtilService = TestBed.inject(UtilService);
    const parent = document.createElement('div');
    service.scrollParentToChild(parent, document.createElement('div'));
    expect(parent.scrollTop).toBeDefined();
  });

  it('should scroll the page from parent element to child for mobile portrait', () => {
    const service: UtilService = TestBed.inject(UtilService);
    const parent = document.createElement('div');
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as any);
    service.scrollParentToChild(parent, document.createElement('div'));
    expect(parent.scrollLeft).toBeDefined();
  });

  it('should sum objects by key', () => {
    const service: UtilService = TestBed.inject(UtilService);
    const sum = service.sumObjectsByKey({ a: 1, b: 2 }, { a: 3, b: 4 });
    expect(sum).toEqual({ a: 4, b: 6 });
  });
  
  it('should call getMultiselectScore when shuffle is false', () => {
    const service: UtilService = TestBed.inject(UtilService);
    spyOn(service, 'getMultiselectScore').and.callThrough();
    const score = service.getMultiselectScore(options, responseDeclaration, false);
    expect(score).toEqual(2);
  })

  it('should call getMultiselectScore when shuffle is false return score 0', () => {
    const service: UtilService = TestBed.inject(UtilService);
    spyOn(service, 'getMultiselectScore').and.callThrough();
    const score = service.getMultiselectScore([options[0]], responseDeclaration, false);
    expect(score).toEqual(0);
  })

  it('should call getMultiselectScore when shuffle is false return score 1', () => {
    const service: UtilService = TestBed.inject(UtilService);
    spyOn(service, 'getMultiselectScore').and.callThrough();
    const score = service.getMultiselectScore([options[1]], responseDeclaration, false);
    expect(score).toEqual(1);
  })

  it('should call getMultiselectScore when shuffle is true', () => {
    const service: UtilService = TestBed.inject(UtilService);
    spyOn(service, 'getMultiselectScore').and.callThrough();
    const score = service.getMultiselectScore(([options[1]]), responseDeclaration, true);
    expect(score).toEqual(0.5);
  })

  it('should call getMultiselectScore when shuffle is true return score 0', () => {
    const service: UtilService = TestBed.inject(UtilService);
    spyOn(service, 'getMultiselectScore').and.callThrough();
    const score = service.getMultiselectScore(([options[0]]), responseDeclaration, true);
    expect(score).toEqual(0);
  })

  it('should call getMultiselectScore when shuffle is true return score 1', () => {
    const service: UtilService = TestBed.inject(UtilService);
    spyOn(service, 'getMultiselectScore').and.callThrough();
    const score = service.getMultiselectScore((options), responseDeclaration, true);
    expect(score).toEqual(1);
  })

  it('should check weather array has duplictes', () => {
    const service: UtilService = TestBed.inject(UtilService);
    spyOn(service, 'hasDuplicates').and.callThrough();
    let duplicates = service.hasDuplicates(selectedOptions, options[0]);
    expect(duplicates).toBeTruthy();
  });
});
