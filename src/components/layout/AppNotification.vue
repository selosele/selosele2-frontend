<template>
  <div class="notice__wrapper" @click="$event.stopPropagation()">
    <div class="notice__util">
      <div class="notice__util__tabs">
        <ui-button :class="{ 'active': 0 === activeIndex }" @click="toggleTab(0, 'D02001')">포스트추천</ui-button>
        <ui-button :class="{ 'active': 1 === activeIndex }" @click="toggleTab(1, 'D02002')">포스트댓글</ui-button>
        <ui-button :class="{ 'active': 2 === activeIndex }" @click="toggleTab(2, 'D02003')">방명록</ui-button>
        <ui-button :class="{ 'active': 3 === activeIndex }" @click="toggleTab(3, 'D02004')">방명록댓글</ui-button>
        <ui-button :class="{ 'active': 4 === activeIndex }" @click="toggleTab(4, 'D02005')">만족도조사</ui-button>
      </div>
    
      <div class="notice__util__cont">
        <div class="cont" v-if="0 === activeIndex">
          <div class="notice__util__cont-info">
            <ui-checkbox :name="'checkAll'"
                         :id="'postLikeCheckAll'"
                         :label="'모두 선택'"
                         :clazz="['notice-check-all']"
                         :values="'Y,N'"
                         v-model="checkAll"
                         v-if="0 < postLikeList.length">
            </ui-checkbox>
  
            <ui-icon-button :color="'light'"
                            :icon="'xi-check'"
                            :class="'btn-notice-check'"
                            @click="updateCheckYn"
                            v-if="0 < postLikeList.length">읽음
            </ui-icon-button>
  
            <p class="notice-count__wrapper">총 <span class="notice-count">{{ postLikeList.length }}</span>개의 읽지 않은 알림</p>
          </div>
  
          <ul v-if="0 < postLikeList.length">
            <li v-for="(noti,i) in postLikeList" :key="i">
              <ui-checkbox :name="'checkYn'"
                           :id="`postLikeNoticeCheck${noti.id}`"
                           :label="'알림 선택'"
                           :labelHidden="true"
                           :value="noti.id"
                           v-model="idList">
              </ui-checkbox>
  
              <router-link :to="noti.link">{{ noti.title }}</router-link> 포스트에 추천이 등록되었습니다.
              <span class="info">{{ noti.regDate }}</span>
            </li>
          </ul>
  
          <!-- <ui-icon-button :icon="'xi-ellipsis-h'"
                          :text="'알림 더보기'"
                          :class="'btn-more'">
          </ui-icon-button> -->
        </div>
    
        <div class="cont" v-if="1 === activeIndex">
          <div class="notice__util__cont-info">
            <ui-checkbox :name="'checkAll'"
                         :id="'postReplyCheckAll'"
                         :label="'모두 선택'"
                         :clazz="['notice-check-all']"
                         :values="'Y,N'"
                         v-model="checkAll"
                         v-if="0 < postReplyList.length">
            </ui-checkbox>
  
            <ui-icon-button :color="'light'"
                            :icon="'xi-check'"
                            :class="'btn-notice-check'"
                            @click="updateCheckYn"
                            v-if="0 < postReplyList.length">읽음
            </ui-icon-button>
  
            <p class="notice-count__wrapper">총 <span class="notice-count">{{ postReplyList.length }}</span>개의 읽지 않은 알림</p>
          </div>

          <ul v-if="0 < postReplyList.length">
            <li v-for="(noti,i) in postReplyList" :key="i">
              <ui-checkbox :name="'checkYn'"
                           :id="`postReplyNoticeCheck${noti.id}`"
                           :label="'알림 선택'"
                           :labelHidden="true"
                           :value="noti.id"
                           v-model="idList">
              </ui-checkbox>
              
              <router-link :to="noti.link">{{ noti.title }}</router-link> 포스트에 댓글이 등록되었습니다.
              <span class="info">{{ noti.regDate }}</span>
            </li>
          </ul>
          
          <!-- <ui-icon-button :icon="'xi-ellipsis-h'"
                          :text="'알림 더보기'"
                          :class="'btn-more'">
          </ui-icon-button> -->
        </div>
    
        <div class="cont" v-if="2 === activeIndex">
          <div class="notice__util__cont-info">
            <ui-checkbox :name="'checkAll'"
                         :id="'guestbookCheckAll'"
                         :label="'모두 선택'"
                         :clazz="['notice-check-all']"
                         :values="'Y,N'"
                         v-model="checkAll"
                         v-if="0 < guestbookList.length">
            </ui-checkbox>
  
            <ui-icon-button :color="'light'"
                            :icon="'xi-check'"
                            :class="'btn-notice-check'"
                            @click="updateCheckYn"
                            v-if="0 < guestbookList.length">읽음
            </ui-icon-button>
  
            <p class="notice-count__wrapper">총 <span class="notice-count">{{ guestbookList.length }}</span>개의 읽지 않은 알림</p>
          </div>

          <ul v-if="0 < guestbookList.length">
            <li v-for="(noti,i) in guestbookList" :key="i">
              <ui-checkbox :name="'checkYn'"
                           :id="`guestbookNoticeCheck${noti.id}`"
                           :label="'알림 선택'"
                           :labelHidden="true"
                           :value="noti.id"
                           v-model="idList">
              </ui-checkbox>{{ noti.senderNm }}님이 <router-link :to="noti.link">방명록을 남겼습니다.</router-link>

              <span class="info">{{ noti.regDate }}</span></li>
          </ul>
          
          <!-- <ui-icon-button :icon="'xi-ellipsis-h'"
                          :text="'알림 더보기'"
                          :class="'btn-more'">
          </ui-icon-button> -->
        </div>
    
        <div class="cont" v-if="3 === activeIndex">
          <div class="notice__util__cont-info">
            <ui-checkbox :name="'checkAll'"
                         :id="'guestbookReplyCheckAll'"
                         :label="'모두 선택'"
                         :clazz="['notice-check-all']"
                         :values="'Y,N'"
                         v-model="checkAll"
                         v-if="0 < guestbookReplyList.length">
            </ui-checkbox>
  
            <ui-icon-button :color="'light'"
                            :icon="'xi-check'"
                            :class="'btn-notice-check'"
                            @click="updateCheckYn"
                            v-if="0 < guestbookReplyList.length">읽음
            </ui-icon-button>
  
            <p class="notice-count__wrapper">총 <span class="notice-count">{{ guestbookReplyList.length }}</span>개의 읽지 않은 알림</p>
          </div>

          <ul v-if="0 < guestbookReplyList.length">
            <li v-for="(noti,i) in guestbookReplyList" :key="i">
              <ui-checkbox :name="'checkYn'"
                           :id="`guestbookReplyNoticeCheck${noti.id}`"
                           :label="'알림 선택'"
                           :labelHidden="true"
                           :value="noti.id"
                           v-model="idList">
              </ui-checkbox>{{ noti.senderNm }}님이 <router-link :to="noti.link">방명록에 댓글을 남겼습니다.</router-link>

              <span class="info">{{ noti.regDate }}</span></li>
          </ul>
          
          <!-- <ui-icon-button :icon="'xi-ellipsis-h'"
                          :text="'알림 더보기'"
                          :class="'btn-more'">
          </ui-icon-button> -->
        </div>

        <div class="cont" v-if="4 === activeIndex">
          <div class="notice__util__cont-info">
            <ui-checkbox :name="'checkAll'"
                         :id="'satisfactionCheckAll'"
                         :label="'모두 선택'"
                         :clazz="['notice-check-all']"
                         v-model="checkAll"
                         v-if="0 < satisfactionList.length">
            </ui-checkbox>
  
            <ui-icon-button :color="'light'"
                            :icon="'xi-check'"
                            :class="'btn-notice-check'"
                            @click="updateCheckYn"
                            v-if="0 < satisfactionList.length">읽음
            </ui-icon-button>
  
            <p class="notice-count__wrapper">총 <span class="notice-count">{{ satisfactionList.length }}</span>개의 읽지 않은 알림</p>
          </div>

          <ul v-if="0 < satisfactionList.length">
            <li v-for="(noti,i) in satisfactionList" :key="i">
              <ui-checkbox :name="'checkYn'"
                           :id="`satisfactionNoticeCheck${noti.id}`"
                           :label="'알림 선택'"
                           :labelHidden="true"
                           :value="noti.id"
                           v-model="idList">
              </ui-checkbox>
              
              <router-link :to="noti.link">{{ noti.title }}</router-link> 페이지에 <router-link :to="'/admin/satisfaction'">만족도 평가가 등록되었습니다.</router-link>
              <span class="info">{{ noti.regDate }}</span></li>
          </ul>
          
          <!-- <ui-icon-button :icon="'xi-ellipsis-h'"
                          :text="'알림 더보기'"
                          :class="'btn-more'">
          </ui-icon-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isNotEmpty, messageUtil } from '@/utils';

  export default {
    name: 'app-notification',
    props: {
      /** 알림 목록 */
      list: Array,
    },
    data() {
      return {
        /** 포스트 추천 알림 목록 */
        postLikeList: [],
        /** 포스트 댓글 알림 목록 */
        postReplyList: [],
        /** 방명록 알림 목록 */
        guestbookList: [],
        /** 방명록 댓글 알림 목록 */
        guestbookReplyList: [],
        /** 만족도조사 알림 목록 */
        satisfactionList: [],
        /** 활성화 탭 Index */
        activeIndex: 0,
        /** 활성화 탭 알림 유형 코드 */
        activeTypeCd: '',
        /** 확인 처리할 알림 ID 목록 */
        idList: [],
      }
    },
    created() {
      this.setData();
    },
    computed: {
      /** 체크박스 전체 선택 */
      checkAll: {
        get() {
          if (isNotEmpty(this.idList) && 0 < this.idList.length) {
            return this.idList.length === this.list.filter(d => d.typeCd === this.activeTypeCd).length;
          }
          return false;
        },
        set(v) {
          this.idList = [];

          if ('Y' === v) {
            this.list.filter(d => d.typeCd === this.activeTypeCd).map(d => {
              this.idList.push(d.id);
            });
          }
        }
      },
    },
    methods: {
      /** 알림 목록 분류 */
      setData() {
        this.activeTypeCd = 'D02001';

        this.list.map(d => {
          d.regDate = this.$moment(d.regDate).format('YYYY-MM-DD HH:mm:ss');
        });

        this.postLikeList = this.list.filter(d => d.typeCd === 'D02001');         // 포스트 추천 알림 목록
        this.postReplyList = this.list.filter(d => d.typeCd === 'D02002');        // 포스트 댓글 알림 목록
        this.guestbookList = this.list.filter(d => d.typeCd === 'D02003');        // 방명록 알림 목록
        this.guestbookReplyList = this.list.filter(d => d.typeCd === 'D02004');   // 방명록 댓글 알림 목록
        this.satisfactionList = this.list.filter(d => d.typeCd === 'D02005');     // 만족도조사 알림 목록
      },
      /** 알림 확인 여부 수정 */
      updateCheckYn() {
        if (0 === this.idList.length) {
          messageUtil.toastWarning('알림을 선택하세요.');
          return;
        }

        return this.$http.put('/notification', this.idList)
        .then(resp => {
          this.$emit('check');
        });
      },
      /** 탭 toggle */
      toggleTab(idx, typeCd) {
        this.activeIndex = idx;
        this.activeTypeCd = typeCd;
        this.idList = [];
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/notice.scss';
</style>