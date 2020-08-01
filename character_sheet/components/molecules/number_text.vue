<template>
    <v-text-field
      v-model.number="input"
      :label="label"
      :rules="inputRules"
      :placeholder="placeholder_str"
      :disabled="is_disabled"
      type="number"
    ></v-text-field>
</template>

<script>
export default {
  props:{
    value: {
      type: Number,
      required: true
    },
    label:{
      type: String,
      required: true
    },
    required: {
      required: true
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  computed: {
    input: {
      get () {
        return this.value
      },
      set (input) {
        this.$emit('input', input)
      }
    },
    label_string: {
      get(){
        return this.label
      }
    },
    inputRules: {
      get(){
        var rules = [v => (!v || /[+-]?\d+/.test(v))]
        if(this.required){
          rules.push(v => !!v)
        }
        return rules
      }
    },
    placeholder_str: {
      get () {
        return this.placeholder
      }
    },
    is_disabled: {
      get() {
        return this.disabled
      }
    }
  }
}
</script>

<style>
.v-text-field .v-label--active {
    transform: scale(0.75) translate(-20%, -150%);
}
</style>
