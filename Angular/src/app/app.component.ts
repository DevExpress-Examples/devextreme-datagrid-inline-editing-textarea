import { Component, ViewChild } from '@angular/core';
import { ArrayStore } from 'devextreme-angular/common/data';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { DxTextAreaTypes } from "devextreme-angular/ui/text-area";
import { Service, State } from './app.service';

type TextAreaElement = HTMLElement & {
  prevClientHeight?: number;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service],
})

export class AppComponent {
  @ViewChild('dataGrid', { static: false }) dataGrid!: DxDataGridComponent;
  dataSource: ArrayStore;

  states: State[];

  constructor(service: Service) {
    this.dataSource = new ArrayStore({
      key: 'ID',
      data: service.getEmployees(),
    });
    this.states = service.getStates();
  }

  onTextAreaInitialized(e: DxTextAreaTypes.InitializedEvent) {
    e.component?.registerKeyHandler('enter', (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.shiftKey) {
        event.stopPropagation();
      }
    });
  }

  onTextAreaInput(e: DxTextAreaTypes.InputEvent) {
    const el = e.element as TextAreaElement;
    if (!el) return;

    if (el.prevClientHeight !== el.clientHeight) {
      this.dataGrid?.instance?.updateDimensions();
    }

    el.prevClientHeight = el.clientHeight;
  }
}
