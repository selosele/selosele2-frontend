<template>
  <ui-split-form :name="'saveProgramForm'">
    <ui-text-field
      :name="'nm'"
      :id="'programNm'"
      :label="'프로그램 명'"
      :rules="'required|max:50'"
      :block="true"
      v-model="nm"
    />

    <ui-text-field
      :name="'method'"
      :id="'programMethod'"
      :label="'요청 메소드'"
      :rules="'required|max:7'"
      :block="true"
      v-model="method"
    />

    <ui-text-field
      :name="'routePath'"
      :id="'programRoutePath'"
      :label="'요청 URL ROUTE PATH'"
      :rules="'required|max:100'"
      :block="true"
      v-model="routePath"
    />

    <ui-text-field
      :name="'regDate'"
      :id="'programRegDate'"
      :label="'프로그램 등록일시'"
      :readonly="true"
      :block="true"
      v-model="regDate"
    />

    <ui-text-field
      :name="'modDate'"
      :id="'programModDate'"
      :label="'프로그램 수정일시'"
      :readonly="true"
      :block="true"
      v-model="modDate"
    />

    <ui-radio-group :label="'프로그램 사용 여부'">
      <ui-radio
        :id="'programUseYn1'"
        :name="'useYn'"
        :label="'사용'"
        :value="'Y'"
        :rules="'required'"
        v-model="useYn"
      />
      <ui-radio
        :id="'programUseYn2'"
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
      nm: '',
      method: '',
      routePath: '',
      regDate: '',
      modDate: '',
      useYn: '',
    }
  },
  created() {
    this.nm = this.programDetail.nm;
    this.method = this.programDetail.method;
    this.routePath = this.programDetail.routePath;
    this.regDate = this.programDetail.regDate;
    this.modDate = this.programDetail?.modDate;
    this.useYn = this.programDetail.useYn;
  },
}
</script>

<style lang="scss" scoped>

</style>