<template>
  <div class="app">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-left">
        <div class="logo">
          <!-- 替换为您自己的 LOGO 图片/文字 -->
          <img src="@/assets/logo.png" alt="PancakeSwap Logo" />
        </div>
        <!-- 导航菜单 -->
        <nav class="menu">
          <a href="#">Board</a>
          <a href="#">Create Token</a>
        </nav>
      </div>
      <div class="header-right">
        <!-- BNB Chain -->
        <div class="chain-label">BNB Chain</div>
        <!-- Connect Wallet 按钮 -->
        <button class="connect-btn">Connect Wallet</button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- Tab 导航 -->
      <div class="tabs">
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'progress' }" 
          @click="activeTab = 'progress'"
        >
          Progress Ranking
        </div>
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'gainers' }" 
          @click="activeTab = 'gainers'"
        >
          24 Hours Gainers Ranking
        </div>
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'marketcap' }" 
          @click="activeTab = 'marketcap'"
        >
          MarketCap Ranking
        </div>
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'tradingvolume' }" 
          @click="activeTab = 'tradingvolume'"
        >
          24 Hours Trading Volume
        </div>
      </div>

      <!-- 表格 -->
      <div class="table-container">
        <table class="ranking-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Token Name</th>
              <th>Market Cap</th>
              <th>Raised Token</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(item) in tableData" 
              :key="item.tokenName"
            >
              <td>{{ item.rank }}</td>
              <td class="token-name">
                <img class="token-icon" src="@/assets/image.png" alt="token-icon" />
                <span>{{ item.tokenName }}</span>
              </td>
              <td>{{ formatMarketCap(item.marketCap) }}</td>
              <td>
                <span class="raised-token">
                  <img 
                    alt="BNB" 
                    class="mini-icon"
                    src="@/assets/image.png"
                  />
                  {{ item.raisedToken }}
                </span>
              </td>
              <td>
                <div class="progress-bar">
                  <div 
                    class="progress-bar-inner" 
                    :style="{ width: item.progress + '%' }"
                  ></div>
                </div>
                <span class="progress-value">
                  {{ item.progress.toFixed(3) }}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path></svg>
        <span class="page-index">{{ currentPage }}</span>
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></svg>
      </div>
    </main>
    <TokenListView/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TokenListView from '@/components/TokenListView.vue'

// 当前激活的 Tab
const activeTab = ref('progress')
// 当前页码
const currentPage = ref(1)
// 模拟表格数据
const tableData = ref([
  {
    rank: 1,
    tokenName: 'PENGU',
    marketCap: 33202.617,
    raisedToken: 'BNB',
    progress: 98.421
  },
  {
    rank: 2,
    tokenName: 'Chill 2025',
    marketCap: 33757.861,
    raisedToken: 'USDT',
    progress: 98.156
  },
  {
    rank: 3,
    tokenName: 'ZEREBRO',
    marketCap: 26479.919,
    raisedToken: 'BNB',
    progress: 98.107
  },
  {
    rank: 4,
    tokenName: 'GENESIS',
    marketCap: 24509.021,
    raisedToken: 'BNB',
    progress: 97.992
  },
  {
    rank: 5,
    tokenName: 'Holy Year Mascot',
    marketCap: 33551.106,
    raisedToken: 'BNB',
    progress: 97.34
  }
])

// 市值格式化函数
function formatMarketCap(value) {
  // 这里简单演示，实际可根据需要做更复杂的格式化
  return `$${value.toLocaleString()}`
}

function onPrevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function onNextPage() {
  currentPage.value++
}
</script>

<style scoped>
/* 重置一些默认样式，方便演示 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

.app {
  min-height: 100vh;
  background-color: #f6f9fc; /* 背景色可根据实际需求调整 */
}

/* 顶部导航 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo img {
  height: 48px;
  margin-right: 1rem;
}

.menu a {
  margin-right: 1rem;
  text-decoration: none;
  color: #6d6d6d;
  font-weight: 500;
}

.menu a:hover {
  color: #111111;
}

.header-right {
  display: flex;
  align-items: center;
}

.chain-label {
  margin-right: 1rem;
  font-weight: 600;
  color: #5c5c5c;
}

.connect-btn {
  background-color: #7350ff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
}

.connect-btn:hover {
  background-color: #5d3eff;
}

/* 主内容区 */
.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Tabs */
.tabs {
  width: 850px;
  height: 40px;
  display: flex;
  margin-bottom: 1rem;
  background: #edeaf3;
  border-radius: 40px;
  align-items: center;
  justify-content: space-between;
}

.tab-item {
  height: 100%;
  cursor: pointer;
  color: rgb(122 110 170);
  padding: 0 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-item.active {
  background: rgba(122 110 170);
  color: #fff;
  border-radius: 40px;
}

/* 表格容器 */
.table-container {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #eee;
  overflow: hidden;
  margin-bottom: 1rem;
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 20px;
}

.ranking-table thead {
  background-color: #fff;
  border-bottom: 1px solid rgb(231 227 235);
  height: 55px;
}

.ranking-table th,
.ranking-table td {
  height: 55px;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
}

.ranking-table th {
  color: #888;
  font-weight: 600;
}

/* 行分割线 */
.ranking-table tbody tr {
  border-bottom: 1px solid #eee;
}

/* token name & icon */
.token-name {
  display: flex;
  align-items: center;
}
.token-icon {
  width: 24px;
  height: 24px;
  object-fit: cover;
  margin-right: 0.5rem;
}

/* Raised Token 图标 */
.raised-token {
  display: inline-flex;
  align-items: center;
}
.mini-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

/* 进度条 */
.progress-bar {
  background-color: #f0f0f0;
  width: 120px;
  height: 8px;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;
  position: relative;
}
.progress-bar-inner {
  background-color: #7350ff;
  height: 100%;
  border-radius: 4px;
}
.progress-value {
  font-size: 0.85rem;
  color: #666;
  vertical-align: middle;
}

/* 分页 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination svg {
  width: 15px;
  margin: 0 15px;
  height: 15px;
}

.page-btn {
  color: #666;
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  margin: 0 0.5rem;
  border-radius: 4px;
}
.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-index {
  font-weight: 600;
  color: #333;
}
</style>
