import UiLoading from '@/components/shared/loading/UiLoading.vue';
import UiSkeletor from '@/components/shared/skeletor/UiSkeletor.vue';
import UiButton from '@/components/shared/button/UiButton.vue';
import UiIconButton from '@/components/shared/button/UiIconButton.vue';
import UiModal from '@/components/shared/modal/UiModal.vue';
import UiGrid from '@/components/shared/grid/UiGrid.vue';
import UiPane from '@/components/shared/splitter/UiPane.vue';
import UiSplitPane from '@/components/shared/splitter/UiSplitPane.vue';
import UiPagination from '@/components/shared/pagination/UiPagination.vue';
import UiTree from '@/components/shared/tree/UiTree.vue';
import UiTabs from '@/components/shared/tab/UiTabs.vue';
import UiTab from '@/components/shared/tab/UiTab.vue';
import UiSortList from '@/components/shared/sortable/UiSortList.vue';
import UiSortItem from '@/components/shared/sortable/UiSortItem.vue';
import UiWriteTable from '@/components/shared/table/UiWriteTable';

export const uiModule = {
  install: (app, options) => {
    app.component('ui-loading', UiLoading);
    app.component('ui-skeletor', UiSkeletor);
    app.component('ui-button', UiButton);
    app.component('ui-icon-button', UiIconButton);
    app.component('ui-modal', UiModal);
    app.component('ui-grid', UiGrid);
    app.component('ui-pane', UiPane);
    app.component('ui-split-pane', UiSplitPane);
    app.component('ui-pagination', UiPagination);
    app.component('ui-tree', UiTree);
    app.component('ui-tabs', UiTabs);
    app.component('ui-tab', UiTab);
    app.component('ui-sort-list', UiSortList);
    app.component('ui-sort-item', UiSortItem);
    app.component('ui-write-table', UiWriteTable);
  }
};
