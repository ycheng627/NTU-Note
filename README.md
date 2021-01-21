# README

### Group 31: NTU Note
謝文傑 B08902143
鄭益昀 B07902084
蔡銘軒 B07902064


### Deployed Link

http://108.61.182.95

### Demo Link

==waiting==

### 描述

NTU Note 為一個線上 Markdown 編輯器，我們希望透過一個簡潔的頁面，滿足使用者編輯與整理各種 Markdown 筆記的需求。

### 使用/操作方式

使用者一開始會先被要求登入／註冊帳號。登入後會進到主頁。使用者可以通過點選右上角的 settings 來更改密碼，簽名，等等。另外，每個人的 profile 也會顯示出有哪些 public note。

使用者可以點選 navbar 的 Mynotes 來找尋已經創建過的筆記。每一個筆記可以屬於一個 directory，使用者可以通過左側的 directory 來進行過濾。

使用者可以點選右上角的 New Note 來創建新的筆記。並通過右上角的 Note Setting 來更改名稱，directory，public 等等設定。

### 專題製作心得：

這是Project是一些組員第一次從頭開始寫一份完整的網路服務，從前端到後端到資料庫跟他們之間的串接，做完之後真的有非常大的成就感。

做這份 project 跟上課很不同的是我們有了許多可以自己客製化的空間，也因此有很多可以用到外面其他人寫好的工具的機會。像是我們的 markdown editor 就是用別人寫好的套件。這點來說也增加了我們閱讀文件的能力。

### Libraries and Frameworks
* Frontend
    * ReactJS
    * Axios
    * Bulma Css
    * Ion-icons
    * tui-editor
* Backend
    * ExpressJS
    * Express-Session
    * MongoDB
    * Mongoose


### Code Structure

Frontend (不含 public):
```
.
├── README.md
├── build.zip
├── ntu-note-v0.1.0.tgz
├── package.json
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── components
│   │   └── Navbar.js
│   ├── index.css
│   ├── index.js
│   ├── pages
│   │   ├── Home.js
│   │   ├── Note.js
│   │   ├── NoteSettings.js
│   │   ├── Notes.js
│   │   ├── Profile.js
│   │   ├── Settings.js
│   │   └── Signin.js
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   └── test.js
└── yarn.lock
```

Backend
```
.
├── app.js
├── bin
│   └── www
├── model
│   ├── Note.js
│   └── User.js
├── package.json
├── public
│   ├── asset-manifest.json
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   ├── ionicons (omit content)
│   └── static
│       ├── css (omit content)
│       └── js (omit content)
├── routes
│   ├── auth.js
│   ├── index.js
│   ├── notes.js
│   ├── user.js
│   └── users.js
├── struct
└── yarn.lock
```


### Contribution

* 謝文傑 B08902143
    * 美術設計
    * 前端開發
    * 串接第三方套件
    * 設計Project架構
* 鄭益昀 B07902084
    * 後端開發
    * 規劃API接口
    * 共同實作API內容
* 蔡銘軒 B07902064
    * 後端開發
    * 串接資料庫
    * 共同實作API內容