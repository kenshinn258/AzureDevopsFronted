// 只處理0-99
export const useNumberConvertToChinese = num => {
  const myNum = computed(() => unref(Number(num)) ?? '')
  const myStringNum = computed(() => String(myNum.value))
  const upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  const resultNumber = ref('')
  const strLength = computed(() => myStringNum.value.length)
  if (strLength.value === 1) {
    resultNumber.value = upperCaseNumber[myNum.value]
  } else if (strLength.value === 2) {
    if (myNum.value === 10) {
      resultNumber.value = '十'
    } else if (myNum.value > 10 && myNum.value < 20) {
      resultNumber.value = `十${upperCaseNumber[myStringNum.value.charAt(1)]}`
    } else {
      resultNumber.value = `${upperCaseNumber[myStringNum.value.charAt(0)]}十${upperCaseNumber[myStringNum.value.charAt(1)].replace('零', '')}`
    }
  }
  return resultNumber.value
}
