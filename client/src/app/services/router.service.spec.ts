import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('Routing', () => {
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
  });

  it('should navigate to splash when root url is entered', () => {
    router.navigate(['']).then(() => {
      expect(router.url).toEqual("/");  
    })
  })
  it('should navigate to signup when /signup is entered', () => {
    router.navigate(['signup']).then(() => {
      expect(router.url).toEqual("/signup");  
    })
  })
  it('should navigate to login when /login is entered', () => {
    router.navigate(['login']).then(() => {
      expect(router.url).toEqual("/login");  
    })
  })
  it('should navigate to map when /map is entered', () => {
    router.navigate(['map']).then(() => {
      expect(router.url).toEqual("/map");  
    })
  })
  it('should navigate to list when /list is entered', () => {
    router.navigate(['list']).then(() => {
      expect(router.url).toEqual("/list");  
    })
  })
  it('should navigate to settings when /settings is entered', () => {
    router.navigate(['settings']).then(() => {
      expect(router.url).toEqual("/settings");  
    })
  })
});