const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const webpackFunc = require('../../../webpack.config.func');

var config = webpackFunc(path, fs, webpack, true);
module.exports = config;