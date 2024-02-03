import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-table',
  templateUrl: './pagination-table.component.html',
  styleUrls: ['./pagination-table.component.scss']
})
export class PaginationTableComponent {
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  get pagesToShow(): (number | string)[] {
    const totalPagesToShow = 5; // Number of pages to show excluding '...'
    const pages: (number | string)[] = [];
    let startPage = Math.max(this.currentPage - Math.floor(totalPagesToShow / 2), 1);
    let endPage = startPage + totalPagesToShow - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - totalPagesToShow + 1, 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (startPage > 1) {
      pages.unshift('...');
      pages.unshift(1);
    }

    if (endPage < this.totalPages) {
      pages.push('...');
      pages.push(this.totalPages);
    }

    return pages;
  }

  setCurrentPage(page: number | string) {
    if (typeof page === 'number') {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        this.pageChange.emit(page);
      }
    }
  }
}
