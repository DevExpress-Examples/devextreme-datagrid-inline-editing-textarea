<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/1164624763/25.2.2%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1322816)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# DevExtreme DataGrid - Multi-Line Text Editing using DevExtreme TextArea

This example displays long strings in multiple lines within dxDataGrid cells. In edit mode, this example maintains the grid layout using a DevExtreme TextArea as a cell editor.

![DevExtreme DataGrid - Multi-Line Text Editing using DevExtreme TextArea](images/datagrid-inline-editing-textarea.gif)

## Implementation Details

To display long strings in multiple lines within dxDataGrid cells, apply the following CSS styles to grid cell containers:

```css
tr.dx-data-row td {
	height: auto;
	white-space: pre-wrap;
	overflow-wrap: break-word;
}
```

> [!Note]
> This example specifies a custom class for the "Notes" column (using **columns[]**.[cellTemplate](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/#cellTemplate)) to apply multi-line styles only to this column.

To implement a DevExtreme TextArea as a cell editor and maintain the grid layout in edit mode, follow these steps:

1. Define **dxDataGrid**.**columns[]**.[editCellTemplate](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/#editCellTemplate) and configure a TextArea component. Enable **dxTextArea**.[autoResizeEnabled](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTextArea/Configuration/#autoResizeEnabled) to avoid text truncation.

2. Apply the following CSS styles to ensure cell appearance consistency in edit mode:

    ```css
    .dx-editor-cell
        > .dx-textarea
        > div.dx-texteditor-container
        > div.dx-texteditor-input-container
        > textarea.dx-texteditor-input {
        line-height: 16px;
        padding: 10px 11px !important;
    }

    .dx-textarea > .dx-texteditor-container > .dx-texteditor-input-container {
        margin: 0 !important;
    }
    ```

    > [!Note]
    > This example specifies a custom class for TextArea components in the "Notes" column (using [elementAttr](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTextArea/Configuration/#elementAttr)) to apply style changes only to editors within this column.

3. Configure the **dxTextArea**.[onInput](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTextArea/Configuration/#onInput) handler and call **dxDataGrid**.[updateDimensions()](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Methods/#updateDimensions).

**jQuery**:

```js
const dataGrid = $("#gridContainer").dxDataGrid({
    columns: [{
        dataField: "Notes",
        editCellTemplate: textAreaEditorTemplate,
    }]
}).dxDataGrid("instance");

function textAreaEditorTemplate(cellElement, cellInfo) {
    let divContainer = $("<div>");
    cellElement.append(divContainer);
    
    $(divContainer).dxTextArea({
        autoResizeEnabled: true,
        onInput(args) {
            var el = args.element[0];
            if (el.prevClientHeight !== el.clientHeight) {
                dataGrid.updateDimensions();
            }
            el.prevClientHeight = el.clientHeight;
        },
    });
}
```

**Angular**:

```html
<dx-data-grid #dataGrid>
    <dxi-data-grid-column
        dataField="Notes"
        editCellTemplate="textAreaEditorTemplate"
    ></dxi-data-grid-column>
    <div *dxTemplate="let cellInfo of 'textAreaEditorTemplate'">
        <dx-text-area
            [autoResizeEnabled]="true"
            (onInput)="onTextAreaInput($event)"
        ></dx-text-area>
    </div>
</dx-data-grid>
```

```ts
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { type DxTextAreaTypes } from "devextreme-angular/ui/text-area";

// ...
export class AppComponent {
    @ViewChild('dataGrid', { static: false }) dataGrid!: DxDataGridComponent;

    onTextAreaInput(e: DxTextAreaTypes.InputEvent) {
        const el = e.element;
        if (!el) return;

        if (el.prevClientHeight !== el.clientHeight) {
            this.dataGrid?.instance?.updateDimensions();
        }

        el.prevClientHeight = el.clientHeight;
    }
}
```

**Vue**:

```vue
<template>
    <DxTextArea
        :auto-resize-enabled="true"
        @input="onTextAreaInput"
    />
</template>

<script setup lang="ts">
import { DxTextArea, type DxTextAreaTypes } from 'devextreme-vue/text-area';

const { cellInfo } = defineProps<{ cellInfo: DxDataGridTypes.ColumnEditCellTemplateData }>();

const onTextAreaInput = (e: DxTextAreaTypes.InputEvent) => {
    const el = e.element;
    if (!el) return;

    if (el.prevClientHeight !== el.clientHeight) {
        cellInfo.component?.updateDimensions();
    }

    el.prevClientHeight = el.clientHeight;
};
</script>
```

```vue
<template>
    <DxDataGrid>
        <DxColumn
            data-field="Notes"
            edit-cell-template="textAreaEditorTemplate"
        />
        <template #textAreaEditorTemplate="{ data: cellInfo }">
            <NotesTextAreaComponent :cell-info="cellInfo"/>
        </template>
    </DxDataGrid>
</template>
```

**React**:

```tsx
import { DataGrid, type DataGridTypes } from 'devextreme-react/data-grid';
import { TextArea, type TextAreaTypes } from 'devextreme-react/text-area';

function NotesTextAreaComponent({ data }: { data: DataGridTypes.ColumnEditCellTemplateData }) {
    const handleNotesInput = useCallback((args: TextAreaTypes.InputEvent) => {
        const el = args.element;

        if (el.prevClientHeight !== el.clientHeight) {
            data.component.updateDimensions();
        }

        el.prevClientHeight = el.clientHeight;
    }, [data.component]);

    return (
        <TextArea
            autoResizeEnabled={true}
            onInput={handleNotesInput}
        />
    );
}

function App(): JSX.Element {
    return (
        <DataGrid>
            <Column dataField='Notes' editCellComponent={NotesTextAreaComponent} />
        </DataGrid>
    );
}
```

**ASP.NET Core**:

```razor
@(Html.DevExtreme().DataGrid<Employee>()
    .ID("gridContainer")
    .Columns(columns => {
        columns.AddFor(m => m.Notes)
            .EditCellTemplate(new TemplateName("textAreaEditorTemplate"))
    })
)

@using (Html.DevExtreme().NamedTemplate("textAreaEditorTemplate")) {
    @(Html.DevExtreme().TextArea()
        .AutoResizeEnabled(true)
        .OnInput("onTextAreaInput")
    )
}

<script>
    function onTextAreaInput(args) {
        const dataGrid = $("#gridContainer").dxDataGrid("instance");
        const el = args.element[0];

        if (el.prevClientHeight !== el.clientHeight) {
            dataGrid.updateDimensions();
        }

        el.prevClientHeight = el.clientHeight;
    }
</script>
```

## Files to Review

- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
- **React**
    - [App.tsx](React/src/App.tsx)
- **Vue**
    - [App.vue](Vue/src/App.vue)
    - [Home.vue](Vue/src/components/HomeContent.vue)
- **jQuery**
    - [index.html](jQuery/src/index.html)
    - [index.js](jQuery/src/index.js)
- **ASP.NET Core**    
    - [Index.cshtml](ASP.NET%20Core/Views/Home/Index.cshtml)

## Documentation

- [DataGrid.columns.editCellTemplate](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/#cellTemplate)
- [DataGrid.columns.cellTemplate](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/#editCellTemplate)
- [DataGrid.updateDimensions()](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Methods/#updateDimensions)
- [TextArea.autoResizeEnabled](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTextArea/Configuration/#autoResizeEnabled)
- [TextArea.onInput](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTextArea/Configuration/#onInput)

<!-- feedback -->
## Does This Example Address Your Development Requirements/Objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-datagrid-inline-editing-textarea&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-datagrid-inline-editing-textarea&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
