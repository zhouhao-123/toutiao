module.exports = {
    plugins: {
        // 设置浏览器的前缀:因为vueCli中已经帮助我们设置了，所以不需要再写一遍,避免发生冲突
        // autoprefixer: {
        // browsers: ['Android >= 4.0', 'iOS >= 8'],
        // },

        // 将px转化为rem
        'postcss-pxtorem': {
        // rootValue有两种方式:数字，函数
        // 是vant样式按 37.5 计算；我们自己的样式按 75 计算
        rootValue ({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 75
        },
        
        // rootValue: 37.5,

        // 配置的转换的CSS 属性 * 表示所有
        propList: ['*'],
        },
    },
}
