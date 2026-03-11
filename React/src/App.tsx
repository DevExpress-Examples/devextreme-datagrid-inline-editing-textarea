import type { DataGridTypes } from 'devextreme-react/data-grid';
import DataGrid, {
  Column, Editing, Lookup, Paging,
} from 'devextreme-react/data-grid';

import { ArrayStore } from 'devextreme-react/common/data';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { useCallback, useMemo } from 'react';
import './App.css';
import { employees, states } from './data';
import NotesTextAreaComponent from './NotesTextAreaComponent.tsx';

function App(): JSX.Element {
  const employeesStore = useMemo(
    () => new ArrayStore({
      key: 'ID',
      data: employees,
    }),
    [],
  );

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
      <Column dataField='Notes' width={300} editCellComponent={NotesTextAreaComponent} cellRender={notesCellRender} />
    </DataGrid>
  );
}

export default App;
