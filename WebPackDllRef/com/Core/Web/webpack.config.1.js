const webpackFunc = require('./webpack.config.func');

var config = webpackFunc(
    'Core', 
    './Scripts', 
    '../../../dist_scripts/com', 
    '../../../dist_scripts/bundles');

module.exports = config;

// // 参照用TSフォルダの相対パス
// const relativeRefTSDirPath = '../../../dist_scripts/com';
// // バンドルJSフォルダの相対パス
// const relativeJsBundlesDirPath = '../../../dist_scripts/bundles';
// // バンドル化対象のスクリプトフォルダ相対パス
// const relativeTargetSriptsDirPath = './Scripts';
// // ソリューション名
// var entryKey = 'Core';
// // バンドル対象のdll(scriptsフォルダ以下全てになる)))
// var entryTss = [];

// var entry = {};
// entry[entryKey] = entryTss;

// var files = fs.readdirSync(relativeTargetSriptsDirPath);

// files.forEach(file => {
//   if(path.extname(file) === ".ts") {
//     entryTss.push(`${relativeTargetSriptsDirPath}/${file}`);      
//   }  
// });

// console.log(__dirname);
// console.log(entryTss);

// // 参照TSフォルダにTSファイルをコピー
// if (!fs.existsSync(path.resolve(__dirname, relativeRefTSDirPath, entryKey))) {
//   fs.mkdir(path.resolve(__dirname, relativeRefTSDirPath, entryKey));
// }

// fs.copySync(path.resolve(__dirname, relativeTargetSriptsDirPath), path.resolve(__dirname, relativeRefTSDirPath, entryKey));

// // マニフェストファイルの中身の相対パスを修正するプラグイン >>
// class ModifyManifestPlugin {
//   constructor(entryKey, entryTss) {
//     this.entryKey = entryKey;
//     this.entryTss = entryTss;
//   }
//   // プラグインによりバンドル処理の最後に実行
//   apply(compiler) {    
//     compiler.plugin('done', (params) => {           
//       var manifestFilePath = path.resolve(__dirname, relativeJsBundlesDirPath, `${this.entryKey}-manifest.json`);
//       var json = require(manifestFilePath);

//       console.log('修正前マニフェスト');
//       console.log(JSON.stringify(json,null,2));

//       this.entryTss.forEach(entryTs =>{
//         var tsName = entryTs.split('/')[entryTs.split('/').length - 1];
//         var modifedEntryTs = `${relativeRefTSDirPath}/${this.entryKey}/${tsName}`;
//         var content = json.content[entryTs];

//         delete json.content[entryTs];      
//         json.content[modifedEntryTs] = content;
//       });

//       console.log('修正後マニフェスト');
//       console.log(JSON.stringify(json,null,2));

//       fs.writeFile(manifestFilePath, JSON.stringify(json));
//     });
//   }
// }
// // <<

// module.exports = {
//     mode: 'development',   
//     // メインとなるJavaScriptファイル（エントリーポイント）
//     entry: entry,

//     output: {
//       　// require.jsを使用するのでjs名(.jsは除く)とdllプラグイン名は一致させる
//         filename: '[name].dll.js',
//         path: path.resolve(__dirname, relativeJsBundlesDirPath),   
//         library: '[name].dll',       
//         // require.jsを使用するのでumd形式にする
//         libraryTarget: 'umd'
//     },
   
//     devtool: 'source-map',

//     module: {
//       rules: [
//         {          
//           test: /\.ts$/,          
//           use: [         
//             {            
//               loader: 'ts-loader'
//             }
//           ],
//           exclude: /node_modules/
//         }
//       ]
//     },    
//     resolve: {
//       alias: {
//         // import 文で comからモジュール指定のいけるパスを解決するために設定
//         com: path.resolve(__dirname, relativeRefTSDirPath)        
//       },
//       extensions: [
//         '.ts'
//       ]
//     },

//     plugins: [
//       new webpack.DllPlugin({
//         path: path.resolve(__dirname, relativeJsBundlesDirPath, '[name]-manifest.json'),
//         // require.jsを使用するのでjs名(.jsは除く)とdllプラグイン名は一致させる
//         name: '[name].dll'
//       }),
//       // マニフェストファイルを修正するプラグインを設定
//       new ModifyManifestPlugin(entryKey, entryTss)
//     ]
//   };
  