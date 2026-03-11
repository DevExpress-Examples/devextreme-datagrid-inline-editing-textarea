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

function NotesTextAreaComponent(props: DataGridTypes.ColumnCellTemplateData) {
  const handleValueChanged = useCallback(
    (e: TextAreaTypes.ValueChangedEvent) => {
      props.data.setValue(e.value);
    },
    [props.data],
  );

  const handleNotesInput = useCallback((args: TextAreaTypes.InputEvent) => {
    const el = args.element as TextAreaElement;

    if (el.prevClientHeight !== el.clientHeight) {
      props.data.component.updateDimensions();
    }

    el.prevClientHeight = el.clientHeight;
  }, [props.data]);

  const handleOnInitialized = useCallback((e: TextAreaTypes.InitializedEvent) => {
    e.component?.registerKeyHandler('enter', (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.shiftKey) {
        event.stopPropagation();
      }
    });
  }, []);

  return (
    <TextArea
      defaultValue={props.data.value}
      onValueChanged={handleValueChanged}
      elementAttr={textAreaElementAttr}
      autoResizeEnabled={true}
      onInput={handleNotesInput}
      onInitialized={handleOnInitialized}
    />
  );
}

export default NotesTextAreaComponent;
