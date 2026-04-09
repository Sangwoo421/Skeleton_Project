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
    fix: '',
  });
}
</script>

<template>
  <div class="tx-card p-4">
    <!-- 수입 지출  -->
    <div class="d-flex bg-light rounded-3 p-1 mb-4">
      <button
        class="toggle-btn flex-fill rounded-3 py-2"
        :class="{ active: form.type === 'income' }"
        @click="setType('income')"
      >
        수입
      </button>
      <button
        class="toggle-btn flex-fill rounded-3 py-2"
        :class="{ active: form.type === 'expense' }"
        @click="setType('expense')"
      >
        지출
      </button>
    </div>

    <!-- 기본 정보 -->
    <p
      class="text-uppercase text-secondary mb-2"
      style="font-size: 11px; font-weight: 500; letter-spacing: 0.05em"
    >
      기본 정보
    </p>

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

    <!-- 내용 -->
    <div class="mb-3">
      <label class="form-label field-label">거래명</label>
      <input
        type="text"
        class="form-control field-input"
        :value="form.title"
        @input="update('title', $event.target.value)"
      />
    </div>

    <!-- 카테고리  -->
    <template v-if="form.type === 'expense'">
      <p
        class="text-uppercase text-secondary mb-2"
        style="font-size: 11px; font-weight: 500; letter-spacing: 0.05em"
      >
        카테고리
      </p>
      <CategoryGrid
        :categories="filteredCategories"
        :model-value="form.categoryId"
        @update:model-value="update('categoryId', $event)"
      />
    </template>

    <!-- 추가 정보 -->
    <p
      class="text-uppercase text-secondary mb-2"
      style="font-size: 11px; font-weight: 500; letter-spacing: 0.05em"
    >
      추가 정보
    </p>
    <div class="mb-3">
      <label class="form-label field-label">메모</label>
      <textarea
        class="form-control field-input"
        rows="3"
        :value="form.memo"
        @input="update('memo', $event.target.value)"
      />
    </div>

    <!-- 정기 일정  -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <span style="font-size: 12px; color: #555"
        >정기 일정으로 등록 하시겠습니까?</span
      >
      <div
        class="toggle-switch"
        :class="{ on: isRecurring }"
        @click="$emit('update:isRecurring', !isRecurring)"
      >
        <div class="toggle-knob"></div>
      </div>
    </div>

    <!-- 버튼 -->
    <div class="d-flex gap-2">
      <button
        class="btn btn-outline-secondary flex-fill"
        @click="$emit('cancel')"
      >
        취소
      </button>
      <button
        class="btn btn-outline-primary flex-fill flex-grow-1"
        @click="$emit('submit')"
      >
        저장하기
      </button>
    </div>
  </div>
</template>
