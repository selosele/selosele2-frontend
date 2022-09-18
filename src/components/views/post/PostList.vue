<template>
  <div class="post-list__wrapper">
    <form method="post" action="/" id="postListForm">
      <input type="hidden" name="_csrf" value="" />
      <input type="hidden" name="page" value="1" />

      <div class="post__btn-wrapper">
        <router-link to="" class="post__btn btn post__btn--write">
          <i class="xi-pen" aria-hidden="true"></i> 포스트 작성
        </router-link>

        <button type="button" class="post__btn btn post__btn--delete">
          <i class="xi-trash" aria-hidden="true"></i> 포스트 삭제
        </button>

        <span class="post__check-all">
          <input type="checkbox" id="check_all" />
          <label for="check_all">포스트 전체 선택</label>
        </span>
      </div>

      <ul class="post__wrapper">
        <li class="post__wrapper__list post__wrapper__list--logined">
          <span class="post__check only-input">
            <input type="checkbox" name="check_post" value="13" id="check_post13" class="post__checkbox" />
            <label for="check_post13">
              <span class="sr-only">포스트 삭제</span>
            </label>
          </span>

          <article aria-labelledby="title_13" aria-describedby="cont_13" class="post__box">
            <h2 id="title_13" class="post__title">
              <router-link to="">Spring 순환참조 문제 해결</router-link>
            </h2>

            <p id="cont_13" class="post__cont">Spring 연습 프로젝트를 작업하다가 순환참조 문제가 발생, 해결 과정을 포스팅한다. CustomAuthenticationProvider 클래스와 SpringSecurityConfig 클래스가 서로를 참조하고 있는 현상이었다. 문제 원인은 다음과 같다. SpringSecurityConfig.java에서 Passwo</p>

            <div class="post__box__item-wrapper">
              <span class="post__box__item post__box__item--create-at">
                <i class="xi-time-o" aria-hidden="true"></i>
                <span class="sr-only">등록일</span>
                <time datetime="2022-08-15 20:46:32">2022.08.15</time>
              </span>

              <span class="post__box__item post__box__item--category">
                <span class="sr-only">카테고리</span> 개발노트
              </span>

              <span class="post__box__item post__box__item--like-count">
                <i class="xi-heart-o" aria-hidden="true"></i>
                <span class="sr-only">추천수</span> 0
              </span>

              <span class="post__box__item post__box__item--comment-count">
                <i class="xi-speech-o" aria-hidden="true"></i>
                <span class="sr-only">댓글수</span> 0
              </span>
            </div>
          </article>
        </li>

        <li class="post__wrapper__list post__wrapper__list--logined">
          <span class="post__check only-input">
            <input type="checkbox" name="check_post" value="11" id="check_post11" class="post__checkbox" />
            <label for="check_post11">
              <span class="sr-only">포스트 삭제</span>
            </label>
          </span>

          <article aria-labelledby="title_11" aria-describedby="cont_11" class="post__box">
            <h2 id="title_11" class="post__title">
              <router-link to="">HttpServletRequest 객체에 직접 접근하는 방법</router-link>
            </h2>

            <p id="cont_11" class="post__cont">Spring Security 환경에서 로그인을 구현 중에, UserDetailsService 인터페이스를 구현한 클래스의 loadUserByUsername 메소드에서 사용자의 입력 값을 받아서 해당 값에 따른 로직 처리를 분기해야 하는 상황이었다. Spring 컨텍스트에서 HttpServletRequest 객체에 직접 접</p>

            <div class="post__box__item-wrapper">
              <span class="post__box__item post__box__item--create-at">
                <i class="xi-time-o" aria-hidden="true"></i>
                <span class="sr-only">등록일</span>
                <time datetime="2022-07-08 15:55:26">2022.07.08</time>
              </span>

              <span class="post__box__item post__box__item--category">
                <span class="sr-only">카테고리</span> 개발노트
              </span>

              <span class="post__box__item post__box__item--like-count">
                <i class="xi-heart-o" aria-hidden="true"></i>
                <span class="sr-only">추천수</span> 0
              </span>

              <span class="post__box__item post__box__item--comment-count">
                <i class="xi-speech-o" aria-hidden="true"></i>
                <span class="sr-only">댓글수</span> 0
              </span>
            </div>
          </article>
        </li>

        <li class="post__wrapper__list post__wrapper__list--logined">
          <span class="post__check only-input">
            <input type="checkbox" name="check_post" value="10" id="check_post10" class="post__checkbox" />
            <label for="check_post10">
              <span class="sr-only">포스트 삭제</span>
            </label>
          </span>

          <article aria-labelledby="title_10" aria-describedby="cont_10" class="post__box">
            <h2 id="title_10" class="post__title">
              <router-link to="">윈도우 작업스케줄러 실행이 안되는 현상 해결</router-link>
            </h2>

            <p id="cont_10" class="post__cont">정확히 말하자면 트리거 실행은 되는데 동작에 등록한 batch 파일이 실행되지 않는 문제였다. batch 파일의 경로 문제도, 트리거의 시간설정 문제도 아니었다. 원인은 바로.. 컴퓨터가 배터리 전원으로 전환되는 경우 중지 부분에 체크 해제를 해줘야 함.... 노트북 환경이라 그랬던 것이었음. 간단해보이는 문제지만 까먹</p>

            <div class="post__box__item-wrapper">
              <span class="post__box__item post__box__item--create-at">
                <i class="xi-time-o" aria-hidden="true"></i>
                <span class="sr-only">등록일</span>
                <time datetime="2022-04-11 21:18:55">2022.04.11</time>
              </span>

              <span class="post__box__item post__box__item--category">
                <span class="sr-only">카테고리</span> 개발노트
              </span>

              <span class="post__box__item post__box__item--like-count">
                <i class="xi-heart-o" aria-hidden="true"></i>
                <span class="sr-only">추천수</span> 0
              </span>

              <span class="post__box__item post__box__item--comment-count">
                <i class="xi-speech-o" aria-hidden="true"></i>
                <span class="sr-only">댓글수</span> 0
              </span>
            </div>
          </article>
        </li>

        <li class="post__wrapper__list post__wrapper__list--logined">
          <span class="post__check only-input">
            <input type="checkbox" name="check_post" value="9" id="check_post9" class="post__checkbox" />
            <label for="check_post9">
              <span class="sr-only">포스트 삭제</span>
            </label>
          </span>

          <article aria-labelledby="title_9" aria-describedby="cont_9" class="post__box">
            <h2 id="title_9" class="post__title">
              <router-link to="">iBATIS에서 테이블 join하는 방법 (with Java)</router-link>
            </h2>

            <p id="cont_9" class="post__cont">iBATIS를 만지다가 여러 테이블을 join해서 데이터를 쉽게 가져오는 방법을 검색해서 적용, 포스팅한다. 다음과 같은 xml 파일이 있다고 가정하자. 늘 하던 것처럼 resultMap을 만들어주는데, aVO와 bVO의 것을 따로 만든다. 핵심은 aMap의 bVO 속성을 가진 result 태그에 resultMap 속성</p>

            <div class="post__box__item-wrapper">
              <span class="post__box__item post__box__item--create-at">
                <i class="xi-time-o" aria-hidden="true"></i>
                <span class="sr-only">등록일</span>
                <time datetime="2022-03-26 16:35:01">2022.03.26</time>
              </span>

              <span class="post__box__item post__box__item--category">
                <span class="sr-only">카테고리</span> 개발노트
              </span>

              <span class="post__box__item post__box__item--like-count">
                <i class="xi-heart-o" aria-hidden="true"></i>
                <span class="sr-only">추천수</span> 0
              </span>

              <span class="post__box__item post__box__item--comment-count">
                <i class="xi-speech-o" aria-hidden="true"></i>
                <span class="sr-only">댓글수</span> 0
              </span>
            </div>
          </article>
        </li>

        <li class="post__wrapper__list post__wrapper__list--logined">
          <span class="post__check only-input">
            <input type="checkbox" name="check_post" value="8" id="check_post8" class="post__checkbox" />
            <label for="check_post8">
              <span class="sr-only">포스트 삭제</span>
            </label>
          </span>

          <article aria-labelledby="title_8" aria-describedby="cont_8" class="post__box">
            <h2 id="title_8" class="post__title">
              <router-link to="">C언어의 strcat 함수에 대한 이해</router-link>
            </h2>

            <p id="cont_8" class="post__cont">C언어 공부 중 이해되지 않는 부분이 몇 개 있어 그 중 하나를 포스팅한다. 우선 strcat() 함수는 인자로 받은 문자열을 연결시키는 함수이다. 위 예제의 결과는 놀랍게도 "Hello"가 아닌 "Hello World"임.. 내 상식에서는 문자열을 연결한 결과를 변수에 담아서 출력한</p>

            <div class="post__box__item-wrapper">
              <span class="post__box__item post__box__item--create-at">
                <i class="xi-time-o" aria-hidden="true"></i>
                <span class="sr-only">등록일</span>
                <time datetime="2022-02-20 18:51:53">2022.02.20</time>
              </span>

              <span class="post__box__item post__box__item--category">
                <span class="sr-only">카테고리</span> 개발노트
              </span>

              <span class="post__box__item post__box__item--like-count">
                <i class="xi-heart-o" aria-hidden="true"></i>
                <span class="sr-only">추천수</span> 0
              </span>

              <span class="post__box__item post__box__item--comment-count">
                <i class="xi-speech-o" aria-hidden="true"></i>
                <span class="sr-only">댓글수</span> 0
              </span>
            </div>
          </article>
        </li>
      </ul>
    </form>

    <Pagination />
  </div>
</template>

<script>
import Pagination from '../../shared/pagination/Pagination.vue';

export default {
  name: 'PostList',
  components: {
    Pagination,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/views/post.scss';
</style>