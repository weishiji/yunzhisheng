# yunzhisheng Website


## Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)


### Manual Setup

To manually set up the template, first download it with Git:

```bash
git clone https://github.com/weishiji/yunzhisheng.git
```

Then open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
bower install
```

Finally, run `npm start` to run Gulp. Your finished site will be created in a folder called `dist`, viewable at this URL:

```
http://localhost:8000
```

To create compressed, production-ready assets, run `npm run build`.


Documents
-------------
- 默认模版引擎在`src/layouts/default.html`,所有文件全部通过`default.html`配置
- 对应的每个页面在`src/pages/*.html` 
- 每个文件对应着一个sass文件，但是所有的关于我们只对应一个sass文件，样式会被压缩进同一个文件夹内
- 根目录有一个配置文件，`config.yml`，**gulp**会读取这里面的配置，详情请看`foundation6`的官方文档，有很详细的说明
