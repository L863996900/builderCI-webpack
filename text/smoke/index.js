const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms'
});

process.chdir(path.join(__dirname, 'template'));
rimraf('./dist', () => {
    const proConfig = require('../../bin/webpack.prod');
    let compiler = webpack(proConfig);
    compiler.apply(new webpack.ProgressPlugin());
    
    compiler.run(function (err, stats) {
        if (err) {
            console.error(err);
            process.exit(2);
            return;
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }));
        
        console.log('\n' + 'Compiler success');
        
        console.log('开始执行测试用例.....');
        console.log('webpack build success,begin run .....');
        
        mocha.addFile(path.join(__dirname, 'html-test.js'));
        mocha.addFile(path.join(__dirname, 'css-js-test.js'));
        mocha.run();
    });
    // 第二种方式
    // webpack(proConfig, (err, stats) => {
    //     if (err) {
    //         console.error(err);
    //         process.exit(2)
    //         return;
    //     }
    //     console.log(stats.toString({
    //         colors: true,
    //         modules: false,
    //         children: false,
    //         chunks: false,
    //         chunkModules: false
    //     }));
    //
    //     console.log('\n' + 'Compiler success');
    // });
});
