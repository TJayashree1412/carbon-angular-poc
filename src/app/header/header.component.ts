import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PaginationModel } from 'carbon-components-angular/pagination/pagination-model.class';
import { PaginationTranslations, Pagination } from 'carbon-components-angular/pagination/pagination.component';
import { I18n } from 'carbon-components-angular/i18n/i18n.module';
import { ExperimentalService } from 'carbon-components-angular/experimental.module';
import { merge } from 'carbon-components-angular/utils/object';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  static paginationCounter = 0;

	/**
	 * Set to `true` for a loading pagination component.
	 */
	@Input() skeleton = false;
	/**
	 * `PaginationModel` with the information about pages you're controlling.
	 */
	@Input() model: PaginationModel;
	/**
 	 * Set to `true` to disable the backward/forward buttons.
	 */
	@Input() disabled = false;
	/**
	 * Set to `true` to disable the select box that changes the page.
	 */
	@Input() pageInputDisabled = false;
	/**
	 * Set to `true` if the total number of items is unknown.
	 */
	@Input() pagesUnknown = false;
	@Input() pageSelectThreshold = 1000;

  @Input()
	set translations (value: PaginationTranslations) {
		const valueWithDefaults = merge(this.i18n.getMultiple('PAGINATION'), value);
		this.itemsPerPageText.override(valueWithDefaults.ITEMS_PER_PAGE);
		this.optionsListText.override(valueWithDefaults.OPEN_LIST_OF_OPTIONS);
		this.backwardText.override(valueWithDefaults.BACKWARD);
		this.forwardText.override(valueWithDefaults.FORWARD);
		this.totalItemsText.override(valueWithDefaults.TOTAL_ITEMS);
		this.totalItemsUnknownText.override(valueWithDefaults.TOTAL_ITEMS_UNKNOWN);
		this.totalPagesText.override(valueWithDefaults.TOTAL_PAGES);
		this.pageText.override(valueWithDefaults.PAGE);
		this.ofLastPagesText.override(valueWithDefaults.OF_LAST_PAGES);
  }
  @Input() itemsPerPageOptions: number[] = [10, 20, 30, 40, 50];

	/**
	 * Emits the new page number.
	 *
	 * You should tie into this and update `model.currentPage` once the fresh
	 * data is finally loaded.
	 */
	@Output() selectPage = new EventEmitter<number>();

	get itemsPerPage() {
		return this.model.pageLength;
	}
	set itemsPerPage(value) {
		this.model.pageLength = Number(value);
		this.currentPage = 1; // reset page
	}

	get currentPage() {
		return this.model.currentPage;
	}
	set currentPage(value) {
		value = Number(value);
		// emits the value to allow the user to update current page
		// in the model once the page is loaded
		this.selectPage.emit(value);
	}

	get totalDataLength() {
		return this.model.totalDataLength;
	}
	/**
	 * The last page number to display in the pagination view.
	 */
	get lastPage(): number {
		const last = Math.ceil(this.totalDataLength / this.itemsPerPage);
		return last > 0 ? last : 1;
	}

	get startItemIndex() {
		return this.endItemIndex > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
	}

	get endItemIndex() {
		const projectedEndItemIndex = this.currentPage * this.itemsPerPage;

		return projectedEndItemIndex < this.totalDataLength ? projectedEndItemIndex : this.totalDataLength;
	}

	/**
	 * The previous page number to navigate to, from the current page.
	 */
	get previousPage(): number {
		return this.currentPage <= 1 ? 1 : this.currentPage - 1;
	}

	/**
	 * The next page number to navigate to, from the current page.
	 */
	get nextPage(): number {
		const lastPage = this.lastPage;
		return this.currentPage >= lastPage ? lastPage : this.currentPage + 1;
	}

	get isExperimental() {
		return this.experimental.isExperimental;
	}

	get pageOptions() {
		if (this.totalDataLength && this._pageOptions.length !== this.totalDataLength) {
			this._pageOptions = Array(Math.ceil(this.totalDataLength / this.itemsPerPage));
		}
		return this._pageOptions;
	}

	itemsPerPageSelectId = `pagination-select-items-per-page-${Pagination.paginationCounter}`;
	currentPageSelectId = `pagination-select-current-page-${Pagination.paginationCounter}`;

	itemsPerPageText = this.i18n.getOverridable('PAGINATION.ITEMS_PER_PAGE');
	optionsListText = this.i18n.getOverridable('PAGINATION.OPEN_LIST_OF_OPTIONS');
	backwardText = this.i18n.getOverridable('PAGINATION.BACKWARD');
	forwardText = this.i18n.getOverridable('PAGINATION.FORWARD');
	totalItemsText = this.i18n.getOverridable('PAGINATION.TOTAL_ITEMS');
	totalItemsUnknownText = this.i18n.getOverridable('PAGINATION.TOTAL_ITEMS_UNKNOWN');
	totalPagesText = this.i18n.getOverridable('PAGINATION.TOTAL_PAGES');
	pageText = this.i18n.getOverridable('PAGINATION.PAGE');
	ofLastPagesText = this.i18n.getOverridable('PAGINATION.OF_LAST_PAGES');

	protected _pageOptions = [];

	constructor(protected i18n: I18n, protected experimental: ExperimentalService) {
		Pagination.paginationCounter++;
	}

  ngOnInit(): void {
  }

}