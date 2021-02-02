<template>
  <AppInput
    :type="type"
    v-on="$listeners"
    @input.native="handleInput"
    :value="inputValue"
    v-bind="attrs"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date'
    },
    valueAsNumber: {
      type: Number
    },
    valueAsDate: {
      type: Date
    },
    value: {}
  },

  model: {
    prop: 'value',
    event: 'input'
  },

  computed: {
    inputValueAttr() {
      return (
        this.$props.valueAsNumber && 'valueAsNumber' ||
        this.$props.valueAsDate && 'valueAsDate' || 'value'
      )
    },
    inputValue() {
      let date = new Date(this.$props[this.inputValueAttr])
      let type = this.$props.type

      let YYYY = date.getUTCFullYear()
      let MM = (date.getUTCMonth() + 1).toString().padStart(2, '0')
      let DD = date.getUTCDate().toString().padStart(2, '0')
      let hh = date.getUTCHours().toString().padStart(2, '0')
      let mm = date.getUTCMinutes().toString().padStart(2, '0')
      let ss = date.getUTCSeconds().toString().padStart(2, '0')
      let dateValue = `${YYYY}-${MM}-${DD}`
      let timeValue = `${hh}:${mm}`
      let timeWithSecondsValue = `${hh}:${mm}:${ss}`
      let datetimeValue = `${dateValue}T${timeValue}`

      if (type === 'date') {
        return dateValue
      } else if (type === 'time') {
        return this.$attrs.step === 1
          ? timeWithSecondsValue
          : timeValue
      } else if (type === 'datetime-local') {
        return datetimeValue
      }
    },
    attrs() {
      return { ...this.$attrs, ...this.$props }
    }
  },

  methods: {
    handleInput(e) {
      this.$emit('update:valueAsNumber', e.target.valueAsNumber)
      this.$emit('update:valueAsDate', new Date(e.target.valueAsNumber))
      this.$emit('input', e.target.value)
    }
  }
};
</script>

<style scoped></style>
