import UiForm from '@/components/shared/form/UiForm.vue';
import UiHiddenField from '@/components/shared/form/UiHiddenField.vue';
import UiTextField from '@/components/shared/form/UiTextField.vue';
import UiNumericField from '@/components/shared/form/UiNumericField.vue';
import UiTextarea from '@/components/shared/form/UiTextarea.vue';
import UiSelect from '@/components/shared/form/UiSelect.vue';
import UiRadio from '@/components/shared/form/UiRadio.vue';
import UiRadioGroup from '@/components/shared/form/UiRadioGroup.vue';
import UiCheckbox from '@/components/shared/form/UiCheckbox.vue';
import UiCheckboxGroup from '@/components/shared/form/UiCheckboxGroup.vue';
import UiFileField from '@/components/shared/form/UiFileField.vue';
import UiFileUploadField from '@/components/shared/form/UiFileUploadField.vue';
import UiFileInfo from '@/components/shared/file/UiFileInfo.vue';

export const formModule = {
  install: (app, options) => {
    app.component('UiForm', UiForm);
    app.component('UiHiddenField', UiHiddenField);
    app.component('UiTextField', UiTextField);
    app.component('UiNumericField', UiNumericField);
    app.component('UiTextarea', UiTextarea);
    app.component('UiSelect', UiSelect);
    app.component('UiRadio', UiRadio);
    app.component('UiRadioGroup', UiRadioGroup);
    app.component('UiCheckbox', UiCheckbox);
    app.component('UiCheckboxGroup', UiCheckboxGroup);
    app.component('UiFileField', UiFileField);
    app.component('UiFileUploadField', UiFileUploadField);
    app.component('UiFileInfo', UiFileInfo);
  }
};
