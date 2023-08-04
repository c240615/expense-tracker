# expense-tracker
![1](C:\programs\Express\3\expense-tracker\public\img\index.PNG)

## 介紹
這是一個可以註冊登入帳號，管理支出的記事本

## 功能
1. 註冊、登入帳號
2. 依類別查詢各項支出
3. 自動結算支出的總金額
4. 可以新增、修改和刪除每一筆支出

## 使用如下:
1. 安裝 npm和 Node.js
2. git clone 本專案
3. 使用終端機進入本專案，輸入：
```
npm install
```
4. 新增.env檔案，請根據.env.example檔案內資訊設置環境變數
5. 新增種子資料：
```
npm run seed
```
6. 啟動伺服器，執行 app.js 檔案：
```
npm run dev
```
7. 打開瀏覽器輸入以下網址：
```
http://localhost:3000
```

## 開發工具  
- "bcryptjs": "^2.4.3"
- "body-parser": "^1.20.2"
- "connect-flash": "^0.1.1"
- "express": "^4.18.2"
- "express-handlebars": "^7.1.0"
- "express-session": "^1.17.3"
- "method-override": "^3.0.0"
- "mongoose": "^7.4.1"
- "passport": "^0.6.0"
- "passport-facebook": "^3.0.0"
- "passport-local": "^1.0.0"
- "dotenv": "^16.3.1"
 