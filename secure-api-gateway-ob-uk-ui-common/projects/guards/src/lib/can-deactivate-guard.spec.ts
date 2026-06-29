import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { of } from 'rxjs';

describe('CanDeactivateGuard', () => {
  let guard: CanDeactivateGuard;

  beforeEach(() => {
    guard = new CanDeactivateGuard();
  });

  it('should return true when component has no canDeactivate method', () => {
    const component: any = {};
    expect(guard.canDeactivate(component)).toBe(true);
  });

  it('should delegate to component.canDeactivate() when it exists', () => {
    const component: any = { canDeactivate: () => false };
    expect(guard.canDeactivate(component)).toBe(false);
  });

  it('should support Observable from component.canDeactivate()', done => {
    const component: any = { canDeactivate: () => of(true) };
    const result = guard.canDeactivate(component) as any;
    result.subscribe(value => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should support Promise from component.canDeactivate()', async () => {
    const component: any = { canDeactivate: () => Promise.resolve(false) };
    const result = await guard.canDeactivate(component);
    expect(result).toBe(false);
  });
});
