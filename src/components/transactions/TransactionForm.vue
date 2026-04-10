<template>
  <div class="tx-card p-4">
    <!-- 수입 / 지출 토글 -->
    <div class="d-flex gap-2 mb-4">
      <button
        class="toggle-btn flex-fill"
        :class="{ active: form.type === 'expense' }"
        @click="setType('expense')"
      >
        지출
      </button>
      <button
        class="toggle-btn flex-fill"
        :class="{ active: form.type === 'income' }"
        @click="setType('income')"
      >
        수입
      </button>
    </div>

    <!-- 기본 정보 -->

    <div class="row g-2 mb-3">
      <div class="col-6">
        <label class="form-label field-label">날짜</label>
        <input
          type="date"
          class="form-control field-input"
          :value="form.date"
          @input="update('date', $event.target.value)"
        />
      </div>
      <div class="col-6">
        <label class="form-label field-label">금액</label>
        <div class="position-relative">
          <input
            type="number"
            class="form-control field-input pe-4"
            placeholder="0"
            :value="form.amount"
            @input="update('amount', $event.target.value)"
          />
          <span class="amount-unit">원</span>
        </div>
      </div>
    </div>

    <!-- 정기 지출 토글 -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <span style="font-size: 16px; font-weight: 700; color: black">
        {{ form.type === 'expense' ? '고정 지출' : '고정 수입' }}
      </span>
      <div
        class="toggle-switch"
        :class="{ on: isRecurring }"
        @click="$emit('update:isRecurring', !isRecurring)"
      >
        <div class="toggle-knob"></div>
      </div>
    </div>
    <!-- 거래명 -->
    <div class="mb-3">
      <label class="form-label field-label">거래명</label>
      <input
        type="text"
        class="form-control field-input"
        :value="form.title"
        @input="update('title', $event.target.value)"
      />
    </div>

    <!-- 카테고리 (지출일 때만) -->
    <template v-if="form.type === 'expense'">
      <p class="section-label">카테고리</p>
      <CategoryGrid
        :categories="filteredCategories"
        :model-value="form.categoryId"
        @update:model-value="update('categoryId', $event)"
      />
    </template>

    <!-- 추가 정보 -->

    <div class="mb-3">
      <label class="form-label field-label">메모</label>
      <textarea
        class="form-control field-input"
        rows="3"
        :value="form.memo"
        @input="update('memo', $event.target.value)"
      />
    </div>

    <!-- 버튼 -->
    <div class="d-flex gap-2">
      <button class="btn-cancel-custom" @click="$emit('cancel')">취소</button>
      <button class="btn-save-custom" @click="$emit('submit')">저장</button>
    </div>
  </div>
</template>
<script setup>
import CategoryGrid from '@/components/transactions/CategoryGrid.vue';

const props = defineProps({
  form: { type: Object, required: true },
  filteredCategories: { type: Array, default: () => [] },
  isRecurring: { type: Boolean, default: false },
});
const emit = defineEmits([
  'update:form',
  'update:isRecurring',
  'submit',
  'cancel',
]);

function update(key, val) {
  emit('update:form', { ...props.form, [key]: val });
}
function setType(type) {
  emit('update:form', {
    ...props.form,
    type,
    amount: '',
    memo: '',
    categoryId: '',
    title: '',
    fix: false,
  });
}
</script>
