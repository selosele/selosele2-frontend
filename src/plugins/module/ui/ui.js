import AppContentWrapper from '@/components/layout/AppContentWrapper.vue';
import UiLoading from '@/components/shared/loading/UiLoading.vue';
import UiSkeletor from '@/components/shared/skeletor/UiSkeletor.vue';
import UiButton from '@/components/shared/button/UiButton.vue';
import UiModal from '@/components/shared/modal/UiModal.vue';
import UiGrid from '@/components/shared/grid/UiGrid.vue';
import UiPane from '@/components/shared/splitter/UiPane.vue';
import UiSplitPane from '@/components/shared/splitter/UiSplitPane.vue';
import UiPagination from '@/components/shared/pagination/UiPagination.vue';

export const uiModule = {
  install: (app, options) => {
    app.component('app-content-wrapper', AppContentWrapper);
    app.component('ui-loading', UiLoading);
    app.component('ui-skeletor', UiSkeletor);
    app.component('ui-button', UiButton);
    app.component('ui-modal', UiModal);
    app.component('ui-grid', UiGrid);
    app.component('ui-pane', UiPane);
    app.component('ui-split-pane', UiSplitPane);
    app.component('ui-pagination', UiPagination);
  }
};