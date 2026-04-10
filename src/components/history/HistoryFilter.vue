<template>
  <!-- 필터 영역 -->
  <div class="bg-white rounded-3 shadow-sm p-3 mb-3">
    <div class="d-flex flex-wrap align-items-center gap-3">
      <!-- 기간 -->
      <div class="d-flex align-items-center gap-2">
        <label class="fw-semibold text-secondary small mb-0">기간</label>
        <input
          type="date"
          class="form-control form-control-sm"
          style="width: 150px"
          :value="filters.startDate"
          :max="filters.endDate"
          @input="update('startDate', $event.target.value)"
        />
        <span class="text-secondary">~</span>
        <input
          type="date"
          class="form-control form-control-sm"
          style="width: 150px"
          :value="filters.endDate"
          :min="filters.startDate"
          @input="update('endDate', $event.target.value)"
        />
      </div>

      <div class="vr" />

      <!-- 구분 -->
      <div class="d-flex align-items-center gap-2">
        <label class="fw-semibold text-secondary small mb-0">구분</label>
        <select
          class="form-select form-select-sm"
          style="width: 100px"
          :value="filters.type"
          @change="update('type', $event.target.value)"
        >
          <option value="">전체</option>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
      </div>

      <div class="vr" />

      <!-- 카테고리 -->
      <div class="d-flex align-items-center gap-2">
        <label class="fw-semibold text-secondary small mb-0">카테고리</label>
        <select
          class="form-select form-select-sm"
          style="width: 120px"
          :value="filters.categoryId"
          @change="update('categoryId', $event.target.value)"
        >
          <option value="">전체</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- 메모 검색 -->
    <div class="input-group mt-3">
      <span class="input-group-text bg-white border-end-0">
        <i class="bi bi-search text-secondary" />
      </span>
      <input
        type="text"
        class="form-control border-start-0"
        placeholder="메모 검색..."
        :value="filters.keyword"
        @input="update('keyword', $event.target.value)"
      />
    </div>
  </div>

  <!-- 수입/지출 요약 카드 -->
  <div class="row g-3 mb-3">
    <div class="col-6">
      <div
        class="bg-white rounded-3 shadow-sm p-3 d-flex align-items-center gap-3"
      >
        <i class="bi bi-coin fs-3 text-success"></i>
        <div>
          <div class="text-secondary small">필터 내 수입</div>
          <div class="fw-bold text-success fs-5">
            {{ formatAmount(totalIncome) }}원
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div
        class="bg-white rounded-3 shadow-sm p-3 d-flex align-items-center gap-3"
      >
        <i class="bi bi-coin fs-3 text-danger"></i>
        <div>
          <div class="text-secondary small">필터 내 지출</div>
          <div class="fw-bold text-danger fs-5">
            {{ formatAmount(totalExpense) }}원
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  totalIncome: {
    type: Number,
    default: 0,
  },
  totalExpense: {
    type: Number,
    default: 0,
  },
});

const formatAmount = (amount) => amount.toLocaleString();

const emit = defineEmits(['update:filters']);

const update = (key, value) => {
  emit('update:filters', { ...props.filters, [key]: value });
};
</script>
