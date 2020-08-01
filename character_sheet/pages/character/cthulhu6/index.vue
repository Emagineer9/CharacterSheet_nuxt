<template>
<v-row>
  <v-col cols="12">
    <v-row justify="center">
      <v-col :cols="tabColNum()">
        <v-tabs :vertical="is_vertical()" :color="color" :centered="!is_vertical()">
          <v-tab>探索者シート</v-tab>
          <v-tab>探索者の履歴</v-tab>
          <v-tab>変更履歴</v-tab>
          <v-tab-item>
            <CocCharacter/>
          </v-tab-item>
          <v-tab-item>
            <CocPersonalData/>
          </v-tab-item>
          <v-tab-item>
            c
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>

<script>
import CocCharacter from '@/components/organisms/coc6_character.vue'
import CocPersonalData from '@/components/organisms/coc_personal_data.vue'

export default {
  data () {
      return {
        color: "#3E1900",
        innerWidth: 0,
      }
  },
  mounted() {
    this.calculateWindowWidth()
    window.addEventListener('resize', this.calculateWindowWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateWindowWidth);
  },
  components: {
    CocCharacter,
    CocPersonalData,
  },
  methods: {
    is_vertical() {
      return this.innerWidth > 600
    },
    calculateWindowWidth() {
      this.innerWidth = window.innerWidth
    },
    tabColNum(){
      if(this.is_vertical()){
        return 10
      } else {
        return 12
      }
    }
  }
}

</script>
