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
					editorType: "dxTextArea",
					width: 300,
					editorOptions: {
						elementAttr: {
							class: "custom-textarea-class"
						},
						autoResizeEnabled: true,
						onInput(args) {
							var el = args.element[0];
							if (el.prevClientHeight !== el.clientHeight) {
								dataGrid.updateDimensions();
							}
							el.prevClientHeight = el.clientHeight;
						}
					},
					cellTemplate: function (element, info) {
						$("<div>")
							.appendTo(element)
							.text(info.value)
							.css("width", info.column.width - 20)
							.css("height", "auto")
							.css("white-space", "normal")
							.css("overflow-wrap", "break-word");
					}
				}
			]
		})
		.dxDataGrid("instance");
});
