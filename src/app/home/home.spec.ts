import { TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Home);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have 7 build steps', () => {
    const fixture = TestBed.createComponent(Home);
    const component = fixture.componentInstance;
    expect(component.steps.length).toBe(7);
  });

  it('should number steps sequentially starting at 1', () => {
    const fixture = TestBed.createComponent(Home);
    const component = fixture.componentInstance;
    component.steps.forEach((step, index) => {
      expect(step.number).toBe(index + 1);
    });
  });

  it('should render the page heading', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Angular PWA');
  });

  it('should render all step titles in the list', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const headings = compiled.querySelectorAll('.step__title');
    expect(headings.length).toBe(7);
  });

  it('should render a command code block for steps that have a command', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    const stepsWithCommands = component.steps.filter((s) => !!s.command);
    const codeBlocks = compiled.querySelectorAll('.step__command');
    expect(codeBlocks.length).toBe(stepsWithCommands.length);
  });
});
