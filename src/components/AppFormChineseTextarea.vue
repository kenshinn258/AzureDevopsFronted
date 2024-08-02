<template>
  <n-input
    :type="textarea ? 'textarea' : 'text'"
    show-count
    :autosize="
      textarea
        ? {
            minRows: 3,
          }
        : null
    "
    :count-graphemes="countChineseWord"
    no-today
    v-bind="$attrs"
    @input="(e) => $emit('count', getCount(e))"
  ></n-input>
</template>
<script setup>
import { times } from "lodash-es";

const props = defineProps({
  textarea: {
    type: Boolean,
    default: () => true,
  },
});
defineEmits(["count"]);
const count = ref({ cn: 0, en: 0, total: 0 });
const countChineseWord = (value) => {
  return (
    times(value.length, (num) => value.charCodeAt(num)).reduce(
      (result, code) => {
        if (code > 127) {
          result.count += 2;
        } else {
          if (code == 10 && result.preCode != 13) {
            result.count += 1;
          }
          result.count += 1;
        }
        result.preCode = code;
        return result;
      },
      {
        count: 0,
        preCode: null,
      }
    ).count / 2
  );
};
const getCount = (e) => {
  count.value = { cn: 0, en: 0, total: 0 };
  const patternCn = new RegExp("[\u4E00-\u9FA5]+");
  for (let i = 0; i < e.length; i++) {
    if (patternCn.test(e[i])) {
      count.value.cn += 1;
    } else {
      count.value.en += 1;
    }
  }
  count.value.total = count.value.cn + count.value.en;
  return count.value;
};
</script>
