# project_infrastructure

#### 写在前面的话

项目用于帮助快速搭建公司级项目和个人项目的基础配置，提供基础配置模板。可让你的团队在创建新项目时直接投入使用
项目配置了 vue、vue-router 方法自动引入功能，编写项目时无需再写 import {ref} from 'vue',import {useRouter} from 'vue-router'等相关导入语句
项目中已对 axios 进行二次封装，文件目录为 src/utils/http，目录 api 里面的文件为相关模板，如使用不习惯，可自行修改相关配置
项目中已处理浏览器相关兼容性问题，如你想使用 babel 等其他兼容性配置也是允许的

#### 介绍

用于公司平常构建新项目，此项目适用于想使用 Vite+TypeScript+Vue3+Pinia 的用户群体。
团队协同：配置了一系列格式化、语法检查、提交校验等功能，规范了团队成员的代码风格与提交信息等，用于多人协同开发统一风格。
项目配置：实现了对浏览器版本兼容、代码打包体积压缩等配置

#### 安装教程

1.  pnpm install

#### 项目中的技术选型

构建工具： Vite
框架语言： Vue3
状态管理： Pinia
路由管理： Vue-Router
HTTP 请求： Axios

#### 配置信息

ESLint
prettier
commitLint
styleLint
lint-staged
TypeScript

#### 项目 git 提交信息格式

<type>: <subject>
type 对应以下字段
upd：更新某功能
feat：新功能
fix：修补 bug
docs：文档
style： 格式
refactor：重构
test：增加测试
chore：构建过程或辅助工具的变动

#### 脚本命令

npm run dev | 启动本地开发环境
npm run build | 打包生产环境
npm run build:staging | 打包体验环境
npm run lint | 语法检查
