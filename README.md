# QQMusic-repository
# QQ音乐网页版项目

这是一个 QQ 音乐网页版项目的源代码仓库。该项目实现了一个基于网页的音乐播放器，提供了在线音乐播放、搜索、歌曲推荐等功能。
数据源接口来自github上的两个程序员开源提供：https://github.com/jsososo/QQMusicApi

## 功能特性

- 在线音乐播放
- 搜索歌曲
- 歌曲推荐
- 歌曲收藏
- 用户个人中心

## 技术栈

- 前端框架：Vue.js(vue3.2.6)
- 状态管理：pinia
- 构建工具：Vite
- UI 库：暂未使用
- 数据请求：Axios

## 项目结构

在该项目中，您可以找到以下主要文件和目录：

music-vue/
├── public/ # 静态资源文件夹
├── src/ # 源代码文件夹
│ ├── assets/ # 静态资源文件夹
│ ├── components/ # 组件文件夹
│ ├── views/ # 页面文件夹
│ ├── store/ # pinia 状态管理文件夹
│ ├── router/ # 路由文件夹
│ ├── App.vue # 根组件
│ └── main.js # 入口文件
├── .gitignore # Git 忽略文件配置
├── package.json # 项目依赖和配置文件
├── README.md # 项目说明文档
└── vite.config.js


## 使用说明

1. 克隆或下载本仓库到本地环境。

2. 进入项目目录：
cd music-vue

3. 安装项目依赖：
npm install

4. 启动开发服务器：
npm run dev

5. 在浏览器中访问项目：
http://localhost:5173


## 贡献

如果您对该项目有任何改进或建议，欢迎提交 Issue 或 Pull Request。

## 授权许可

该项目基于 [MIT 许可证](LICENSE) 进行发布。




## QQMusic-repository
## QQ Music Web Project
This is a source code repository for the QQ Music web project. The project implements a web-based music player that provides features such as online music playback, song search, song recommendations, and user profile.

The data source API is provided by two open-source developers on GitHub: https://github.com/jsososo/QQMusicApi.

## Features
Online music playback
Song search
Song recommendations
Song bookmarking
User profile
Tech Stack
Front-end framework: Vue.js (version 3.2.6)
State management: Pinia
Build tool: Vite
UI library: Not used currently
Data fetching: Axios

## Project Structure
In this project, you will find the following main files and directories:

music-vue/
├── public/ # Static resource folder
├── src/ # Source code folder
│ ├── assets/ # Static assets folder
│ ├── components/ # Components folder
│ ├── views/ # Pages folder
│ ├── store/ # Pinia state management folder
│ ├── router/ # Router folder
│ ├── App.vue # Root component
│ └── main.js # Entry file
├── .gitignore # Git ignore file configuration
├── package.json # Project dependencies and configuration file
├── README.md # Project documentation
└── vite.config.js

## Usage
Clone or download this repository to your local environment.

Navigate to the project directory:
cd music-vue

Install project dependencies:
npm install

Start the development server:
npm run dev

Access the project in your browser:
http://localhost:5173

## Contribution
If you have any improvements or suggestions for this project, feel free to submit an issue or pull request.

## License
This project is released under the MIT License.
