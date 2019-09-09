const config = require('../../config')
const path = require('path') //This module can work whit directories, this is implemented 'case de difference between linux a windows paths
const fetch = require('node-fetch')
const controller = {}

//Client controllers

controller.get_home = (req, res) => {
    res.render(path.join(config.AppPath, '/src/views/index.html'))  
}

//Internal controllers

controller.get_active_nodes = (req, res) => {   
    fetch('http://siata.gov.co:3000/cc_api/estaciones/listar/').then((res) => {
        return res.json()
    }).then((json) => {
        let active_nodes = []
        for( i = 0; i < json.length; ++i) {
            if (json[i].online == "Y") {
                active_nodes.push(json[i])
            }
        }
        res.send(active_nodes)
    })
}

module.exports = {
    controller
}