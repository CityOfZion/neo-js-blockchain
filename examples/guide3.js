#!/usr/bin/env node

// -- Bootstrap

const Rpc = require('../dist2/neo.blockchain.rpc')
const Neo = require('../dist2/neo.blockchain.neo')

// -- Methods

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// -- Chain of command

async function main () {
  /**
   * Neo client usages with benchmarking
   * 
   * By specifying 'diagnosticInterval', a background process will analyse all known nodes to check for height and node latency.
   * No local persistent storage is required.
   */
  console.log('== Neo client usages with benchmarking ==')
  const neoBlockchain = new Neo('testnet', { diagnosticInterval: 1000 }) // The blockchain instance will be disgnosing a node every 1000ms.
  console.log('getCurrentNodeUrl:', neoBlockchain.getCurrentNodeUrl()) // Show default node

  console.log('give it 10 seconds to gather diagnostic information...')
  await sleep(10000)

  const fNode = neoBlockchain.getFastestNode()
  console.log('Fastest node:', fNode.api.url, 'latency:', fNode.latency)
  const hNode = neoBlockchain.getHighestNode()
  console.log('Highest node:', hNode.api.url, 'blockHeight:', hNode.blockHeight)

  console.log('give it another 10 seconds to see if any changes in rankings...')
  await sleep(10000)

  const fNode2 = neoBlockchain.getFastestNode()
  console.log('Fastest node:', fNode2.api.url, 'latency:', fNode2.latency)
  const hNode2 = neoBlockchain.getHighestNode()
  console.log('Highest node:', hNode2.api.url, 'blockHeight:', hNode2.blockHeight)

  neoBlockchain.setFastestNode()
  console.log('setFastestNode(). getCurrentNodeUrl is now:', neoBlockchain.getCurrentNodeUrl())
  console.log('getBlockCount:', await neoBlockchain.getBlockCount())

  neoBlockchain.setHighestNode()
  console.log('setHighestNode(). getCurrentNodeUrl is now:', neoBlockchain.getCurrentNodeUrl())
  console.log('getBlockCount:', await neoBlockchain.getBlockCount())

  process.exit() // Since there'll be background process happening, you'll need to explicit terminate this script.
}

// -- Execute

main()
