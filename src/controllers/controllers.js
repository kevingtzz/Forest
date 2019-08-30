const config = require('../../config')
const path = require('path') //This module can work whit directories, this is implemented 'case de difference between linux a windows paths

function get_home(req, res) {
    res.render(path.join(config.AppPath, '/src/views/index.html'))
}

module.exports = {
    get_home
}