<template>
    <v-form
        ref="character_form"
    >
      <v-row>
        <v-col cols="11"></v-col>
        <v-col cols="1">
          <v-btn class="ma-1" small outlined color="indigo" @click.stop="submit()">
            保存
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mx-5">
        <v-col cols="8">
          <!-- 基本情報 -->
          <v-row class="mx-3">
            <v-col cols="12">
              <TextSmall
                v-model="this.characterData.personal_items.full_name"
                :label="'探索者名'"
                :required="false"
                :placeholder="''"
                @change="changeItem(item)"
              />
            </v-col>
            <v-col cols="12">
              <TextSmall v-model="personal_items.job_name" :label="'職業'" :required="false" :placeholder="''" @change="changeItem(item)" />
            </v-col>
            <v-col cols="12">
              <TextSmall v-model="personal_items.degree" :label="'学校・学位'" :required="false" :placeholder="''" @change="changeItem(item)" />
            </v-col>
            <v-col cols="12">
              <TextSmall v-model="personal_items.graduate" :label="'出身'" :required="false" :placeholder="''" @change="changeItem(item)" />
            </v-col>
            <v-col cols="6">
              <TextSmall v-model="personal_items.sexuality" :label="'性別'" :required="false" :placeholder="''" @change="changeItem(item)" />
            </v-col>
            <v-col cols="6">
              <NumberTextSmall v-model="personal_items.age" :label="'年齢'" :required="false" :placeholder="''" @change="changeItem(item)" />
            </v-col>
          </v-row>
          <!--  -->
        </v-col>

        <v-col cols="4" style="background-color: #8FEBDA;">
          <!-- 画像 -->
        </v-col>
      </v-row>

      <v-container>
        <v-expansion-panels
          :readonly="false"
          :multiple="true"
          :focusable="true"
          :flat="true"
          :hover="true"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>能力値</v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-simple-table class="ability_table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center">STR</th>
                        <th class="text-center">DEX</th>
                        <th class="text-center">INT</th>
                        <th class="text-center">CON</th>
                        <th class="text-center">APP</th>
                        <th class="text-center">POW</th>
                        <th class="text-center">SIZ</th>
                        <th class="text-center">EDU</th>
                        <th class="text-center">幸運</th>
                        <th class="text-center">ｱｲﾃﾞｱ</th>
                        <th class="text-center">HP</th>
                        <th class="text-center">MP</th>
                        <th class="text-center">SAN</th>
                        <th class="text-center">知識</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in ability_items" :key="item.name">
                        <td><NumberTextSmall v-model="item.str" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/></td>
                        <td><NumberTextSmall v-model="item.dex" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/></td>
                        <td><NumberTextSmall v-model="item.int" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/></td>
                        <td><NumberTextSmall v-model="item.con" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/></td>
                        <td><NumberTextSmall v-model="item.app" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/></td>
                        <td><NumberTextSmall v-model="item.pow" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/></td>
                        <td><NumberTextSmall v-model="item.siz" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/></td>
                        <td><NumberTextSmall v-model="item.edu" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/></td>
                        <td><NumberTextSmall v-model="item.luck" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" :disabled="is_ability_data(item)"/></td>
                        <td><NumberTextSmall v-model="item.idea" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" :disabled="is_ability_data(item)"/></td>
                        <td><NumberTextSmall v-model="item.hp" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" :disabled="is_ability_data(item)"/></td>
                        <td><NumberTextSmall v-model="item.mp" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" :disabled="is_ability_data(item)"/></td>
                        <td><NumberTextSmall v-model="item.san" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" :disabled="is_ability_data(item)"/></td>
                        <td><NumberTextSmall v-model="item.knowledge" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" :disabled="is_ability_data(item)"/></td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </template>
                </v-simple-table>

            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>探索者の技能</v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-data-table
                  :headers="skill_headers"
                  :items="skill_items"
                  hide-default-footer
                  class="elevation my-2"
                >
                  <template v-slot:item.job_point="{ item }">
                    <template v-if="is_editing">
                      <div style="width: 43px; margin: 0">
                        <NumberTextSmall v-model="item.job_point" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" />
                      </div>
                    </template>
                    <template v-else>
                      {{item.job_point}}
                    </template>
                  </template>

                  <template v-slot:item.interest_point="{ item }">
                    <template v-if="is_editing">
                      <div style="width: 43px; margin: 0">
                        <NumberTextSmall v-model="item.interest_point" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/>
                      </div>
                    </template>
                    <template v-else>
                      {{item.interest_point}}
                    </template>
                  </template>

                  <template v-slot:item.growth_point="{ item }">
                    <template v-if="is_editing">
                      <div style="width: 43px; margin: 0">
                        <NumberTextSmall v-model="item.growth_point" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/>
                      </div>
                    </template>
                    <template v-else>
                      {{item.growth_point}}
                    </template>
                  </template>

                  <template v-slot:item.etc_point="{ item }">
                    <template v-if="is_editing">
                      <div style="width: 43px; margin: 0">
                        <NumberTextSmall v-model="item.etc_point" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/>
                      </div>
                    </template>
                    <template v-else>
                      {{item.etc_point}}
                    </template>
                  </template>

                  <template v-slot:item.skill_point="{ item }">
                      {{item_sum(item)}}
                  </template>

                </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>武器</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div style="margin: 10px">
                ダメージボーナス：<span style="margin: 10px">{{cal_damage_bonus()}}</span>
              </div>

              <v-data-table
                  :headers="weapon_headers"
                  :items="weapon_items"
                  hide-default-footer
                  class="elevation my-2 weapon_table"
                >
                  <template v-slot:item.weapon_name="{ item }">
                    <template v-if="is_editing">
                      <div style="width: 150px; margin: 0">
                        <TextSmall v-model="item.weapon_name" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" />
                      </div>
                    </template>
                    <template v-else>
                      {{item.weapon_name}}
                    </template>
                  </template>

                  <template v-slot:item.weapon_button="{ item }">
                    <template v-if="is_editing">
                      <v-btn class="ma-1" small icon color="indigo" @click.stop="delete_weapon(item)">
                        <v-icon>{{ delete_icon }}</v-icon>
                      </v-btn>
                    </template>
                  </template>

              </v-data-table>

              <div class="text-right">
                <v-btn class="ma-2" small outlined color="indigo" @click.stop="add_weapon()">追加</v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>


          <v-expansion-panel>
            <v-expansion-panel-header>所持品・財産</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                  :headers="belongings_headers"
                  :items="belongings_items"
                  hide-default-footer
                  class="elevation my-2"
                >
                  <template v-slot:item.belongings_name="{ item }">
                    <template v-if="is_editing">
                      <div style="margin: 0">
                        <TextSmall v-model="item.belongings_name" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" />
                      </div>
                    </template>
                    <template v-else>
                      {{item.belongings_name}}
                    </template>
                  </template>

                  <template v-slot:item.belongings_price="{ item }">
                    <template v-if="is_editing">
                      <div style="width: 100px; margin: 0">
                        <NumberTextSmall v-model="item.belongings_price" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/>
                      </div>
                    </template>
                    <template v-else>
                      {{item.belongings_price}}
                    </template>
                  </template>

                  <template v-slot:item.belongings_number="{ item }">
                    <template v-if="is_editing">
                      <div style="width: 100px; margin: 0">
                        <NumberTextSmall v-model="item.belongings_number" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/>
                      </div>
                    </template>
                    <template v-else>
                      {{item.belongings_number}}
                    </template>
                  </template>

                  <template v-slot:item.belongings_remark="{ item }">
                    <template v-if="is_editing">
                      <div style="margin: 0">
                        <TextSmall v-model="item.belongings_remark" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" />
                      </div>
                    </template>
                    <template v-else>
                      {{item.belongings_remark}}
                    </template>
                  </template>

                  <template v-slot:item.belongings_button="{ item }">
                    <template v-if="is_editing">
                        <v-btn class="ma-1" small icon color="indigo" @click.stop="delete_belonging(item)">
                          <v-icon>{{ delete_icon }}</v-icon>
                        </v-btn>
                    </template>
                  </template>

              </v-data-table>

              <div class="text-right">
                <v-btn class="ma-2" small outlined color="indigo" @click.stop="add_belonging()">追加</v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>アーティファクト／呪文</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                  :headers="artifacts_headers"
                  :items="artifacts_items"
                  hide-default-footer
                  class="elevation my-2"
                >
                  <template v-slot:item.artifacts_name="{ item }">
                    <template v-if="is_editing">
                      <div style="margin: 0">
                        <TextSmall v-model="item.artifacts_name" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" />
                      </div>
                    </template>
                    <template v-else>
                      {{item.artifacts_name}}
                    </template>
                  </template>

                  <template v-slot:item.artifacts_number="{ item }">
                    <template v-if="is_editing">
                      <div style="width: 100px; margin: 0">
                        <NumberTextSmall v-model="item.artifacts_number" :label="''" :required="false" :placeholder="''" @change="changeItem(item)"/>
                      </div>
                    </template>
                    <template v-else>
                      {{item.artifacts_number}}
                    </template>
                  </template>

                  <template v-slot:item.artifacts_remark="{ item }">
                    <template v-if="is_editing">
                      <div style="margin: 0">
                        <TextSmall v-model="item.artifacts_remark" :label="''" :required="false" :placeholder="''" @change="changeItem(item)" />
                      </div>
                    </template>
                    <template v-else>
                      {{item.artifacts_remark}}
                    </template>
                  </template>

                  <template v-slot:item.artifacts_button="{ item }">
                    <template v-if="is_editing">
                        <v-btn class="ma-1" small icon color="indigo" @click.stop="delete_artifacts(item)">
                          <v-icon>{{ delete_icon }}</v-icon>
                        </v-btn>
                    </template>
                  </template>

              </v-data-table>

              <div class="text-right">
                <v-btn class="ma-2" small outlined color="indigo" @click.stop="add_artifacts()">追加</v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

        </v-expansion-panels>
      </v-container>
    </v-form>
