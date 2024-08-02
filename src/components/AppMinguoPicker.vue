<template>
  <vue-date-picker
    v-model="model"
    menu-class-name="app-minguo-picker"
    :format="formatMinguo"
    :format-locale="zhTW"
    select-text="確定"
    cancel-text="關閉"
    six-weeks="center"
    year-first
    auto-apply
    time-picker-inline
    :teleport="true"
    :enable-time-picker="false"
    v-bind="bindAttrs"
  >
    <template #year="{ value: yearValue, year }">
      {{ ((yearValue ?? year) || new Date().getFullYear()) - 1911 }}
    </template>
    <template #year-overlay-value="{ value: yearValue }"> {{ yearValue - 1911 }} </template>
  </vue-date-picker>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { zhTW } from 'date-fns/locale'
import { filter, has, isArray, isDate, isEmpty, isNil, isString, join, map } from 'lodash-es'
import {
  customFormatMinguoDate,
  customParseMinguoDate,
  formatMinguoDate,
  formatMinguoDateTime,
  formatMinguoYearMonth,
  parseMinguoDate,
  parseMinguoDateTime,
  parseMinguoYearMonth,
} from '@/utils/date'

const props = defineProps({
  value: {
    type: [String, Array],
    default: () => undefined,
  },
  duration: {
    type: Array,
    default: () => undefined,
  },
  pattern: {
    type: String,
    default: undefined,
  },
})
const emits = defineEmits(['update:value'])
const attrs = useAttrs()
const bindAttrs = computed(() => {
  const toBind = {}
  const nowDate = new Date()
  toBind['min-date'] = new Date(2008, 0, 1)
  toBind['year-range'] = [Math.min(nowDate.getFullYear() - 36, 2008), nowDate.getFullYear() + 10]
  if (isArray(props.duration) && filter(props.duration, isDate)?.length === 2) {
    toBind['min-date'] = props.duration[0]
    toBind['max-date'] = props.duration[1]
    toBind['start-date'] = props.duration[0]
    toBind['year-range'] = props.duration.map(date => date.getFullYear())
  } else {
    toBind['start-date'] = attrs['min-date'] ?? attrs['max-date']
  }
  if (has(attrs, 'range') && attrs.range !== false) {
    toBind['multi-calendars'] = { solo: true, static: true, count: 2 }
  }
  return {
    ...toBind,
    ...attrs,
  }
})
const modeFormat = computed(() => {
  if (attrs['month-picker'] === '' || attrs['month-picker'] === true) {
    return value => {
      if (isDate(value)) {
        return isNil(props.pattern) ? formatMinguoYearMonth(value) : customFormatMinguoDate(value, props.pattern)
      }
      const { year, month } = value
      return isNil(props.pattern)
        ? formatMinguoYearMonth(new Date(year, month, 1))
        : customFormatMinguoDate(value, props.pattern)
    }
  } else if (attrs['enable-time-picker'] === '' || attrs['enable-time-picker'] === true) {
    return value => {
      if (isDate(value)) {
        return isNil(props.pattern)
          ? formatMinguoDateTime(value, attrs['enable-seconds'] === '' || attrs['enable-seconds'] === true)
          : customFormatMinguoDate(value, props.pattern)
      }
      const { year, month, day, hours, minutes, seconds } = value
      const dateValue = new Date(year, month, day, hours, minutes, seconds)
      return isNil(props.pattern) ? formatMinguoDateTime(dateValue) : customFormatMinguoDate(dateValue, props.pattern)
    }
  }
  return isNil(props.pattern) ? formatMinguoDate : param => customFormatMinguoDate(param, props.pattern)
})
const modeParse = computed(() => {
  if (attrs['month-picker'] === '' || attrs['month-picker'] === true) {
    return value => {
      const dateValue = isDate(value)
        ? value
        : isNil(props.pattern)
          ? parseMinguoYearMonth(value)
          : customParseMinguoDate(value, props.pattern)
      return {
        year: dateValue.getFullYear(),
        month: dateValue.getMonth(),
      }
    }
  } else if (attrs['enable-time-picker'] === '' || attrs['enable-time-picker'] === true) {
    return value =>
      isDate(value)
        ? value
        : isNil(props.pattern)
          ? parseMinguoDateTime(value, attrs['enable-seconds'] === '' || attrs['enable-seconds'] === true)
          : customParseMinguoDate(value, props.pattern)
  }
  return value =>
    isDate(value) ? value : isNil(props.pattern) ? parseMinguoDate(value) : customParseMinguoDate(value, props.pattern)
})
const model = computed({
  get: () => {
    if (isArray(props.value) && filter(props.value, item => !isNil(item) && !isEmpty(item)).length > 0) {
      return map(props.value, date => {
        return modeParse.value(date)
      })
    } else if (isString(props.value) && !isEmpty(props.value)) {
      return modeParse.value(props.value)
    }
    return null
  },
  set: value => {
    emits(
      'update:value',
      isNil(value)
        ? null
        : isArray(value)
          ? map([...value], date => {
              return modeFormat.value(date)
            })
          : modeFormat.value(value),
    )
  },
})
const formatMinguo = dates => {
  return join(
    map(isArray(dates) ? dates : [dates], date => {
      return modeFormat.value(date)
    }),
    ' - ',
  )
}
</script>

<style>
.app-minguo-picker .dp__action_button {
  width: 39px;
}
.app-minguo-picker .dp__active_date,
.app-minguo-picker .dp__action_select,
.app-minguo-picker .dp__overlay_cell_active,
.app-minguo-picker .dp__range_start,
.app-minguo-picker .dp__range_end {
  background-color: theme('colors.primary.06');
}
.app-minguo-picker .dp__today {
  border-color: theme('colors.primary.06');
}
.app-minguo-picker .dp__input {
  height: 34px;
}

.app-minguo-picker .dp__input.dp__disabled {
  color: rgba(194, 194, 194, 1);
  background-color: rgb(250, 250, 252);
}

.app-minguo-picker .dp--tp-wrap,
.app-minguo-picker .dp--tp-wrap .dp__flex {
  width: 100%;
  max-width: 100%;
}

.n-form-item-blank--error .dp__input {
  border-color: theme('colors.red.02');
  border-width: 1px;
}
</style>
