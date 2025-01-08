<template>
    <div class="create-token-page">
      <!-- 媒体上传区域 -->
      <div class="upload-section">
        <div class="upload-box">
          <!-- 这里用一个占位图片模拟，可改成实际的 file input 或上传组件 -->
          <img 
            src="https://via.placeholder.com/80?text=Media" 
            alt="placeholder" 
            class="upload-icon" 
          />
          <button class="upload-button">Select Media</button>
        </div>
      </div>
  
      <!-- 表单内容区 -->
      <div class="form-section">
        <!-- Token Name -->
        <div class="form-field">
          <label for="tokenName" class="form-label">
            Token Name <span class="required">*</span>
          </label>
          <input 
            id="tokenName" 
            type="text" 
            class="form-input" 
            v-model="tokenName" 
            placeholder="Enter your token name" 
          />
        </div>
  
        <!-- Ticker Symbol -->
        <div class="form-field">
          <label for="tickerSymbol" class="form-label">
            Ticker Symbol <span class="required">*</span>
          </label>
          <input 
            id="tickerSymbol" 
            type="text" 
            class="form-input" 
            v-model="tickerSymbol" 
            placeholder="Enter your ticker symbol (e.g. DOGE)" 
          />
        </div>
  
        <!-- Description -->
        <div class="form-field">
          <label for="description" class="form-label">
            Description <span class="required">*</span>
          </label>
          <textarea 
            id="description" 
            rows="5" 
            class="form-textarea" 
            v-model="description"
            placeholder="Describe your token..."
          ></textarea>
        </div>
  
        <!-- Raised Token -->
        <div class="form-field">
          <label class="form-label">Raised Token</label>
          <div class="raised-token-list">
            <button 
              v-for="option in raiseOptions" 
              :key="option.value"
              :class="['raise-option', { active: selectedRaise === option.value }]"
              @click="selectedRaise = option.value"
            >
              <img 
                v-if="option.value === 'BNB'" 
                src="https://via.placeholder.com/24?text=BNB" 
                alt="BNB"
              />
              <img 
                v-if="option.value === 'CAKE'" 
                src="https://via.placeholder.com/24?text=Ck" 
                alt="CAKE"
              />
              <img 
                v-if="option.value === 'USDT'" 
                src="https://via.placeholder.com/24?text=U" 
                alt="USDT"
              />
              {{ option.label }}
            </button>
          </div>
        </div>
  
        <!-- Website -->
        <div class="form-field">
          <label for="website" class="form-label">Website <span class="optional">(Optional)</span></label>
          <input 
            id="website" 
            type="text" 
            class="form-input" 
            v-model="website" 
            placeholder="https://example.com" 
          />
        </div>
  
        <!-- Twitter -->
        <div class="form-field">
          <label for="twitter" class="form-label">Twitter <span class="optional">(Optional)</span></label>
          <input 
            id="twitter" 
            type="text" 
            class="form-input" 
            v-model="twitter" 
            placeholder="@YourTwitterHandle" 
          />
        </div>
  
        <!-- Telegram -->
        <div class="form-field">
          <label for="telegram" class="form-label">Telegram <span class="optional">(Optional)</span></label>
          <input 
            id="telegram" 
            type="text" 
            class="form-input" 
            v-model="telegram" 
            placeholder="https://t.me/YourGroup" 
          />
        </div>
  
        <!-- Tag -->
        <div class="form-field">
          <label class="form-label">Tag</label>
          <div class="tag-list">
            <button 
              v-for="tag in tagOptions" 
              :key="tag"
              :class="['tag-item', { active: selectedTags.includes(tag) }]"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </button>
          </div>
        </div>
  
        <!-- Extra Options Toggle -->
        <div class="form-field extra-options-toggle">
          <label class="switch-label">
            Extra Options
          </label>
          <label class="switch">
            <input type="checkbox" v-model="showExtraOptions" />
            <span class="slider round"></span>
          </label>
        </div>
        <div v-if="showExtraOptions" class="extra-content">
          <!-- 在这里放置更多可选字段，如 Tokenomics、Roadmap等 -->
          <p>Extra fields go here...</p>
        </div>
      </div>
  
      <!-- 底部按钮 -->
      <div class="bottom-section">
        <button class="connect-wallet-btn">Connect Wallet</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 表单数据
  const tokenName = ref('')
  const tickerSymbol = ref('')
  const description = ref('')
  
  // raised token 选项
  const raiseOptions = ref([
    { label: 'BNB', value: 'BNB' },
    { label: 'CAKE', value: 'CAKE' },
    { label: 'USDT', value: 'USDT' },
  ])
  const selectedRaise = ref('BNB') // 默认选中 BNB
  
  // 网站、社交
  const website = ref('')
  const twitter = ref('')
  const telegram = ref('')
  
  // Tags
  const tagOptions = ref([
    'Meme', 'AI', 'Defi', 'Games',
    'Infra', 'De-Sci', 'Social', 'Depin',
    'Charity', 'Others'
  ])
  const selectedTags = ref([])
  
  function toggleTag(tag) {
    if (selectedTags.value.includes(tag)) {
      selectedTags.value = selectedTags.value.filter(t => t !== tag)
    } else {
      selectedTags.value.push(tag)
    }
  }
  
  // Extra Options
  const showExtraOptions = ref(false)
  </script>
  
  <style scoped>
  /* —— 全局基础 —— */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }
  body {
    background-color: #f6f9fc;
  }
  .required {
    color: #ff3e3e;
  }
  .optional {
    font-size: 0.85rem;
    color: #999;
    margin-left: 0.25rem;
  }
  
  /* —— 页面容器 —— */
  .create-token-page {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  /* —— 媒体上传区 —— */
  .upload-section {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  .upload-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 180px;
    height: 180px;
    border: 2px dashed #ddd;
    border-radius: 12px;
    justify-content: center;
    background-color: #fff;
    padding: 1rem;
  }
  .upload-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 0.75rem;
  }
  .upload-button {
    background-color: #29c6b7;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.4rem 1rem;
    cursor: pointer;
  }
  .upload-button:hover {
    background-color: #25b3a6;
  }
  
  /* —— 表单部分 —— */
  .form-section {
    background-color: #fff;
    border-radius: 12px;
    border: 1px solid #eee;
    padding: 1.5rem;
  }
  
  /* 表单字段组 */
  .form-field {
    margin-bottom: 1rem;
  }
  .form-label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 600;
    color: #2f1c6a; /* 深紫色 */
  }
  .form-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #e8e2ff;
    border-radius: 8px;
    font-size: 0.95rem;
    background-color: #f7f3ff;
    outline: none;
    color: #3d2870;
  }
  .form-input:focus {
    border-color: #c9b7ff;
  }
  .form-textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #e8e2ff;
    border-radius: 8px;
    font-size: 0.95rem;
    background-color: #f7f3ff;
    outline: none;
    resize: none;
    color: #3d2870;
  }
  .form-textarea:focus {
    border-color: #c9b7ff;
  }
  
  /* —— Raised Token —— */
  .raised-token-list {
    display: flex;
    gap: 0.5rem;
  }
  .raise-option {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border: 1px solid #eee;
    background-color: #f7f3ff;
    border-radius: 8px;
    padding: 0.4rem 0.75rem;
    cursor: pointer;
    color: #3d2870;
    font-weight: 600;
    font-size: 0.9rem;
  }
  .raise-option.active {
    border-color: #7350ff;
    background-color: #ddd1ff;
  }
  .raise-option:hover {
    background-color: #ede6ff;
  }
  .raise-option img {
    width: 16px;
    height: 16px;
  }
  
  /* —— Tag —— */
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .tag-item {
    background-color: #f7f3ff;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 0.4rem 0.75rem;
    cursor: pointer;
    color: #3d2870;
    font-size: 0.9rem;
  }
  .tag-item.active {
    border-color: #7350ff;
    background-color: #ddd1ff;
  }
  .tag-item:hover {
    background-color: #ede6ff;
  }
  
  /* —— Extra Options —— */
  .extra-options-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .switch-label {
    font-size: 0.95rem;
    color: #2f1c6a;
    font-weight: 600;
  }
  
  /* toggle 开关 */
  .switch {
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
  .slider.round {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #ccc;
    border-radius: 34px;
    transition: 0.4s;
  }
  .slider.round:before {
    content: "";
    position: absolute;
    height: 14px;
    width: 14px;
    left: 4px;
    top: 4px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.4s;
  }
  input:checked + .slider.round {
    background-color: #7350ff;
  }
  input:checked + .slider.round:before {
    transform: translateX(18px);
  }
  /* 显示 extra fields */
  .extra-content {
    background-color: #fcfbff;
    border: 1px solid #eee;
    border-radius: 8px;
    margin-top: 1rem;
    padding: 1rem;
    font-size: 0.9rem;
    color: #666;
  }
  
  /* —— 底部按钮 —— */
  .bottom-section {
    margin-top: 1rem;
    text-align: center;
  }
  .connect-wallet-btn {
    background-color: #29c6b7;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 2rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
  }
  .connect-wallet-btn:hover {
    background-color: #25b3a6;
  }
  </style>
  