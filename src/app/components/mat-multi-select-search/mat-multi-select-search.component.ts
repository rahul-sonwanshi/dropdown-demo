import { Component, OnInit, EventEmitter, QueryList, ViewChild, Input, ElementRef, Inject, ChangeDetectorRef, OnDestroy, AfterViewInit, forwardRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import {FormControl, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { MatSelectModule, MatCheckbox, MatIcon, MatOption, MatSelect, MatInput, MatButton, MatSelectChange } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mat-multi-select-search',
  templateUrl: './mat-multi-select-search.component.html',
  styleUrls: ['./mat-multi-select-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatMultiSelectSearchComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatMultiSelectSearchComponent implements OnInit, OnDestroy {
  
  @Input('multiselect') multiselect: boolean;
  @Input('inputItems') colors;
  @Input('searchable') searchable: boolean;
  triggerSearch;
  selectedValues;
  public searchInput: FormControl = new FormControl();
  public selectAllChkBox: FormControl = new FormControl();
  public selectMultiSearch: FormControl = new FormControl();
  public filteredSearch= [];
  previouslySelectedItems = [];
  subscription: Subscription;

  ngOnInit() {
    this.filteredSearch = this.colors;
    this.subscription = this.searchInput.valueChanges
      .subscribe(() => {
        this.filter();
      });
  }

  // destroy to prevent memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // check if dropdown is closed when this event is triggered clear input
  openedChange(isOpened){
    if(!isOpened)
      this.searchInput.setValue("");
  }

  // clear multi select boxes
  clearSelection() {
    this.selectMultiSearch.setValue(['']);
    this.selectAllChkBox.setValue(false);
  }

  // select all implementation
  toggleAllSelection() {
    let copyArray = this.colors;
    if(!this.selectAllChkBox.value) {
      this.selectMultiSearch.setValue(this.colors);
      this.selectAllChkBox.setValue(false);
    } 
    else {
      this.clearSelection();
      this.selectAllChkBox.setValue(true);
    }
    console.log(this.selectMultiSearch);
  }

  // Simple filter to check if search string matches
  private filter() {
    console.log(this.searchInput);
    if (!this.colors) {
      return;
    }
    // get the search keyword
    let search = this.searchInput.value;

    console.log(this.previouslySelectedItems);
    this.filteredSearch = 
      this.colors.filter(color => color.toLowerCase().indexOf(search.toLowerCase()) > -1)
  }

  /*
   * Filtering the mat-option causes already selected mat options to be removed
   * in order to avoid that we store previous value and check if they are present
   * in the current search if not we restore the values.
   */
  selectionChange(event: MatSelectChange) {
    if(event.source.multiple) {
      let restoreSelectedValues = false;
      if(this.searchInput.value && this.searchInput.value.length
          && this.previouslySelectedItems && Array.isArray(this.previouslySelectedItems)) {
            if(!this.selectMultiSearch.value || !Array.isArray(this.selectMultiSearch.value)) {
              this.selectMultiSearch.setValue([]);
            }

            const optionValues = event.source.options.map(option => option.value);
            this.previouslySelectedItems.forEach(previousValue => {
              
              //check if previous value should be restored
              if(this.selectMultiSearch.value.indexOf(previousValue) === -1 && optionValues.indexOf(previousValue) === -1){
                this.selectMultiSearch.value.push(previousValue);
                restoreSelectedValues = true;
              }
            });
          }

          if(restoreSelectedValues) {
            event.source._onChange(this.selectMultiSearch.value);
          }

          this.previouslySelectedItems = this.selectMultiSearch.value;
    }
  }

}
