#!/usr/bin/env node

'use strict'

const
  clrs        = require('coolors')
, minimist    = require('minimist')
, luvi        = require('./luvi')
, mix         = require('./util/mix')
, each        = require('./util/each')
, filter      = require('./util/filter')
, readJSON    = require('./util/readJSON')
, readFile    = require('./util/readFile')
, isArrayLike = require('./util/isArrayLike')
, pkg         = readJSON(__dirname, '..', 'package.json')
, argv        = minimist(process.argv.slice(2))
, log         = console.log
, configFile  = argv.config || ('.' + pkg.name + '.json')
, config      = readJSON(configFile)

let servers   = isArrayLike(config) ? config : [config]

if (argv.v)       {argv.version = argv.v}
if (argv.h)       {argv.help    = argv.h}
if (argv.r)       {argv.root    = argv.r}
if (argv.p)       {argv.port    = argv.p}
if (argv.version) {return log(clrs(pkg.version, 'yellow'))}
if (argv.help)    {return log(clrs(readFile(__dirname, 'help.md'), 'red'))}

if (argv._.length) {
  servers = filter(servers, item => {
    return item && argv._.indexOf(item.name) >= 0
  })
}

each(servers, server => {
  luvi(mix(server, argv))
})
