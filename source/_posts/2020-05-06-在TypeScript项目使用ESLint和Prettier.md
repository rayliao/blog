---
title: 在TypeScript项目使用ESLint和Prettier
abbrlink: ba9da8f7
date: 2020-05-06 14:41:05
tags: 技术
---

> 翻译文章，[原文地址](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)

TypeScript语法规则和代码风格的检查工具，主要有两种，TSLint和ESLint。TSLint只能用于TypeScript的检查，ESLint同时支持JavaScript和TypeScript。

在[TypeScript 2019线路](https://github.com/Microsoft/TypeScript/issues/29288#developer-productivity-tools-and-integration)中，TypeScript核心团队解释说ESLint具有比TSLint更高性能的体系结构，并且在为TypeScript提供编辑器整合时，他们只会专注于ESLint。因此，我建议使用ESLint来整理TypeScript项目。

### 在TypeScript项目中设置ESLint

首先安装所有需要的依赖：

```
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

> 如果项目是使用create-react-app搭建，eslint已经通过react-scripts包含在依赖中，因此无需额外通过yarn去安装。

- eslint：ESLint的核心库
- @typescript-eslint/parser：允许ESLint转换TypeScript代码的解析器
- @typescript-eslint/eslint-plugin：包含一堆特定于TypeScript的ESLint规则的插件

<!-- more -->

接下来，在项目根目录创建一个配置文件：`.eslintrc.js`，以下是示例配置：

```js
module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  extends: [
    "plugin:@typescript-eslint/recommended" // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  }
};
```

> 建议使用js文件替换json文件，因为js文件支持写上注释，能更好的描述规则。

如果项目使用react，需要安装依赖`eslint-plugin-react`，上面的配置要改为：

```js
module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended" // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
```

最终，在你的配置文件中，你自行决定你要导入什么规则，以及你要使用哪些规则。

### 加入Prettier完美契合

Prettier能很好的格式化你的代码，跟ESLint完美契合使用，安装依赖：

```
yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev
```

- prettier: prettier核心库
- eslint-config-prettier: 禁用可能会跟Prettier冲突的ESLint规则
- eslint-plugin-prettier: 把Prettier作为ESLint的规则使用
  
在根目录创建配置文件`.prettierrc.js`，用来配置prettier，以下是配置示例：

```js
module.exports = {
  semi: true,
  trailingComma: "all",
  singleQuote: true,
  printWidth: 120,
  tabWidth: 4
};
```

然后`.eslintrc.js`中的extends数组需要加上两行：

```js
"prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
"plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
```

> 确保`plugin:prettier/recommended`放在extends数组的最后。

使用eslint-plugin-prettier，把prettier作为eslint规则使用的好处是，代码可以使用ESLint的`--fix`选项自动修复。

### 在VS Code中自动修复代码

当一个文件被保存的时候，你的编辑器会自动运行ESLint的自动修复命令`eslint --fix`，是一个良好的开发体验。VS Code可以在`settings.json`文件配置保存自动修复的功能：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}
```

### 用命令行运行ESLint

可以在`package.json`中添加运行ESLint的命令：

```json
{
  "scripts": {
    "lint": "eslint '*/**/*.{js,ts,tsx}' --quiet --fix"
  }
}
```

可以使用npm run lint或yarn lint从命令行运行以上脚本。此命令在所有的.js，.ts和.tsx（使用react）文件上运行ESLint检查。可以自动修复的都会直接自动修复，有些无法修复的，会在命令行中显示出来。

### 阻止有ESLint错误的代码被提交

为了确认所有提交到git上的代码都没有错误，可以使用lint-staged工具，配合husky食用，可以在git的commit之前检查代码的正确性，如果存在错误，则无法提交，在`package.json`配置如下：

```json
{
  "husky": {
      "hooks": {
          "pre-commit": "lint-staged"
      }
  },
  "lint-staged": {
      "*.{js,ts,tsx}": [
          "eslint --fix"
      ]
  }
}
```

> 大概就是这样，写文档好累鸭，我还只是看着原文翻译过来而已了。