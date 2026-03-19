<template>
  <div class="demo-container">
    <DxDataGrid
      ref="dataGrid"
      :data-source="employeesStore"
      :show-borders="true"
    >
      <DxPaging :enabled="false"/>
      <DxEditing
        mode="cell"
        :allow-updating="true"
      />

      <DxColumn
        data-field="Prefix"
        caption="Title"
        :width="80"
      />
      <DxColumn data-field="FirstName"/>
      <DxColumn data-field="LastName"/>

      <DxColumn
        data-field="Position"
        :width="170"
      />

      <DxColumn
        data-field="StateID"
        caption="State"
        :width="125"
      >
        <DxLookup
          :data-source="states"
          display-expr="Name"
          value-expr="ID"
        />
      </DxColumn>

      <DxColumn
        data-field="Notes"
        :width="300"
        edit-cell-template="textAreaEditorTemplate"
        :cell-template="notesCellTemplate"
      />

      <template #textAreaEditorTemplate="{ data: cellInfo }">
        <NotesTextAreaComponent
          :cell-info="cellInfo"
          :data-grid-component="cellInfo.component"
        />
      </template>
    </DxDataGrid>
  </div>
</template>

<script setup lang="ts">
import DxDataGrid, {
  DxColumn,
  DxEditing,
  DxLookup,
  DxPaging,
  type DxDataGridTypes,
} from 'devextreme-vue/data-grid';
import { ArrayStore } from 'devextreme-vue/common/data';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { employees, states } from '../services/data';
import NotesTextAreaComponent from './NotesTextAreaComponent.vue';

const employeesStore = new ArrayStore({
  key: 'ID',
  data: employees,
});

const notesCellTemplate = (
  container: HTMLElement,
  options: DxDataGridTypes.ColumnCellTemplateData,
) => {
  const cellValue = options.value as string;
  container.className = 'notes-cell-content';
  container.textContent = cellValue;
};
</script>

<style>
.demo-container {
  margin: 50px;
  width: 90vw;
}
.custom-textarea-class
  > div.dx-texteditor-container
  > div.dx-texteditor-input-container
  > textarea.dx-texteditor-input {
  line-height: 16px;
  padding: 10px 11px !important;
}

.dx-textarea > .dx-texteditor-container > .dx-texteditor-input-container {
  margin: 0;
}

.notes-cell-content {
  height: auto;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
</style>
