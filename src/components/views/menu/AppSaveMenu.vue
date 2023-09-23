<template>
  <ui-split-form :name="'saveMenuForm'" ref="saveMenuForm"
                 :btnRemove="true"
                 @onsubmit="onSubmit"
                 @remove="onRemove"
  >
    <ui-hidden-field :name="'id'"
                     :ref="'menuId'"
                     :value="menu.id"
    />

    <ui-hidden-field :name="'depth'"
                     :ref="'menuDepth'"
                     :value="menu.depth || 1"
    />

    <ui-select :name="'parentId'"
               :id="'menuParentId'"
               :title="'부모 메뉴'"
               :label="'부모 메뉴'"
               :defaultValue="'부모 메뉴 선택'"
               :data="parentMenuList"
               :block="true"
               v-model="parentId"
               @onchange="updateDepth">
    </ui-select>

    <ui-text-field :type="'text'"
                   :name="'name'"
                   :id="'menuName'"
                   :label="'메뉴 명'"
                   :rules="'required|max:50'"
                   :block="true"
                   :value="menu.name">
    </ui-text-field>

    <ui-text-field :type="'text'"
                   :name="'link'"
                   :id="'menuLink'"
                   :label="'메뉴 링크'"
                   :rules="'required|max:255'"
                   :block="true"
                   :value="menu.link">
    </ui-text-field>

    <ui-text-field :type="'text'"
                   :name="'regDate'"
                   :id="'menuRegDate'"
                   :label="'메뉴 등록일시'"
                   :readonly="true"
                   :block="true"
                   :value="menu.regDate">
    </ui-text-field>

    <ui-numeric-field :name="'sort'"
                      :id="'menuSort'"
                      :label="'메뉴 정렬 순서'"
                      :rules="'required|numeric'"
                      :block="true"
                      :value="menu.sort || 1">
    </ui-numeric-field>

    <ui-select :name="'role'"
               :id="'menuRoles'"
               :title="'메뉴 권한'"
               :label="'메뉴 권한'"
               :block="true"
               :data="roleList"
               v-model="role">
    </ui-select>

    <ui-radio-group :label="'메뉴 사용 여부'">
      <ui-radio :id="'menuUseYn1'"
                :name="'useYn'"
                :label="'사용'"
                :value="'Y'"
                :rules="'required'"
                v-model="useYn">
      </ui-radio>
      <ui-radio :id="'menuUseYn2'"
                :name="'useYn'"
                :label="'미사용'"
                :value="'N'"
                :rules="'required'"
                v-model="useYn">
      </ui-radio>
    </ui-radio-group>
  </ui-split-form>
</template>

<script>
import { messageUtil, isEmpty, isNotEmpty } from '@/utils';

export default {
  name: 'AppSaveMenu',
  props: {
    /** 메뉴 */
    menu: Object,
    /** 부모 메뉴 목록 */
    parentMenuList: Array,
  },
  data() {
    return {
      parentId: '',
      useYn: '',
      role: '',
      roleList: [],
    }
  },
  async created() {
    this.parentId = this.menu.parentId;
    this.useYn = this.menu.useYn;

    await this.listRole();

    this.role = this.getMenuRoleModel();
  },
  methods: {
    /** 메뉴 저장 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      // 메뉴 ID 값이 없으면 등록 API를 타고
      if (isEmpty(values.id)) {
        await this.addMenu(values);
      } else {
        // 있으면 수정 API를 탄다.
        await this.updateMenu(values);
      }

      await this.listMenu();
    },
    /** 메뉴 삭제 */
    async onRemove(values) {
      if (isEmpty(values.id)) return;

      const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?');
      if (!confirm) return;

      this.$http.delete(`/menu/${values.id}`)
      .then(async resp => {
        messageUtil.toastSuccess('삭제되었습니다.');

        await this.listMenu();
        this.$emit('refreshMenu');
      });
    },
    /** 메뉴 등록 */
    addMenu(values) {
      return this.$http.post('/menu', values)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');

        this.$refs['menuId'].$el.value = resp.data.id;
        this.$emit('refreshMenu');
      });
    },
    /** 메뉴 목록 조회 */
    listMenu() {
      return this.$store.dispatch('Menu/LIST_MENU', {
        params: {
          useYn: 'Y',
        },
      });
    },
    /** 메뉴 수정 */
    updateMenu(values) {
      return this.$http.put('/menu', values)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');

        this.$refs['menuId'].$el.value = resp.data.id;
        this.$emit('refreshMenu');
      });
    },
    /** 권한 목록 조회 */
    listRole() {
      this.$store.commit('Loading/SET_USE_LOADING', false);

      return this.$http.get('/auth/role')
      .then(resp => {
        this.roleList = [
          ...resp.data.map(d => {
            return {
              value: d.roleId,
              text: d.roleNm,
            };
          })
        ];
        
        this.roleList.push({ value: '', text: '모든 권한 허용' });
        this.$store.commit('Loading/SET_USE_LOADING', true);
      });
    },
    /** 메뉴 권한 model 얻기 */
    getMenuRoleModel() {
      if (isNotEmpty(this.menu.menuRole) && 0 < this.menu.menuRole.length) {
        const list = this.menu.menuRole.filter(m => {
          return 0 < this.roleList.filter(r => r.value === m.roleId).length;
        });

        return 1 < list.length ? '' : list[0].roleId;
      }

      return '';
    },
    /** 메뉴 계층 갱신 */
    updateDepth(value) {
      if (isEmpty(value)) {
        this.$refs['saveMenuForm'].setFieldValue('depth', 1);
        return;
      }

      this.$refs['saveMenuForm'].setFieldValue('depth', 2);
    },
  }
}
</script>

<style lang="scss" scoped>

</style>