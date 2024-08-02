<template>
    <app-title>商業會員申請</app-title>
    <app-form ref="formRef" :model="model">
        <app-form-row label="角色">
            <app-form-item path="engUnit">
                <app-form-select v-model:value="model.engUnit" :options="[]" />
            </app-form-item>
        </app-form-row>
        <div class="flex justify-between">
            <app-form-row label="統編" required>
                <app-form-item path="engUnit">
                    <n-input v-model:value="model.engUnit" />
                </app-form-item>
            </app-form-row>
            <app-form-row label="信用卡" required>
                <app-form-item path="engUnit">
                    <n-input v-model:value="model.engUnit" />
                </app-form-item>
            </app-form-row>
        </div>
        <div class="flex justify-between">
            <app-form-row label="聯絡人" required>
                <app-form-item path="engUnit">
                    <n-input v-model:value="model.engUnit" />
                </app-form-item>
            </app-form-row>
            <app-form-row label="金融帳號" required>
                <app-form-item path="engUnit">
                    <n-input v-model:value="model.engUnit" />
                </app-form-item>
            </app-form-row>
        </div>
        <div class="flex justify-between">
            <app-form-row label="公司連絡電話" required>
                <app-form-item path="engUnit">
                    <n-input v-model:value="model.engUnit" />
                </app-form-item>
            </app-form-row>
            <app-form-row label="公司行號" required>
                <app-form-item path="engUnit">
                    <n-input v-model:value="model.engUnit" />
                </app-form-item>
            </app-form-row>
        </div>
        <app-form-row label="公司連絡信箱" required>
            <app-form-item path="engUnit">
                <n-input v-model:value="model.engUnit" />
            </app-form-item>
        </app-form-row>
        <app-form-row label="公司相關營業證明 (JPG, PNG, PDF，上限10M)" required>
            <app-form-item path="engUnit">
                <app-form-item-upload style="width: 100%;" v-model:file-list="model.files" file-path="files"
                    accept=".jpg,.png,.pdf" :max="1" />
            </app-form-item>
        </app-form-row>
        <app-form-item path="engUnit">
            <n-checkbox-group v-model:value="commitments">
                <n-checkbox :value="1">用戶申請開通成為商業會員，需同意以下條款 : <a href="#">上架內容條款</a>（著作權保證、內容使用：不負保存責任）、<a
                        href="#">廣告條款</a>&<a href="#">個資使用提示</a></n-checkbox>
            </n-checkbox-group>
        </app-form-item>
        <template #action>
            <div class="w-52">
                <app-button @click="handleNext" :fit="false">送出</app-button>
            </div>
        </template>
    </app-form>
</template>

<script setup>
const model = ref({})
</script>
