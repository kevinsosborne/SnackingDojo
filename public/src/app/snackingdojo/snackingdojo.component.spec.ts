import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackingdojoComponent } from './snackingdojo.component';
import { TruncatePipe } from '../truncate.pipe';
describe('SnackingdojoComponent', () => {
  let component: SnackingdojoComponent;
  let fixture: ComponentFixture<SnackingdojoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackingdojoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackingdojoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
