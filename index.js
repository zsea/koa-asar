const disk = require("@electron/asar/lib/disk")
    , path = require("path")
    ;
/**
 * 
 * @param {string} archive - asar file path
 * @param {object} options 
 * @param {string} options.root - website path
 * @param {string[]} options.methods - 
 * @param {string|{}|Function(string)} options.rewrite - file rewrite
 * @param {string} options.index - default document file
 * @param {number} options.maxage - cache time(second)
 * @param {number} options.maxAge - cache time(second)
 * @returns 
 */
function Asar(archive, options) {
    const filesystem = disk.readFilesystemSync(archive);
    options = Object.assign({}, options);
    options.root = options.root || "/"
    options.methods = options.methods || ["GET"];
    if (!options.root.endsWith("/")) options.root += "/"
    if (!options.methods.length) options.methods.push('GET');

    return async function (ctx, next) {
        let path_name = ctx.path;
        if (path_name + "/" === options.root) path_name += "/";
        if (path_name.startsWith(options.root) && options.methods.includes(ctx.request.method)) {
            let filename = path_name.substring(options.root.length);
            if (typeof options.rewrite === "function") {
                filename = (await Promise.resolve(filename)) || filename;
            }
            else if (typeof options.rewrite === "object") {
                filename = options.rewrite[filename] || filename;
            }
            else if (typeof options.rewrite === "string") {
                filename = options.rewrite;
            }
            let fileinfo = undefined;
            try {
                fileinfo = filesystem.getFile(path.normalize(filename));
                if (fileinfo["files"]) {
                    fileinfo = undefined;
                }
            }
            catch (e) {

            }
            if (!fileinfo && options.index) {
                if (filename !== "" && !filename.endsWith("/")) {
                    filename = filename + "/" + options.index;
                }
                else {
                    filename = filename + options.index;
                }
                try {
                    fileinfo = filesystem.getFile(path.normalize(filename));
                    if (fileinfo["files"]) {
                        fileinfo = undefined;
                    }
                }
                catch (e) {

                }
            }
            if (!fileinfo && options.default) {
                try {
                    filename = options.default;
                    fileinfo = filesystem.getFile(path.normalize(filename));
                    if (fileinfo["files"]) {
                        fileinfo = undefined;
                    }
                }
                catch (e) {

                }
            }
            if (!fileinfo) {
                ctx.body = "Not Found";
                ctx.status = 404;
                return;
            }
            const content = disk.readFileSync(filesystem, path.normalize(filename), filesystem.getFile(path.normalize(filename)));
            ctx.body = content;
            const ext = path.extname(filename);
            ctx.type = ext;
            const maxAge = options.maxage || options.maxAge;
            if (maxAge) {
                ctx.set('Cache-Control', [`max-age=${maxAge}`].join(","));
            }
        }
        next();
    }
}
module.exports = Asar;