<template>
  <div class="p-4">
    <!-- 월 이동 -->
    <div class="d-flex align-items-center justify-content-center gap-3 mb-3">
      <button class="btn btn-sm btn-outline-secondary" @click="prevMonth">
        &lt;
      </button>
      <span class="fw-bold fs-5"
        >{{ year }}.{{ String(month).padStart(2, '0') }}</span
      >
      <button class="btn btn-sm btn-outline-secondary" @click="nextMonth">
        &gt;
      </button>
    </div>

    <!-- 요일 헤더 -->
    <div class="d-grid mb-1" style="grid-template-columns: repeat(7, 1fr)">
      <span
        v-for="day in days"
        :key="day"
        class="text-center fw-semibold py-2"
        :class="
          day === '일'
            ? 'text-danger'
            : day === '토'
              ? 'text-primary'
              : 'text-secondary'
        "
        style="font-size: 13px"
        >{{ day }}</span
      >
    </div>

    <!-- 날짜 셀 -->
    <div class="d-grid gap-2" style="grid-template-columns: repeat(7, 1fr)">
      <div
        v-for="cell in calendarCells"
        :key="cell.date"
        class="rounded-3 p-2 calendar-cell"
        :class="{ 'today-cell': cell.isToday }"
        :style="!cell.isCurrentMonth ? 'opacity: 0.35;' : ''"
      >
        <span
          class="date-number"
          :class="
            cell.isToday
              ? 'today-badge'
              : !cell.isCurrentMonth
                ? 'text-secondary'
                : ''
          "
          >{{ cell.day }}</span
        >

        <div v-if="cell.isCurrentMonth">
          <div v-if="cell.income > 0" class="transaction-item income-item">
            +{{ formatAmount(cell.income) }}
          </div>
          <div v-if="cell.expense > 0" class="transaction-item expense-item">
            -{{ formatAmount(cell.expense) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const year = ref(today.getFullYear());
const month = ref(today.getMonth() + 1);
const transactions = ref([]);

const days = ['일', '월', '화', '수', '목', '금', '토'];

// 날짜별 거래 합계 맵 { 'YYYY-MM-DD': { income, expense } }
const txByDate = computed(() => {
  const map = {};
  for (const tx of transactions.value) {
    const dateKey = tx.date.slice(0, 10);
    if (!map[dateKey]) map[dateKey] = { income: 0, expense: 0 };
    if (tx.type === 'income') map[dateKey].income += tx.amount;
    else map[dateKey].expense += tx.amount;
  }
  return map;
});

const calendarCells = computed(() => {
  const firstDay = new Date(year.value, month.value - 1, 1).getDay();
  const lastDate = new Date(year.value, month.value, 0).getDate();
  const prevLastDate = new Date(year.value, month.value - 1, 0).getDate();

  const cells = [];

  // 이전 달 빈 칸
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      date: `prev-${i}`,
      day: prevLastDate - i,
      isCurrentMonth: false,
      isToday: false,
      income: 0,
      expense: 0,
    });
  }

  // 현재 달
  for (let d = 1; d <= lastDate; d++) {
    const dateKey = `${year.value}-${String(month.value).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const tx = txByDate.value[dateKey] ?? { income: 0, expense: 0 };
    cells.push({
      date: dateKey,
      day: d,
      isCurrentMonth: true,
      isToday: dateKey === todayStr,
      income: tx.income,
      expense: tx.expense,
    });
  }

  // 다음 달 빈 칸
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({
      date: `next-${d}`,
      day: d,
      isCurrentMonth: false,
      isToday: false,
      income: 0,
      expense: 0,
    });
  }

  return cells;
});

function formatAmount(amount) {
  if (amount >= 10000)
    return (amount / 10000).toFixed(amount % 10000 === 0 ? 0 : 1) + '만';
  return amount.toLocaleString('ko-KR');
}

function prevMonth() {
  if (month.value === 1) {
    year.value--;
    month.value = 12;
  } else month.value--;
}

function nextMonth() {
  if (month.value === 12) {
    year.value++;
    month.value = 1;
  } else month.value++;
}

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/transactions');
    transactions.value = data;
  } catch (e) {
    console.error('거래 내역을 불러올 수 없습니다:', e.message);
  }
});
</script>

<style scoped>
.calendar-cell {
  min-height: 90px;
  background: #fff;
  transition: box-shadow 0.2s;
}

.today-cell {
  background: #fffbf0 !important;
  box-shadow:
    0 0 0 2px #f5a623,
    0 0 12px rgba(245, 166, 35, 0.3);
  animation: today-pulse 2.5s ease-in-out infinite;
}

@keyframes today-pulse {
  0%,
  100% {
    box-shadow:
      0 0 0 2px #f5a623,
      0 0 10px rgba(245, 166, 35, 0.25);
  }
  50% {
    box-shadow:
      0 0 0 2px #f5a623,
      0 0 18px rgba(245, 166, 35, 0.55);
  }
}

.date-number {
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
}

.today-badge {
  background: #f5a623;
  color: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}

.transaction-item {
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  padding: 1px 4px;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.income-item {
  background: #e8f5e9;
  color: #2e7d32;
}

.expense-item {
  background: #fce4ec;
  color: #c62828;
}
</style>
