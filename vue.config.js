module.exports = {
  configureWebpack: {
    devServer: {
      watchOptions: {
        ignored: [/node_modules/, /public/],
      },
      port: 8080,
      host: "0.0.0.0",
      disableHostCheck: true,
    },
  },
};
