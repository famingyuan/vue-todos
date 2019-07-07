
module.exports = {
    // 清除多余的entry
    cleanEntry: function (config) {
        for (var x in config.entry) {
            delete config.entry[x];
        }
        return config;
    }
}

