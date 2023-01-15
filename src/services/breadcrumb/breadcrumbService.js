import store from '@/store';
import { isNotEmpty } from '@/utils';

/** Breadcrumb Service */
class BreadcrumbService {

  constructor() {
  }

  /** 페이지 타이틀 변경 */
  setPageTitle(pageTitle) {
    if (isNotEmpty(pageTitle)) {
      document.title = `${pageTitle} - ${store.state.BlogConfig.data?.title}`;
    } else {
      document.title = store.state.BlogConfig.data?.title;
    }
  }
  
}

export const breadcrumbService = new BreadcrumbService();
