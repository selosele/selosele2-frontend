import store from '@/store/store';
import { isNotEmpty } from '@/utils/util';

/**
 * Breadcrumb Service
 */
 class BreadCrumbService {

  constructor() {
  }

  // 페이지 타이틀 변경
  setPageTitle(pageTitle) {
    if (isNotEmpty(pageTitle)) {
      document.title = `${pageTitle} - ${store.getters.blogConfig.title}`;
    } else {
      document.title = store.getters.blogConfig.title;
    }
  }
  
}

const breadCrumbService = new BreadCrumbService();

export default breadCrumbService;
