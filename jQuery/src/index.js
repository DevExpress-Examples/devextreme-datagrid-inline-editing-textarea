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
					cellTemplate: function (element, info) {
						$("<div>")
							.addClass("notes-cell-content")
							.text(info.value)
							.appendTo(element);
					}
				}
			]
		})
		.dxDataGrid("instance");

		function textAreaEditorTemplate(cellElement, cellInfo) {
			let firstTime = true
			return $("<div>").dxTextArea({
				value: cellInfo.value,
				elementAttr: {
					class: "custom-textarea-class"
				},
				autoResizeEnabled: true,
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
				onContentReady(e){
              		if (firstTime) {
              		  firstTime = false
              		  setTimeout(()=>{
              		    e.component.repaint()
              		  })
              		}
            	},
			});
		}
});
