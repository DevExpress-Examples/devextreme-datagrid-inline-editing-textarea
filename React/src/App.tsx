import type { DataGridTypes } from 'devextreme-react/data-grid';
import DataGrid, {
  Column, Editing, Lookup, Paging,
} from 'devextreme-react/data-grid';
import type { TextAreaTypes } from 'devextreme-react/text-area';
import TextArea from 'devextreme-react/text-area';
import ArrayStore from 'devextreme/data/array_store';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { useCallback, useMemo } from 'react';
import './App.css';
import { employees, states } from './data.tsx';

type TextAreaElement = HTMLElement & {
  prevClientHeight?: number;
};

const textAreaElementAttr = {
  class: 'custom-textarea-class',
};

function App(): JSX.Element {
  const employeesStore = useMemo(
    () => new ArrayStore({
      key: 'ID',
      data: employees,
    }),
    [],
  );

  const notesEditorRender = useCallback((cell: DataGridTypes.ColumnEditCellTemplateData) => {
    const handleValueChanged = useCallback((e: TextAreaTypes.ValueChangedEvent) => {
      cell.setValue(e.value);
    }, [cell]);

    const handleNotesInput = useCallback((args: TextAreaTypes.InputEvent) => {
      const el = args.element as TextAreaElement;

      if (el.prevClientHeight !== el.clientHeight) {
        cell.component.updateDimensions();
      }

      el.prevClientHeight = el.clientHeight;
    }, []);

    return (
      <TextArea
        defaultValue={cell.value}
        onValueChanged={handleValueChanged}
        elementAttr={textAreaElementAttr}
        autoResizeEnabled={true}
        onInput={handleNotesInput}
      />
    );
  }, []);

  const notesCellRender = useCallback((cellInfo: DataGridTypes.ColumnCellTemplateData) => (
      <div className='notes-cell-content'>{cellInfo.value}</div>
  ), []);

  return (
    <DataGrid dataSource={employeesStore} showBorders={true}>
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
