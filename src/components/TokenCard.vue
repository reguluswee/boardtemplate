<template>
    <div class="token-card">
      <!-- 主图片 -->
      <div class="card-image">
        <img :src="token.image" alt="token-image" />
      </div>
      <!-- 卡片内容 -->
      <div class="card-content">
        <!-- 第一行：标签 & 涨幅 -->
        <div class="top-row">
          <div class="tag">{{ token.tag }}</div>
          <div class="percent" :class="{'green': token.change >= 0, 'red': token.change < 0}">
            <!-- +1.9% / +0% / -2.4% -->
            <span>{{ token.change >= 0 ? '+' : ''}}{{ token.change }}%</span>
          </div>
        </div>
  
        <!-- 第二行：创建者 (address) -->
        <div class="creator">
          Created by: <span>{{ token.creatorShort }}</span>
        </div>
  
        <!-- Token名称 / 符号 -->
        <h3 class="token-name">
          {{ token.name }}
        </h3>
        <div class="token-symbol">
          ({{ token.symbol }})
        </div>
  
        <!-- 简介 -->
        <div class="token-desc">
          {{ token.description }}
        </div>
  
        <!-- 底部：市值等 -->
        <div class="bottom-row">
          <div class="market-cap-label">Market Cap: {{ formatMarketCap(token.marketCap) }}</div>
          <div class="chain-icon">
            <!-- 这里示意是 BNB，如果有其他链可以自行扩展 -->
            <img src="" alt="BNB Icon" v-if="token.chain === 'BNB'" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // 接收父组件传进来的 token 对象
  const props = defineProps({
    token: {
      type: Object,
      required: true
    }
  })
  
  // 市值格式化函数
  function formatMarketCap(cap) {
    // 简单示例：5.47K / 696.48
    if (cap >= 1000) {
      return (cap / 1000).toFixed(2) + ' K'
    }
    return cap.toFixed(2)
  }
  
  // 截断地址
  const creatorShort = computed(() => {
    const addr = props.token.creator
    if (!addr) return ''
    // 例如 0xabc...123
    return addr.slice(0, 5) + '...' + addr.slice(-3)
  })
  </script>
  
  <style scoped>
  .token-card {
    width: 260px; /* 卡片宽度可根据需求调整 */
    background-color: #fff;
    border-radius: 12px;
    border: 1px solid #eee;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    margin-right: 1.5rem; /* 卡片之间的间距，也可在父容器统一设置 */
    margin-bottom: 1.5rem;
  }
  
  /* 图片部分 */
  .card-image {
    width: 100%;
    height: 160px;
    overflow: hidden;
    background-color: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 卡片内容 */
  .card-content {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  /* 标签 & 百分比 */
  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .tag {
    background-color: #f2f2f2;
    color: #7c7c7c;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.75rem;
  }
  .percent {
    font-weight: 600;
  }
  .percent.green {
    color: #17ac33; /* 涨 */
  }
  .percent.red {
    color: #e13434; /* 跌 */
  }
  
  /* 创建者地址 */
  .creator {
    font-size: 0.75rem;
    color: #666;
    margin-bottom: 0.25rem;
  }
  .creator span {
    color: #7350ff;
  }
  
  /* 名称、符号 */
  .token-name {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0.25rem 0;
  }
  .token-symbol {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  /* 简介 */
  .token-desc {
    font-size: 0.85rem;
    color: #666;
    flex: 1; /* 占据剩余空间，让底部对齐 */
  }
  
  /* 底部：市场信息 */
  .bottom-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.75rem;
  }
  .market-cap-label {
    font-size: 0.85rem;
    color: #7c7c7c;
  }
  /* 链图标 */
  .chain-icon img {
    width: 18px;
    height: 18px;
  }
  </style>
  