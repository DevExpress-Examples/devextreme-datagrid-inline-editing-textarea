import { useMemo, useRef } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DataGrid, { Editing, Paging, Column, Lookup } from 'devextreme-react/data-grid';
import type { DataGridRef, DataGridTypes } from 'devextreme-react/data-grid';
import TextArea from 'devextreme-react/text-area';
import type { TextAreaTypes } from 'devextreme-react/text-area';
import ArrayStore from 'devextreme/data/array_store';
import { employees, states } from './data';

type TextAreaElement = HTMLElement & {
  prevClientHeight?: number;
};

function App(): JSX.Element {
  const grid = useRef<DataGridRef>(null);

  const employeesStore = useMemo(
    () =>
      new ArrayStore({
        key: 'ID',
        data: employees,
      }),
    [],
  );

  const notesEditorRender = (cell: DataGridTypes.ColumnEditCellTemplateData) => {
    const onValueChanged = (e: TextAreaTypes.ValueChangedEvent) => cell.setValue(e.value);

    const onNotesInput = (args: TextAreaTypes.InputEvent) => {
      const el = args.element as TextAreaElement;
      if (el.prevClientHeight !== el.clientHeight) {
        grid.current?.instance().updateDimensions();
      }
      el.prevClientHeight = el.clientHeight;
    };

    return (
      <TextArea
        defaultValue={cell.value}
        onValueChanged={onValueChanged}
        elementAttr={{
          class: 'custom-textarea-class',
        }}
        autoResizeEnabled={true}
        onInput={onNotesInput}
      />
    );
  };

  const notesCellRender = (cellInfo: DataGridTypes.ColumnCellTemplateData) => (
    <div className='notes-cell-content'>{cellInfo.value}</div>
  );

  return (
    <DataGrid ref={grid} dataSource={employeesStore} showBorders={true}>
      <Paging enabled={false} />
      <Editing mode='cell' allowUpdating={true} />

      <Column dataField='Prefix' caption='Title' width={80} />
      <Column dataField='FirstName' />
      <Column dataField='LastName' />
      <Column dataField='Position' width={170} />
      <Column dataField='StateID' caption='State' width={125}>
        <Lookup dataSource={states} displayExpr='Name' valueExpr='ID' />
      </Column>
      <Column dataField='Notes' width={300} editCellRender={notesEditorRender} cellRender={notesCellRender} />
    </DataGrid>
  );
}

export default App;
