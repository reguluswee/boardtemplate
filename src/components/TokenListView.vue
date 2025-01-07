<template>
  <div class="token-list-page">
    <!-- 搜索 + 筛选 -->
    <div class="filter-bar">
      <!-- 搜索框 -->
      <div class="search-box">
        <div class="search-icon">
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path
              d="M11 18c3.866 0 7-3.134 7-7 0-3.866-3.134-7-7-7C7.134 4 4 7.134 4 11c0 3.866 3.134 7 7 7z"
              stroke="#7350ff"
            />
            <path d="M20 20l-2-2" stroke="#7350ff" stroke-linecap="round" />
          </svg>
        </div>
        <input type="text" placeholder="Search Token" v-model="searchKey" />
      </div>
      <div class="filter-right">
        <!-- Toggle：Listed on PancakeSwap -->
        <div class="listed-toggle">
          <span>Listed on PancakeSwap</span>
          <label class="switch">
            <input type="checkbox" v-model="isListed" />
            <span class="slider round"></span>
          </label>
        </div>

        <!-- 下拉选择器示例：All Tag / All Tokens / Time -->
        <div class="select-group">
          <select v-model="selectedTag">
            <option value="all">All Tag</option>
            <option value="meme">Meme</option>
            <option value="gamefi">GameFi</option>
          </select>
          <select v-model="selectedToken">
            <option value="all">All Tokens</option>
            <option value="bnb">BNB</option>
            <option value="usdt">USDT</option>
          </select>
          <select v-model="selectedTime">
            <option value="24h">24h</option>
            <option value="7d">7d</option>
            <option value="30d">30d</option>
          </select>
        </div>

        <!-- 右侧图标按钮：排序 & 刷新 -->
        <div class="icon-btn-group">
          <button class="icon-btn" @click="onSort">
            <svg
              fill="#FFF"
              viewBox="0 0 21 17"
              width="21"
              class="transition-transform"
            >
              <g>
                <path
                  d="M17.2974 12.6684L19.0757 10.8901C19.5165 10.4493 20.2292 10.4493 20.67 10.8901C21.1109 11.331 21.1109 12.0437 20.67 12.4845L17.0607 16.0925C16.9025 16.2953 16.6807 16.4387 16.4306 16.4982C15.8274 16.651 15.2148 16.2872 15.062 15.6841C15.0228 15.5299 15.0174 15.3703 15.0444 15.2135V1.12783C15.0444 0.505763 15.5488 0 16.1723 0C16.7957 0 17.3001 0.504411 17.3001 1.12783V12.6684H17.2974ZM1.12783 1.45373H10.8942C11.5163 1.45373 12.022 1.95814 12.022 2.58156C12.022 3.20497 11.5176 3.70938 10.8942 3.70938H1.12783C0.504411 3.70803 0 3.20362 0 2.5802C0 1.95679 0.504411 1.45373 1.12783 1.45373ZM1.12783 7.46474H10.8942C11.5163 7.44446 12.0383 7.93264 12.0585 8.5547C12.0788 9.17677 11.5906 9.69876 10.9686 9.71904C10.9442 9.71904 10.9185 9.71904 10.8942 9.71904H1.12783C0.505763 9.71904 0 9.21463 0 8.59122C0 7.9678 0.504411 7.46339 1.12783 7.46339V7.46474ZM1.12783 13.4758H10.8942C11.5163 13.4758 12.022 13.9802 12.022 14.6036C12.022 15.227 11.5176 15.7314 10.8942 15.7314H1.12783C0.505763 15.7314 0 15.227 0 14.6036C0 13.9802 0.504411 13.4758 1.12783 13.4758Z"
                ></path>
              </g>
            </svg>
          </button>
          <button class="icon-btn" @click="onRefresh">
            <svg fill="#FFF" viewBox="0 0 20 18" width="20" class="">
              <path
                d="M14.2679 14.9045C13.042 15.6592 11.6264 16.1304 10.2118 16.1304C6.06089 16.1304 2.75957 12.9228 2.75957 8.86678C2.75957 7.82849 2.94824 6.88622 3.41938 5.94282L3.51428 6.60264C3.60918 6.98 4.08032 7.16868 4.45767 7.07378C4.83503 6.97888 5.02371 6.50774 4.92881 6.13038L4.08032 3.58378C3.98542 3.20642 3.51428 3.01774 3.13692 3.11264L0.495421 4.05604C0.118063 4.15093 -0.0706155 4.62207 0.0242821 4.99943C0.118063 5.37679 0.590318 5.56546 0.967676 5.47057L2.00485 5.18811C1.43881 6.41396 1.06146 7.64093 1.06146 9.05546C1.06146 13.9611 5.11749 17.9222 10.1169 17.9222C11.9088 17.9222 13.6069 17.45 15.1163 16.5077C15.4937 16.2253 15.5875 15.753 15.3988 15.3756C15.1163 14.8096 14.6441 14.6209 14.2667 14.9034L14.2679 14.9045ZM19.9282 13.1126C19.7395 12.7353 19.3622 12.5466 18.9848 12.7353L18.1363 13.1126C18.891 11.7919 19.2684 10.3773 19.2684 8.8679C19.2673 3.96225 15.2112 0 10.2118 0C8.32503 0 6.62692 0.566036 5.11749 1.50943C4.74013 1.79301 4.64524 2.26414 4.83392 2.6415C5.11749 3.01886 5.58863 3.11264 5.96599 2.83018C7.19184 2.07547 8.60749 1.60433 10.1169 1.60433C14.2679 1.60433 17.5692 4.81187 17.5692 8.8679C17.5692 10.0938 17.2867 11.2258 16.7207 12.2641C16.7207 12.2641 16.7207 12.3579 16.6258 12.3579L16.3422 11.6032C16.1535 11.2258 15.7762 11.0371 15.3988 11.2258C15.0215 11.4145 14.8328 11.7919 15.0215 12.1692L16.0586 14.7158C16.2473 15.0932 16.6247 15.2819 17.002 15.0932L19.5486 14.056C19.926 13.8673 20.1147 13.49 19.926 13.1126H19.9282Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 卡片列表区域 -->
    <div class="cards-container">
      <TokenCard
        v-for="(token, index) in filteredTokens"
        :key="token.id"
        :token="token"
      />
    </div>
  </div>
