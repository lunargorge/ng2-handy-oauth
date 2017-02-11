import { HomeComponent } from './home.component';

import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

describe('HomeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HomeComponent
            ]
        });
    });

    it('should ...', inject([HomeComponent], (conmponent) => {
        expect(true).toBeTruthy();
    }));
});
