<template>
  <a
    :href="resolvedHref"
    :target="resolvedHref === VOID_HREF ? '_self' : '_blank'"
    :title="fileParams?.length > 0 ? '下載檔案' : undefined"
    rel="noopener noreferrer"
    v-bind="$attrs"
  >
    <div class="inline-flex flex-row">
      <slot v-if="fileExt" name="icon">
        <n-icon class="self-center mr-2">
          <icon-fa-file-word-o v-if="['doc', 'docx'].includes(toLower(fileExt))" />
          <icon-fa-file-excel-o v-else-if="['xls', 'xlsx'].includes(toLower(fileExt))" />
          <icon-fa-file-pdf-o v-else-if="'pdf' === toLower(fileExt)" />
          <icon-ant-design-file-gif-outlined v-else-if="'gif' === toLower(fileExt)" />
          <icon-teenyicons-png-outline v-else-if="'png' === toLower(fileExt)" />
          <icon-teenyicons-jpg-outline v-else-if="['jpg', 'jpeg'].includes(toLower(fileExt))" />
          <icon-fa-file-o v-else />
        </n-icon>
      </slot>
      <slot />
    </div>
  </a>
</template>

<script setup>
import { forEach, isEmpty, isNil, toLower } from 'lodash-es'

const VOID_HREF = 'javascript:void(0);'

const props = defineProps({
  fileType: {
    type: String,
    default: () => null,
  },
  name: {
    type: String,
    default: () => null,
  },
  fileId: {
    type: [String, Number],
    default: () => null,
  },
  fileKey: {
    type: String,
    default: () => null,
  },
  href: {
    type: String,
    default: () => null,
  },
  fileExt: {
    type: String,
    default: () => null,
  },
})

const fileParams = computed(() =>
  [
    { name: 'fileType', value: props.fileType },
    { name: 'name', value: props.name },
    { name: 'fileID', value: props.fileId },
    { name: 'key', value: props.fileKey },
  ].filter(param => !isNil(param.value)),
)
const resolvedHref = computed(() => {
  if (!isNil(props.href) && !isEmpty(props.href)) {
    return props.href
  }
  const fileParamValue = toValue(fileParams)
  if (fileParamValue?.length > 0) {
    const url = new URL('/downloadSysFile', window.location.href)
    forEach(fileParamValue, param => url.searchParams.set(param.name, param.value))
    return url.toString()
  } else {
    return VOID_HREF
  }
})
</script>
