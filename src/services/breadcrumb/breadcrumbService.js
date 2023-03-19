import store from '@/store';
import { isNotEmpty } from '@/utils';

/** Breadcrumb Service */
export class BreadcrumbService {

  nowPageTitle = '';

  constructor() {
  }

  /** 페이지 타이틀 반환 */
  getPageTitle() {
    return this.nowPageTitle;
  }

  /** 페이지 타이틀 변경 */
  setPageTitle(pageTitle) {
    if (isNotEmpty(pageTitle)) {
      document.title = `${pageTitle} - ${store.state.BlogConfig.data?.title}`;
      this.nowPageTitle = pageTitle;
    } else {
      document.title = store.state.BlogConfig.data?.title;
    }
  }
  
}
