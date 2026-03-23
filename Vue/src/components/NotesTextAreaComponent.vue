<template>
  <DxTextArea
    :value="cellInfo.value"
    :auto-resize-enabled="true"
    :element-attr="{ class: 'custom-textarea-class' }"
    @initialized="onTextAreaInitialized"
    @value-changed="onValueChanged"
    @input="onTextAreaInput"
  />
</template>

<script setup lang="ts">
import { type DxDataGridTypes } from 'devextreme-vue/data-grid';
import { type DxTextAreaTypes } from 'devextreme-vue/text-area';
import DxTextArea from 'devextreme-vue/text-area';

type TextAreaElement = HTMLElement & {
  prevClientHeight?: number;
};

const { cellInfo } = defineProps<{
  cellInfo: DxDataGridTypes.ColumnEditCellTemplateData;
}>();

const onTextAreaInitialized = (e: DxTextAreaTypes.InitializedEvent) => {
  e.component?.registerKeyHandler('enter', (event: KeyboardEvent) => {
    if (!event.ctrlKey && !event.shiftKey) {
      event.stopPropagation();
    }
  });
};

const onTextAreaInput = (e: DxTextAreaTypes.InputEvent) => {
  const el = e.element as TextAreaElement;
  if (!el) return;

  if (el.prevClientHeight !== el.clientHeight) {
    cellInfo.component?.updateDimensions();
  }

  el.prevClientHeight = el.clientHeight;
};

const onValueChanged = (e: DxTextAreaTypes.ValueChangedEvent) => {
  cellInfo.setValue(e.value);
};
</script>
