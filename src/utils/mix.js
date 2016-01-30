'use strict'

var each = require('./each')
  , mix = function(){
  var mixed = {}
  each(arguments, function(obj){
    each(obj, function(item, index){
      mixed[index] = item
    })
  })
  return mixed
}

module.exports = mix

