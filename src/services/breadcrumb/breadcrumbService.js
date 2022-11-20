import store from '@/store/store';
import { isNotEmpty } from '@/utils/util';

/**
 * Breadcrumb Service
 */
 class BreadcrumbService {

  constructor() {
  }

  // 페이지 타이틀 변경
  setPageTitle(pageTitle) {
    if (isNotEmpty(pageTitle)) {
      document.title = `${pageTitle} - ${store.state.blogConfig.title}`;
    } else {
      document.title = store.state.blogConfig.title;
    }
  }
  
}

const breadcrumbService = new BreadcrumbService();

export default breadcrumbService;
