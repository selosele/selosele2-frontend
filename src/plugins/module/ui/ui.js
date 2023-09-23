import UiLoading from '@/components/shared/loading/UiLoading.vue';
import UiSkeletor from '@/components/shared/skeletor/UiSkeletor.vue';
import UiButton from '@/components/shared/button/UiButton.vue';
import UiFileButton from '@/components/shared/button/UiFileButton.vue';
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
import UiFileList from '@/components/shared/file/UiFileList';

export const uiModule = {
  install: (app, options) => {
    app.component('UiLoading', UiLoading);
    app.component('UiSkeletor', UiSkeletor);
    app.component('UiButton', UiButton);
    app.component('UiFileButton', UiFileButton);
    app.component('UiIconButton', UiIconButton);
    app.component('UiModal', UiModal);
    app.component('UiGrid', UiGrid);
    app.component('UiPane', UiPane);
    app.component('UiSplitPane', UiSplitPane);
    app.component('UiPagination', UiPagination);
    app.component('UiTree', UiTree);
    app.component('UiTabs', UiTabs);
    app.component('UiTab', UiTab);
    app.component('UiSortList', UiSortList);
    app.component('UiSortItem', UiSortItem);
    app.component('UiWriteTable', UiWriteTable);
    app.component('UiFileList', UiFileList);
  }
};
