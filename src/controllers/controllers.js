const config = require('../../config')
const path = require('path') //This module can work whit directories, this is implemented 'case de difference between linux a windows paths
const fetch = require('node-fetch')
const controller = {}

//Client controllers

controller.get_home = (req, res) => {
    res.render(path.join(config.AppPath, '/src/views/index.html'))  
}

//Internal controllers

controller.get_online_nodes = (req, res) => {   
    fetch('http://siata.gov.co:3000/cc_api/estaciones/listar_minutal/').then((res) => {
        return res.json()
    }).then((json) => {
        let active_nodes = []
        for( i = 0; i < json.length; ++i) {
            if (json[i].online == "Y" && json[i].PM2_5_CC_ICA >= 0) {
                active_nodes.push(json[i])
            }
        }
        res.send(active_nodes)
    })
}

controller.get_offline_nodes = (req, res) => {   
    fetch('http://siata.gov.co:3000/cc_api/estaciones/listar_minutal/').then((res) => {
        return res.json()
    }).then((json) => {
        let active_nodes = []
        for( i = 0; i < json.length; ++i) {
            if (json[i].online == "N") {
                active_nodes.push(json[i])
            }
        }
        res.send(active_nodes)
    })
}

module.exports = {
    controller
}