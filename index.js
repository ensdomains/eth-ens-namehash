import { ens_normalize } from '@adraffy/ens-normalize';
import { keccak_256 as sha3 } from 'js-sha3'

function namehash (inputName) {
  // Reject empty names:
  var node = ''
  for (var i = 0; i < 32; i++) {
    node += '00'
  }

  var name = normalize(inputName)

  if (name) {
    var labels = name.split('.')

    for(var i = labels.length - 1; i >= 0; i--) {
      var labelSha = sha3(labels[i])
      node = sha3(new Buffer(node + labelSha, 'hex'))
    }
  }

  return '0x' + node
}

function normalize(name) {
  return name ? ens_normalize(name) : name
}

module.exports = {
  hash: namehash,
  normalize
}