</template>

<script>
import { mdiDelete } from '@mdi/js'
import { mapGetters, mapActions } from 'vuex'
import NumberText from '@/components/molecules/number_text.vue'
import NumberTextSmall from '@/components/molecules/number_text_small.vue'
import TextSmall from '@/components/molecules/text_small.vue'

export default {
  data(){
    return {
      delete_icon: mdiDelete,
      is_editing: true,
      editedIndex: -1,
      skill_headers: [
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
      weapon_headers: [
        { text: '武器', value: 'weapon_name', align: 'start', sortable: false },
        { text: '％', value: 'weapon_hit_rate' },
        { text: 'ダメージ', value: 'weapon_damage' },
        { text: '故障', value: 'break_number' },
        { text: '射程', value: 'weapon_range' },
        { text: '攻撃回数', value: 'number_of_attacks' },
        { text: '装弾数', value: 'weapon_capacity' },
        { text: '耐久力', value: 'weapon_durability' },
        { text: '', value: 'weapon_button' },
      ],
      belongings_headers: [
        { text: '名称', value: 'belongings_name', align: 'start', sortable: false },
        { text: '価格', value: 'belongings_price' },
        { text: '個数', value: 'belongings_number' },
        { text: '備考', value: 'belongings_remark' },
        { text: '', value: 'belongings_button' },
      ],
      artifacts_headers: [
        { text: '名称', value: 'artifacts_name', align: 'start', sortable: false },
        { text: '個数', value: 'artifacts_number' },
        { text: '備考', value: 'artifacts_remark' },
        { text: '', value: 'artifacts_button' },
      ],
    }
  },
  components: {
    NumberText,
    NumberTextSmall,
    TextSmall
  },
  computed: {
    personal_items: {
      get(){
        return this.characterData.personal_items
      },
      set(value){

      },
    },
    ability_items: {
      get(){
        return this.characterData.ability_items
      },
      set(value){

      },
    },
    skill_items: {
      get(){
        return this.characterData.skill_items
      },
      set(value){

      },
    },
    weapon_items: {
      get(){
        return this.characterData.weapon_items
      },
      set(value){

      },
    },
    belongings_items: {
      get(){
        return this.characterData.belongings_items
      },
      set(value){
      },
    },
    artifacts_items: {
      get(){
        return this.characterData.artifacts_items
      },
      set(value){
      },
    },
    ...mapGetters('coc6_info', ['characterData']),
  },
  methods: {
    submit() {
      if (this.$refs.character_form.validate()) {
        this.success = true;
        var saveData = {
          systemId: 'coc6',
          // ability_items: this.ability_items,
          // personal_items: this.personal_items,
          // skill_items: this.skill_items,
          // weapon_items: this.weapon_items,
          // belongings_items: this.belongings_items,
          // artifacts_items: this.artifacts_items,
        }
        this.$store.dispatch('user_info/create_character', saveData)
      } else {
        this.success = false;
      }
    },
    // 能力値
    is_ability_data(item) {
      return item.name === 'ability'
    },
    // 探索者の技能
    item_sum(item) {
      return item.skill_initial_point + item.job_point + item.interest_point + item.growth_point + item.etc_point;
    },
    // 武器
    cal_damage_bonus() {
      return 0;
    },
    add_weapon(){
      const add_id = this.weapon_items.length + 1;
      this.weapon_items.push(
        {
          id: add_id,
          weapon_name: 'こぶし',
          weapon_hit_rate: 50,
          weapon_damage: '1D6 + db',
          break_number: '',
          weapon_range: 'タッチ',
          number_of_attacks: 1,
          weapon_capacity: '',
          weapon_durability: '-'
        }
      );
    },
    delete_weapon(item){
      const newArray = this.weapon_items.filter(x => x.id !== item.id);
      this.weapon_items = newArray;
    },
    // 所持品・財産
    add_belonging(){
      const add_id = this.belongings_items.length + 1;
      this.belongings_items.push({
          id: add_id,
          belongings_name: '',
          belongings_price: 0,
          belongings_number: 0,
          belongings_remark: ''
      });
    },
    delete_belonging(item){
      const newArray = this.belongings_items.filter(x => x.id !== item.id);
      this.belongings_items = newArray;
    },
    // アーティファクト／呪文
    add_artifacts(){
      const add_id = this.artifacts_items.length + 1;
      this.artifacts_items.push({
          id: add_id,
          artifacts_name: '',
          artifacts_number: 0,
          artifacts_remark: ''
      });
    },
    delete_artifacts(item){
      const newArray = this.artifacts_items.filter(x => x.id !== item.id);
      this.artifacts_items = newArray;
    },
  }
}
</script>

<style>
.weapon_table td{
  padding: 0;
  text-align: center;
}

.ability_table th, .ability_table td {
  padding: 0 8px;
}
</style>
