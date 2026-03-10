import { employees, states } from "./data.js";

$(() => {
	const employeesStore = new DevExpress.data.ArrayStore({
		key: "ID",
		data: employees
	});

	const dataGrid = $("#gridContainer")
		.dxDataGrid({
			dataSource: employeesStore,
			showBorders: true,
			paging: {
				enabled: false
			},
			editing: {
				mode: "cell",
				allowUpdating: true
			},
			columns: [
				{
					dataField: "Prefix",
					caption: "Title",
					width: 80
				},
				"FirstName",
				"LastName",
				{
					dataField: "Position",
					width: 170
				},
				{
					dataField: "StateID",
					caption: "State",
					width: 125,
					lookup: {
						dataSource: states,
						displayExpr: "Name",
						valueExpr: "ID"
					}
				},
				{
					dataField: "Notes",
					width: 300,
					editCellTemplate: textAreaEditorTemplate,
					cellTemplate: notesCellTemplate
				}
			]
		})
		.dxDataGrid("instance");

		function textAreaEditorTemplate(cellElement, cellInfo) {
			let divContainer = $("<div>");
			cellElement.append(divContainer);
			
			$(divContainer).dxTextArea({
				value: cellInfo.value,
				elementAttr: {
					class: "custom-textarea-class"
				},
				autoResizeEnabled: true,
				onInitialized(e) {
    				e.component.registerKeyHandler("enter", function(event) {
    					if (!event.ctrlKey && !event.shiftKey) {
    						event.stopPropagation();
    					}
    				});
    			},
				onValueChanged(e) {
        			cellInfo.setValue(e.value);
      			},
				onInput(args) {
					var el = args.element[0];
					if (el.prevClientHeight !== el.clientHeight) {
						dataGrid.updateDimensions();
					}
					el.prevClientHeight = el.clientHeight;
				},
			});
		}

		function notesCellTemplate(cellElement, cellInfo) {
			$("<div>")
				.addClass("notes-cell-content")
				.text(cellInfo.value)
				.appendTo(cellElement);
		}
});
