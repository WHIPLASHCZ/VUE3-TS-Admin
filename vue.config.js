module.exports = {
  // productionSourceMap: false,
    configureWebpack: {
        //configureWebpack内的设置会被合并到webpack.config.js
        resolve: {
            alias: {
                component: "@/component", //@默认是src目录的别名
                store: "@/store",
                router: "@/router",
                network: "@/network",
                global: "@/global"
            }
        },

    }
};
