import { useCallback } from 'react';
import type { DataGridTypes } from 'devextreme-react/data-grid';
import type { TextAreaTypes } from 'devextreme-react/text-area';
import TextArea from 'devextreme-react/text-area';

type TextAreaElement = HTMLElement & {
  prevClientHeight?: number;
};

const textAreaElementAttr = {
  class: 'custom-textarea-class',
};

function NotesTextAreaComponent({ data }: { data: DataGridTypes.ColumnEditCellTemplateData }) {
  const handleValueChanged = useCallback(
    (e: TextAreaTypes.ValueChangedEvent) => {
      data.setValue(e.value);
    },
    [data.setValue],
  );

  const handleNotesInput = useCallback((args: TextAreaTypes.InputEvent) => {
    const el = args.element as TextAreaElement;

    if (el.prevClientHeight !== el.clientHeight) {
      data.component.updateDimensions();
    }

    el.prevClientHeight = el.clientHeight;
  }, [data.component]);

  const handleOnInitialized = useCallback((e: TextAreaTypes.InitializedEvent) => {
    e.component?.registerKeyHandler('enter', (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.shiftKey) {
        event.stopPropagation();
      }
    });
  }, []);

  return (
    <TextArea
      defaultValue={data.value}
      onValueChanged={handleValueChanged}
      elementAttr={textAreaElementAttr}
      autoResizeEnabled={true}
      onInput={handleNotesInput}
      onInitialized={handleOnInitialized}
    />
  );
}

export default NotesTextAreaComponent;
