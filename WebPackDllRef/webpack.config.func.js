module.exports = function(
  path,
  fs,
  webpack,
  asDll
  ) 
{
  
  var workingDirPath = process.cwd();

  // const webpack = require('webpack');
  // const fs = require('fs-extra');
  
  // // ソリューション名
  var entryKey = workingDirPath.split('\\')[workingDirPath.split('\\').length - 2];  
  // バンドル化対象のスクリプトフォルダ相対パス
  const relativeTargetSriptsDirPath = './Scripts';
  // 参照用TSフォルダの相対パス
  const relativeRefTSDirPath = '../../../dist_scripts/com';
  // バンドルJSフォルダの相対パス
   const relativeJsBundlesDirPath = '../../../dist_scripts/bundles';

  // バンドル対象のdll(scriptsフォルダ以下全てになる)))
  var entry = {};

  if (asDll) {
    var entryTss = []; 

    var files = fs.readdirSync(relativeTargetSriptsDirPath);

    files.forEach(file => {
      if(path.extname(file) === ".ts") {
        entryTss.push(`${relativeTargetSriptsDirPath}/${file}`);      
      }  
    });

    entry[entryKey] = entryTss;
    
    console.log(JSON.stringify(entry,null,2));

    // 参照TSフォルダにTSファイルをコピー
    if (!fs.existsSync(path.resolve(workingDirPath, relativeRefTSDirPath, entryKey))) {
      fs.mkdir(path.resolve(workingDirPath, relativeRefTSDirPath, entryKey));
    }

    fs.copySync(path.resolve(workingDirPath, relativeTargetSriptsDirPath), path.resolve(workingDirPath, relativeRefTSDirPath, entryKey));
  } else {
    var files = fs.readdirSync(relativeTargetSriptsDirPath);

    files.forEach(file => {
      var index = file.lastIndexOf('.entry.ts');

      if (index!= -1) {
        entry[`${entryKey}.${file.substring(0, index)}`] = `${relativeTargetSriptsDirPath}/${file}`;
      }
    });    
  }

  console.log(entry);

  var plugins = []

  // バンドルJSフォルダかマニフェストファイルの一覧を取得して参照プラグインを追加
  var files = fs.readdirSync(relativeJsBundlesDirPath);

  files.forEach(file => {    
    if (file.lastIndexOf('-manifest.json') != -1) {
      plugins.push(
        new webpack.DllReferencePlugin({        
          /**
           * manifestファイルをロードして渡す
           */        
          manifest: path.resolve(relativeJsBundlesDirPath, file),
          sourceType: 'umd'
        })
      );
    }
  }); 

  if (asDll) {
    plugins.push(
      // dll化するプラグインを設定
      new webpack.DllPlugin({
        path: path.resolve(workingDirPath, relativeJsBundlesDirPath, '[name]-manifest.json'),
        // require.jsを使用するのでjs名(.jsは除く)とdllプラグイン名は一致させる
        name: '[name].dll'
      })
    );

    // マニフェストファイルの中身の相対パスを修正するプラグイン >>
    class ModifyManifestPlugin {
      constructor(entryKey, entryTss) {
        this.entryKey = entryKey;
        this.entryTss = entryTss;
      }

      // プラグインによりバンドル処理の最後に実行
      apply(compiler) {    
        compiler.plugin('done', (params) => {           
          var manifestFilePath = path.resolve(workingDirPath, relativeJsBundlesDirPath, `${this.entryKey}-manifest.json`);
          var json = require(manifestFilePath);

          console.log('修正前マニフェスト');
          console.log(JSON.stringify(json,null,2));

          this.entryTss.forEach(entryTs =>{
            var tsName = entryTs.split('/')[entryTs.split('/').length - 1];
            var modifedEntryTs = `${relativeRefTSDirPath}/${this.entryKey}/${tsName}`;
            var content = json.content[entryTs];

            delete json.content[entryTs];      
            json.content[modifedEntryTs] = content;
          });

          console.log('修正後マニフェスト');
          console.log(JSON.stringify(json,null,2));

          fs.writeFile(manifestFilePath, JSON.stringify(json));
        });
      }
    }

    plugins.push(
      // マニフェストファイルを修正するプラグインを設定
      new ModifyManifestPlugin(entryKey, entryTss)
    );
  }
  // <<

  console.log(JSON.stringify(plugins,null,2));
  
  var bundleType = asDll ? "dll" : "bundle";  

  return {
      mode: 'development',   
      // メインとなるJavaScriptファイル（エントリーポイント）
      entry: entry,

      output: {
        　// require.jsを使用するのでjs名(.jsは除く)とdllプラグイン名は一致させる
          filename: `[name].${bundleType}.js`,
          library: `[name].${bundleType}`,       
          path: path.resolve(workingDirPath, relativeJsBundlesDirPath),   
          // require.jsを使用するのでumd形式にする
          libraryTarget: 'umd'
      },
    
      devtool: 'source-map',

      module: {
        rules: [
          {          
            test: /\.ts$/,          
            use: [         
              {            
                loader: 'ts-loader'
              }
            ],
            exclude: /node_modules/
          }
        ]
      },    
      resolve: {
        alias: {
          // import 文で comからモジュール指定のいけるパスを解決するために設定
          com: path.resolve(workingDirPath, relativeRefTSDirPath)        
        },
        extensions: [
          '.ts'
        ]
      },

      plugins: plugins
  };  
};