<script setup>
defineProps({
  form: { type: Object, required: true },
  selectedCategory: { type: Object, default: null },
});
</script>

<template>
  <div class="tx-card p-4" style="position: sticky; top: 20px">
    <p class="fw-500 mb-3" style="font-size: 13px">미리보기</p>

    <!-- 금액 -->
    <div
      class="preview-amount"
      :style="{ color: form.type === 'income' ? '#1D9E75' : '#A32D2D' }"
    >
      {{ form.type === 'income' ? '+' : '-' }}
      {{
        form.amount ? Number(form.amount).toLocaleString('ko-KR') + '원' : '0원'
      }}
    </div>

    <!-- 날짜/내용/카테고리 -->
    <div class="d-flex flex-column">
      <div
        class="d-flex justify-content-between align-items-center py-2 border-bottom"
      >
        <span class="pr-key">날짜</span>
        <span class="pr-val">{{ form.date || '-' }}</span>
      </div>

      <div
        class="d-flex justify-content-between align-items-center py-2 border-bottom"
      >
        <span class="pr-key">거래명</span>
        <span class="pr-val">{{ form.title || '-' }}</span>
      </div>

      <div
        class="d-flex justify-content-between align-items-center py-2 border-bottom"
      >
        <span class="pr-key">카테고리</span>
        <span class="pr-val">
          <template v-if="selectedCategory">
            <img
              :src="selectedCategory.image"
              :alt="selectedCategory.name"
              class="preview-cat-img"
              @error="$event.target.style.display = 'none'"
            />
            <span
              class="preview-cat-dot"
              :style="{
                background: form.type === 'income' ? '#1D9E75' : '#D85A30',
              }"
            ></span>
            {{ selectedCategory.name }}
          </template>
          <template v-else>-</template>
        </span>
      </div>

      <div
        class="d-flex justify-content-between align-items-center py-2 border-bottom"
      >
        <span class="pr-key">메모</span>
        <span class="pr-val">{{ form.memo || '-' }}</span>
      </div>

      <div class="d-flex justify-content-between align-items-center py-2">
        <span class="pr-key">구분</span>
        <span
          class="pr-val"
          :style="{ color: form.type === 'income' ? '#1D9E75' : '#A32D2D' }"
        >
          {{ form.type === 'income' ? '수입' : '지출' }}
        </span>
      </div>
    </div>
  </div>
</template>
