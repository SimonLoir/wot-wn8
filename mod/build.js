//@ts-check
const { exec } = require('child_process');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const build_dir = __dirname + '/builds';
const tmp = build_dir + '/tmp';
const mod_dir = __dirname + '/wn8master';
const mod_name = 'wn8master';
process.chdir(mod_dir); // we go to the mod directory
exec('python -m compileall ./'); // we compile the file

console.info(mod_dir, tmp, build_dir);
deleteFolderRecursive(tmp);
fs.mkdirSync(tmp);
copy(mod_dir, tmp);
let output = fs.createWriteStream(build_dir + '/mod.zip');
var archive = archiver('zip', {
    store: true,
});
archive.pipe(output);
output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log(
        'archiver has been finalized and the output file descriptor has closed.'
    );
    fs.renameSync(build_dir + '/mod.zip', build_dir + `/${mod_name}.wotmod`);
    deleteFolderRecursive(tmp);
});
archive.directory(tmp, false);
archive.finalize();

function deleteFolderRecursive(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolderRecursive(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function copy(base, to) {
    const entries = fs.readdirSync(base);
    entries.forEach((entry) => {
        const path_source = base + '/' + entry;
        const path_target = to + '/' + entry;
        console.log(path_source + ' => ' + path_target);
        if (fs.lstatSync(path_source).isDirectory()) {
            fs.mkdirSync(path_target);
            copy(path_source, path_target);
        } else {
            if (path.extname(entry) != '.py')
                fs.writeFileSync(path_target, fs.readFileSync(path_source));
        }
    });
}
