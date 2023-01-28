import UiForm from '@/components/shared/form/UiForm.vue';
import UiSplitForm from '@/components/shared/form/UiSplitForm.vue';
import UiHiddenField from '@/components/shared/form/UiHiddenField.vue';
import UiTextField from '@/components/shared/form/UiTextField.vue';
import UiNumericField from '@/components/shared/form/UiNumericField.vue';
import UiTextarea from '@/components/shared/form/UiTextarea.vue';
import UiSelect from '@/components/shared/form/UiSelect.vue';
import UiRadio from '@/components/shared/form/UiRadio.vue';
import UiRadioGroup from '@/components/shared/form/UiRadioGroup.vue';
import UiCheckbox from '@/components/shared/form/UiCheckbox.vue';
import UiCheckboxGroup from '@/components/shared/form/UiCheckboxGroup.vue';
import UiDatepicker from '@/components/shared/form/UiDatepicker.vue';
import UiFileField from '@/components/shared/form/UiFileField.vue';
import UiFileUploadField from '@/components/shared/form/UiFileUploadField.vue';
import UiFileInfo from '@/components/shared/file/UiFileInfo.vue';

export const formModule = {
  install: (app, options) => {
    app.component('ui-form', UiForm);
    app.component('ui-split-form', UiSplitForm);
    app.component('ui-hidden-field', UiHiddenField);
    app.component('ui-text-field', UiTextField);
    app.component('ui-numeric-field', UiNumericField);
    app.component('ui-textarea', UiTextarea);
    app.component('ui-select', UiSelect);
    app.component('ui-radio', UiRadio);
    app.component('ui-radio-group', UiRadioGroup);
    app.component('ui-checkbox', UiCheckbox);
    app.component('ui-checkbox-group', UiCheckboxGroup);
    app.component('ui-datepicker', UiDatepicker);
    app.component('ui-file-field', UiFileField);
    app.component('ui-file-upload-field', UiFileUploadField);
    app.component('ui-file-info', UiFileInfo);
  }
};
