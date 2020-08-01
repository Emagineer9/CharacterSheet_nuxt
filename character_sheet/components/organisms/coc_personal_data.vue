<template>
    <v-form
        ref="character_form"
    >
      <v-container>
        <v-expansion-panels
          :readonly="false"
          :multiple="true"
          :focusable="true"
          :flat="true"
          :hover="true"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              能力値
            </v-expansion-panel-header>
            <v-expansion-panel-content>
            </v-expansion-panel-content>
          </v-expansion-panel>

        </v-expansion-panels>
      </v-container>
    </v-form>
</template>

<script>
import NumberText from '@/components/molecules/number_text.vue'
import NumberTextSmall from '@/components/molecules/number_text_small.vue'

export default {
  data(){
    return {
      is_editing: true,
      item: {
        disabled: false,
        hp: 0,
        required: true
      },
      headers: [
        {
          text: '技能',
          align: 'start',
          sortable: false,
          value: 'skill_name',
        },
        { text: '初期値', value: 'skill_initial_point' },
        { text: '職業P', value: 'job_point' },
        { text: '興味P', value: 'interest_point' },
        { text: '成長P', value: 'growth_point' },
        { text: 'その他', value: 'etc_point' },
        { text: '合計', value: 'skill_point' },
      ],
      desserts: [
        {
          skill_name: '回避',
          skill_initial_point: 30,
          job_point: 6,
          interest_point: 24,
          growth_point: 4.0,
          etc_point: 1,
        },
        {
          skill_name: 'キック',
          skill_initial_point: 30,
          job_point: 6.0,
          interest_point: 24,
          growth_point: 4.0,
          etc_point: 1,
        },
        {
          skill_name: '組み付き',
          skill_initial_point: 30,
          job_point: 6.0,
          interest_point: 24,
          growth_point: 4.0,
          etc_point: 1,
        },
        {
          skill_name: 'こぶし（パンチ）',
          skill_initial_point: 30,
          job_point: 6.0,
          interest_point: 24,
          growth_point: 4.0,
          etc_point: 1,
        },
        {
          skill_name: '頭突き',
          skill_initial_point: 30,
          job_point: 6.0,
          interest_point: 24,
          growth_point: 4.0,
          etc_point: 1,
        }
      ],
      editedIndex: -1,
    }
  },
  components: {
    NumberText,
    NumberTextSmall
  },
  methods: {
    submit() {
      if (this.$refs.character_form.validate()) {
        this.success = true;
      } else {
        this.success = false;
      }
    },
  }
}
</script>
