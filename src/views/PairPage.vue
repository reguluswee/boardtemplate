<template>
    <div class="pair-page">
      <!-- ======= 顶部区域：Token 信息、价格、创建者、涨幅等 ======= -->
      <div class="pair-header">
        <div class="pair-header-left">
          <h2 class="pair-title">
            {{ tokenName }} / {{ quoteSymbol }}
          </h2>
          <div class="pair-subinfo">
            <span>Market Cap: {{ marketCap }}</span>
            <span>Virtual Liquidity: {{ virtualLiquidity }}</span>
            <span>Volume: {{ volume }}</span>
          </div>
          <div class="pair-subinfo">
            <span>CA {{ contractAddr }}</span>
            <span>Price: {{ price }} {{ quoteSymbol }}</span>
            <span class="rise">Rise +{{ risePercent }}%</span>
          </div>
          <div class="created-by">
            Created by <span>{{ createdByShort }}</span>
          </div>
        </div>
        <!-- 右侧可放一些 Logo 或者留白 -->
        <div class="pair-header-right">
          <!-- 可以放 Token Logo 之类的，或者留空 -->
        </div>
      </div>
  
      <!-- ======= 中间区域：左侧图表 + 右侧交互面板 ======= -->
      <div class="pair-body">
        <!-- 左侧：图表 & 时间选择 -->
        <div class="chart-section">
          <!-- 时间按钮组 -->
          <div class="timeframe-buttons">
            <button 
              v-for="(item, idx) in timeframeOptions" 
              :key="idx"
              :class="{ active: item.value === currentTimeframe }"
              @click="currentTimeframe = item.value"
            >
              {{ item.label }}
            </button>
          </div>
  
          <!-- 图表：此处用占位图模拟 -->
          <div class="chart-placeholder">
            <div class="chart-details">
              <div class="chart-time">Time: {{ chartInfo.time }}</div>
              <div>Open: {{ chartInfo.open }}</div>
              <div>High: {{ chartInfo.high }}</div>
              <div>Low: {{ chartInfo.low }}</div>
              <div>Close: {{ chartInfo.close }}</div>
              <div>Volume: {{ chartInfo.volume }}</div>
            </div>
            <!-- 占位图 -->
            <img
              src="https://via.placeholder.com/600x300?text=Chart+Placeholder"
              alt="chart placeholder"
            />
          </div>
        </div>
  
        <!-- 右侧：买卖面板 + Token 简介 + Bonding Curve -->
        <div class="side-panel">
          <!-- MEV protection + Buy/Sell tabs -->
          <div class="mev-protection">
            <span>MEV protection</span>
            <label class="switch">
              <input type="checkbox" v-model="mevProtection" />
              <span class="slider round"></span>
            </label>
          </div>
  
          <div class="buy-sell-toggle">
            <button 
              :class="{ active: currentTab === 'buy' }"
              @click="currentTab = 'buy'"
            >
              Buy
            </button>
            <button 
              :class="{ active: currentTab === 'sell' }"
              @click="currentTab = 'sell'"
            >
              Sell
            </button>
          </div>
  
          <div class="order-panel">
            <label>Available: {{ tokenBalance }}</label>
            <div class="token-switch">
              <button>25 %</button>
              <button>50 %</button>
              <button>75 %</button>
              <button>100 %</button>
            </div>
            <!-- Token输入/交易交互示例，这里仅用按钮示范 -->
            <button class="connect-wallet-btn">Connect Wallet</button>
          </div>
  
          <!-- Token信息卡 -->
          <div class="token-info-card">
            <div class="token-avatar">
              <!-- 占位头像 -->
              <img
                src="https://via.placeholder.com/100?text=PENGU"
                alt="token avatar"
              />
            </div>
            <h3 class="token-name">PENGU</h3>
            <div class="token-category">Meme</div>
            <!-- 社交按钮示例 -->
            <div class="social-links">
              <button>
                <svg height="18" width="18" viewBox="0 0 24 24">
                  <path
                    fill="#666"
                    d="M22.46 6c-.77.35-1.6.59-2.46.7a4.28 4.28 0 001.88-2.37 8.6 8.6 0 01-2.71 1.03A4.27 4.27 0 0015.66 4a4.28 4.28 0 00-4.17 5.26 12.14 12.14 0 01-8.8-4.46 4.28 4.28 0 001.32 5.7 4.26 4.26 0 01-1.94-.54v.06a4.28 4.28 0 003.44 4.19 4.24 4.24 0 01-1.12.15c-.27 0-.55-.03-.81-.08a4.29 4.29 0 004 2.97 8.59 8.59 0 01-5.31 1.84c-.34 0-.68-.02-1.02-.06a12.1 12.1 0 006.57 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.46 8.46 0 0024 4.56a8.39 8.39 0 01-2.4.66z"
                  ></path>
                </svg>
              </button>
              <button>
                <svg height="18" width="18" viewBox="0 0 24 24">
                  <path
                    fill="#666"
                    d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.4 2.87 8.13 6.84 9.46.5.09.68-.21.68-.47 0-.23-.01-.82-.01-1.61-2.78.6-3.37-1.33-3.37-1.33-.45-1.16-1.1-1.47-1.1-1.47-.9-.6.07-.59.07-.59 1 .07 1.53 1.03 1.53 1.03.88 1.51 2.3 1.07 2.86.82.09-.64.34-1.07.62-1.31-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.62 0 0 .84-.27 2.75 1.02a9.52 9.52 0 015 0c1.9-1.29 2.74-1.02 2.74-1.02.56 1.36.22 2.37.11 2.62.64.7 1.02 1.59 1.02 2.68 0 3.86-2.35 4.69-4.59 4.94.35.3.66.91.66 1.83 0 1.32-.01 2.39-.01 2.72 0 .26.18.57.69.47 3.98-1.33 6.84-5.06 6.84-9.46 0-5.5-4.46-9.96-9.96-9.96z"
                  ></path>
                </svg>
              </button>
            </div>
  
            <div class="token-description">
              <h4>Description</h4>
              <p>
                PENGU, with a $2.53B market cap on Solana, is launching on BSC.
                Stay tuned. Our official... 
                <a href="#">Expand</a>
              </p>
            </div>
  
            <div class="bonding-curve">
              <div class="label">
                Bonding Curve Progress: {{ (bondingProgress * 100).toFixed(2) }}%
              </div>
              <div class="progress-bar">
                <div 
                  class="progress-bar-inner"
                  :style="{ width: (bondingProgress * 100) + '%' }"
                ></div>
              </div>
              <p class="bonding-tip">
                There are <strong>16,043,232 PENGU</strong> still available for sale in the
                bonding curve and there is <strong>1516474 BNB</strong> in the bonding curve.
                <br>
                When the market cap reaches <strong>$204,217.20</strong> all the liquidity from
                the bonding curve will be deposited into PancakeSwap and locked.
              </p>
              <div class="supply-info">
                <div>Total Supply: 1,000,000,000</div>
                <div>Holder</div>
                <div>Percentage</div>
              </div>
              <div class="lp-info">
                <strong>9550762b (Liquidity Pool Token)</strong> &nbsp; 1%
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- ======= 底部区域：Comments / Trades tab ======= -->
      <div class="bottom-section">
        <div class="bottom-tabs">
          <button 
            :class="{ active: bottomTab === 'comments' }"
            @click="bottomTab = 'comments'"
          >
            Comments
          </button>
          <button 
            :class="{ active: bottomTab === 'trades' }"
            @click="bottomTab = 'trades'"
          >
            Trades
          </button>
        </div>
        <div class="tab-content">
          <!-- 如果是评论 -->
          <div v-if="bottomTab === 'comments'" class="comments-container">
            <div 
              v-for="(comment, idx) in comments" 
              :key="idx"
              class="comment-item"
            >
              <div class="comment-header">
                <span class="comment-address">{{ comment.address }}</span>
                <span class="comment-time">{{ comment.time }}</span>
              </div>
              <div class="comment-body">
                <a :href="comment.link" target="_blank">{{ comment.link }}</a>
                <p>{{ comment.content }}</p>
              </div>
            </div>
          </div>
  
          <!-- 如果是交易 -->
          <div v-else class="trades-container">
            <div 
              v-for="(trade, idx) in trades" 
              :key="idx"
              class="trade-item"
            >
              <div class="trade-header">
                <span class="trade-address">{{ trade.address }}</span>
                <span class="trade-time">{{ trade.time }}</span>
              </div>
              <div class="trade-body">
                <p>
                  <strong>{{ trade.type.toUpperCase() }}</strong> 
                  {{ trade.amount }} {{ tokenName }} at {{ trade.price }} {{ quoteSymbol }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // —— 模拟基础信息 —— //
  const tokenName = ref('PENGU')
  const quoteSymbol = ref('BNB')
  const marketCap = ref('$31.27K')
  const virtualLiquidity = ref('$165K')
  const volume = ref('$834.54')
  const contractAddr = ref('0x6a...1de99')
  const price = ref('0.00000000450')
  const risePercent = ref(13975)
  const createdBy = ref('0x42aea21f')
  const createdByShort = computed(() => {
    const val = createdBy.value
    // 简单截断 0x42...aea21f
    if (val.length > 10) {
      return val.slice(0,4) + '...' + val.slice(-6)
    } 
    return val
  })
  
  // —— 时间选择、图表信息 —— //
  const timeframeOptions = ref([
    { label: '1 min', value: '1m' },
    { label: '5 mins', value: '5m' },
    { label: '15 mins', value: '15m' },
    { label: '1 hr', value: '1h' },
    { label: '4 hrs', value: '4h' },
    { label: '1 day', value: '1d' }
  ])
  const currentTimeframe = ref('1m')
  // 示例图表信息
  const chartInfo = ref({
    time: '2025-01-08 11:00',
    open: '0.07|445200',
    high: '0.07|450003',
    low: '0.07|442520',
    close: '0.07|455003',
    volume: '0.01'
  })
  
  // —— 右侧交互面板 —— //
  const mevProtection = ref(false)
  const currentTab = ref('buy')
  const tokenBalance = ref('0')
  
  // —— Bonding Curve 相关 —— //
  const bondingProgress = ref(0.9838)
  
  // —— 底部 tabs: Comments / Trades —— //
  const bottomTab = ref('comments')
  
  // 模拟评论
  const comments = ref([
    {
      address: '0x0c..5484cc',
      time: '3 hours ago',
      link: 'https://springboard.pancakeswap.finance/bsc/token/0xcf21a49...',
      content: '非常好！'
    },
    {
      address: '0x3d..16e549',
      time: '14 hours ago',
      link: '',
      content: 'LairsBar（LRS） 私募火热开启，够真Web3链接未来... 🎉'
    },
    {
      address: '0x2c..0b99a7',
      time: '1 day ago',
      link: '',
      content: '全网最强项目工具 TGTokenTool首个支持springboard 刷交易量...'
    }
  ])
  
  // 模拟交易
  const trades = ref([
    {
      address: '0x12..abcd',
      time: '2 hours ago',
      type: 'buy',
      amount: '100,000',
      price: '0.00000000470'
    },
    {
      address: '0x56..efgh',
      time: '6 hours ago',
      type: 'sell',
      amount: '50,000',
      price: '0.00000000468'
    }
  ])
  </script>
  
  <style scoped>
  /* —— 重置一些默认 —— */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }
  a {
    text-decoration: none;
    color: #7350ff;
  }
  
  /* 页面容器 */
  .pair-page {
    background-color: #f8f9fc;
    min-height: 100vh;
    padding: 1rem;
  }
  
  /* 顶部区域：Token 信息 */
  .pair-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    border: 1px solid #eee;
  }
  .pair-header-left {
    display: flex;
    flex-direction: column;
  }
  .pair-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  .pair-subinfo {
    display: flex;
    gap: 1rem;
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
  .rise {
    color: #17ac33;
    font-weight: 600;
  }
  .created-by {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #555;
  }
  .created-by span {
    color: #7350ff;
    font-weight: 600;
  }
  .pair-header-right {
    /* 可添加项目 Logo 或空白 */
    width: 80px;
    height: 80px;
  }
  
  /* 中间区域布局 */
  .pair-body {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  /* 左侧图表部分 */
  .chart-section {
    flex: 2; 
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #eee;
    padding: 1rem;
  }
  .timeframe-buttons {
    margin-bottom: 1rem;
  }
  .timeframe-buttons button {
    margin-right: 0.5rem;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    padding: 0.4rem 0.75rem;
    cursor: pointer;
    font-size: 0.85rem;
    color: #555;
  }
  .timeframe-buttons button.active {
    background-color: #7350ff;
    color: #fff;
  }
  .timeframe-buttons button:hover {
    background-color: #eae7ff;
    color: #7350ff;
  }
  .chart-placeholder {
    border: 1px dashed #ccc;
    border-radius: 6px;
    padding: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .chart-details {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    color: #444;
  }
  
  /* 右侧面板 */
  .side-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .mev-protection {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  /* Toggle开关 */
  .switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 20px;
    margin-left: 0.5rem;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider.round {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #ccc;
    border-radius: 34px;
    transition: .4s;
  }
  .slider.round:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    top: 3px;
    background-color: #fff;
    border-radius: 50%;
    transition: .4s;
  }
  input:checked + .slider.round {
    background-color: #7350ff;
  }
  input:checked + .slider.round:before {
    transform: translateX(16px);
  }
  
  /* Buy/Sell */
  .buy-sell-toggle {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    display: flex;
    overflow: hidden;
  }
  .buy-sell-toggle button {
    flex: 1;
    padding: 0.75rem 0;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    font-weight: 600;
    color: #555;
  }
  .buy-sell-toggle button.active {
    background-color: #7350ff;
    color: #fff;
  }
  .buy-sell-toggle button:hover {
    background-color: #e8e8e8;
  }
  
  /* Order Panel */
  .order-panel {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .order-panel label {
    font-size: 0.85rem;
    color: #333;
  }
  .token-switch {
    display: flex;
    gap: 0.5rem;
  }
  .token-switch button {
    flex: 1;
    padding: 0.3rem 0;
    border-radius: 4px;
    background-color: #f7f7f7;
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 0.8rem;
  }
  .connect-wallet-btn {
    background-color: #7350ff;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: 600;
  }
  .connect-wallet-btn:hover {
    background-color: #5f3dee;
  }
  
  /* Token Info Card */
  .token-info-card {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1rem;
  }
  .token-avatar {
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .token-avatar img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }
  .token-name {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
    font-weight: 600;
  }
  .token-category {
    text-align: center;
    font-size: 0.85rem;
    color: #777;
    margin-bottom: 0.5rem;
  }
  .social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .social-links button {
    background: none;
    border: none;
    cursor: pointer;
  }
  .token-description {
    font-size: 0.85rem;
    color: #555;
    margin-bottom: 1rem;
  }
  .token-description h4 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
    color: #333;
  }
  .token-description p {
    line-height: 1.4;
  }
  .bonding-curve {
    font-size: 0.85rem;
    color: #444;
  }
  .bonding-curve .label {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  .progress-bar {
    background-color: #eee;
    border-radius: 4px;
    width: 100%;
    height: 8px;
    margin-bottom: 0.5rem;
  }
  .progress-bar-inner {
    background-color: #7350ff;
    height: 8px;
    border-radius: 4px;
  }
  .bonding-tip {
    font-size: 0.75rem;
    margin: 0.5rem 0;
    color: #666;
    line-height: 1.4;
  }
  .supply-info {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  .lp-info {
    font-size: 0.85rem;
    color: #333;
    font-weight: 600;
  }
  
  /* 底部区域：Comments / Trades */
  .bottom-section {
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #eee;
    padding: 1rem;
  }
  .bottom-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .bottom-tabs button {
    background-color: #f0f0f0;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    color: #666;
    font-weight: 500;
  }
  .bottom-tabs button.active {
    background-color: #7350ff;
    color: #fff;
  }
  .bottom-tabs button:hover {
    background-color: #e5e2ff;
  }
  .tab-content {
    min-height: 120px;
  }
  
  /* 评论 / 交易列表 */
  .comment-item, .trade-item {
    background-color: #f9f9f9;
    border-radius: 6px;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
  }
  .comment-header, .trade-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #444;
    margin-bottom: 0.25rem;
  }
  .comment-body, .trade-body {
    font-size: 0.85rem;
    color: #555;
    line-height: 1.4;
  }
  
  /* 地址、时间等 */
  .comment-address, .trade-address {
    font-weight: 600;
    color: #7350ff;
  }
  .comment-time, .trade-time {
    font-size: 0.75rem;
    color: #999;
  }
  </style>
  