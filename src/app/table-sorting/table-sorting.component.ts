import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../country';
import { CountryService } from '../table-sorting.service';
import { SortEvent, SortableDirective } from '../sortable.directive';
import { ExportService } from '../exportservice.service';

@Component({
  selector: 'app-table-sorting',
  templateUrl: './table-sorting.component.html',
  styleUrls: ['./table-sorting.component.css']
})
export class TableSortingComponent {
  countries: any = [];
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(public service: CountryService, private exportService: ExportService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.pagechange();
  }

  pagechange() {
    this.countries$.source.forEach((element) => {
      this.countries = [];
      element.forEach(element => {
        this.countries.push({ id: `${element.id}`, name: `${element.name}`, flag: `${element.flag}`, area: `${element.area}`, population: `${element.population}` });
      });
    });
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  export() {
    this.exportService.generateCSVService(this.countries, 'countries');
  }

}