</template>

  <script setup>
import { ref, computed } from "vue";
import TokenCard from "@/components/TokenCard.vue";

// 搜索关键词
const searchKey = ref("");
// 是否只看 “Listed on PancakeSwap”
const isListed = ref(false);
// 下拉选项
const selectedTag = ref("all");
const selectedToken = ref("all");
const selectedTime = ref("24h");

// 模拟的 Token 列表数据
const tokens = ref([
  {
    id: 1,
    image: "",
    name: "meexcoin",
    symbol: "mex",
    tag: "Meme",
    creator: "0xa3bfc...ab2faa",
    description: "cool coin",
    marketCap: 5470,
    change: 0,
    chain: "BNB",
  },
  {
    id: 2,
    image: "",
    name: "Elon Musk",
    symbol: "ELON",
    tag: "Meme",
    creator: "0x43d35...d3af44",
    description: "Musk baba",
    marketCap: 5470,
    change: 1.9,
    chain: "BNB",
  },
  {
    id: 3,
    image: "",
    name: "Whooptie Bunny",
    symbol: "Whooptie",
    tag: "Meme",
    creator: "0x3c21...376d71",
    description: "Whooptie",
    marketCap: 696.48,
    change: 1.9,
    chain: "BNB",
  },
  {
    id: 4,
    image: "",
    name: "BihterAlvin",
    symbol: "BA",
    tag: "Meme",
    creator: "0xdcf35...6845d6",
    description: "CATS ARE THE GREATEST",
    marketCap: 5600,
    change: 2.4,
    chain: "BNB",
  },
  {
    id: 5,
    image: "",
    name: "Bonk BNB cheap",
    symbol: "Bonkc",
    tag: "Meme",
    creator: "0x61bca...38df40",
    description:
      "This is for those who missed bonk here is bonk cheap, new pioneers,...",
    marketCap: 5470,
    change: 0,
    chain: "BNB",
  },
  // ... 可继续添加更多
]);

// 根据搜索关键字 & 下拉选项 & 是否 Listed 等过滤
const filteredTokens = computed(() => {
  return tokens.value.filter((token) => {
    // 搜索过滤
    const matchSearch =
      token.name.toLowerCase().includes(searchKey.value.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchKey.value.toLowerCase());

    // Listed 开关 (这里仅做示例，可以根据 isListed 的状态和 token 的真实字段匹配)
    const matchListed =
      !isListed.value || (isListed.value && token.id % 2 === 1);
    // 例如：这里假装 id 为奇数的表示“已上架”，您可换成 token.hasListed === true 之类的真实字段

    // Tag 过滤
    const matchTag =
      selectedTag.value === "all" ||
      token.tag.toLowerCase() === selectedTag.value.toLowerCase();

    // Token 过滤
    const matchChain =
      selectedToken.value === "all" ||
      token.chain.toLowerCase() === selectedToken.value.toLowerCase();

    return matchSearch && matchListed && matchTag && matchChain;
  });
});

// 排序/刷新示例
function onSort() {
  // 仅示例，按 change 排序
  tokens.value.sort((a, b) => b.change - a.change);
}
function onRefresh() {
  // 仅示例，简单重新洗牌
  tokens.value = tokens.value.sort(() => Math.random() - 0.5);
}
</script>

  <style scoped>
/* 页面整体容器 */
.token-list-page {
  width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  background-color: #f8f8fb; /* 或和您截图中的浅灰/浅紫一致 */
  min-height: 100vh;
}

/* 过滤/搜索栏整体 */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; /* 如果空间不足，就换行 */
  margin-bottom: 1rem;
}

.filter-right{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
}
/* 搜索框 */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 2rem;
}
.search-icon {
  position: absolute;
  left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-box input {
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  outline: none;
  width: 200px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}
.search-box input:focus {
  border-color: #7350ff;
}

/* Toggle: Listed on PancakeSwap */
.listed-toggle {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #555;
}
.listed-toggle .switch {
  margin-left: 0.5rem;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #7350ff;
}
input:checked + .slider:before {
  transform: translateX(18px);
}

/* 下拉选择器组 */
.select-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.select-group select {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 0.9rem;
  color: #555;
  cursor: pointer;
}
.select-group select:focus {
  border-color: #7350ff;
}

/* 右侧图标按钮组 */
.icon-btn-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: rgb(122 110 170);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-btn:hover {
  background-color: #e1e1e1;
}
.icon-btn img {
  width: 20px;
  height: 20px;
  color: #fff;
}

/* 卡片列表容器 */
.cards-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  /* 如果想做横向滚动，可以改为：
       white-space: nowrap;
       overflow-x: auto;
       并将 .token-card 设置为 display: inline-block
    */
}
</style>
