import { TestBed } from '@angular/core/testing';

import { TableSortingService } from './table-sorting.service';

describe('TableSortingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableSortingService = TestBed.get(TableSortingService);
    expect(service).toBeTruthy();
  });
});
