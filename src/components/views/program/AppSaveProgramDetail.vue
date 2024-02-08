<template>
  <ui-split-form
    :name="'saveProgramDetailForm'"
    @onsubmit="onSubmit"
    @remove="onRemove"
  >
    <ui-hidden-field :name="'id'" :value="id" />
    <ui-hidden-field :name="'parentId'" :value="parentId" />

    <ui-text-field
      :name="'nm'"
      :id="'programDetailNm'"
      :label="'프로그램 명'"
      :rules="'required|max:50'"
      :block="true"
      v-model="nm"
    />

    <ui-text-field
      :name="'method'"
      :id="'programDetailMethod'"
      :label="'요청 메소드'"
      :rules="'required|max:7'"
      :block="true"
      v-model="method"
    />

    <ui-text-field
      :name="'routePath'"
      :id="'programDetailRoutePath'"
      :label="'요청 URL ROUTE PATH'"
      :rules="'required|max:100'"
      :block="true"
      v-model="routePath"
    />

    <ui-text-field
      :name="'regDate'"
      :id="'programDetailRegDate'"
      :label="'프로그램 등록일시'"
      :readonly="true"
      :block="true"
      v-model="regDate"
    />

    <ui-text-field
      :name="'modDate'"
      :id="'programDetailModDate'"
      :label="'프로그램 수정일시'"
      :readonly="true"
      :block="true"
      v-model="modDate"
    />

    <ui-radio-group :label="'프로그램 사용 여부'">
      <ui-radio
        :id="'programDetailUseYn1'"
        :name="'useYn'"
        :label="'사용'"
        :value="'Y'"
        :rules="'required'"
        v-model="useYn"
      />
      <ui-radio
        :id="'programDetaillUseYn2'"
        :name="'useYn'"
        :label="'미사용'"
        :value="'N'"
        :rules="'required'"
        v-model="useYn"
      />
    </ui-radio-group>
  </ui-split-form>
</template>

<script>
import { messageUtil } from '@/utils';
import { isNotBlank } from '../../../utils';

export default {
  name: 'AppSaveProgram',
  props: {
    /** 프로그램 상세 정보 */
    programDetail: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      id: null,
      parentId: null,
      nm: '',
      method: '',
      routePath: '',
      regDate: '',
      modDate: '',
      useYn: '',
    }
  },
  created() {
    this.id = this.programDetail.id;
    this.parentId = this.programDetail.parentId;
    this.nm = this.programDetail.nm;
    this.method = this.programDetail.method;
    this.routePath = this.programDetail.routePath;
    this.useYn = this.programDetail.useYn;

    if (isNotBlank(this.programDetail.regDate)) {
      this.regDate = this.$moment(this.programDetail.regDate).format('YYYY-MM-DD HH:mm:ss');
    }

    if (isNotBlank(this.programDetail.modDate)) {
      this.modDate = this.$moment(this.programDetail.modDate).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  methods: {
    /** 프로그램 상세 저장 */
    async onSubmit(values) {
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?');
      if (!confirm) return;

      this.$http.post('/programdetail', values)
      .then(resp => {
        messageUtil.toastSuccess('저장되었습니다.');
        this.$emit('refreshDetail', resp.data);
      });
    },
    /** 프로그램 상세 삭제 */
    async onRemove(values) {
      const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?');
      if (!confirm) return;

      this.$http.delete(`/programdetail/${values.id}`)
      .then(async resp => {
        messageUtil.toastSuccess('삭제되었습니다.');
        this.$emit('refreshDetail', resp.data);
      });
    },
  },
}
</script>

<style lang="scss" scoped>

</style>