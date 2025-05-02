import * as algokit from '@algorandfoundation/algokit-utils';

import { Buffer } from 'buffer'; // If needed



function keypress() {
    return new Promise((resolve) => {
      process.stdin.once('data', () => {
        resolve();
      });
    });
  }



async function create_asset() {


    //testnet client creation
    const algodConfig = {
        server: "https://testnet-api.algonode.cloud",
        port: "",
        token: ""
        }

    const algorand = algokit.AlgorandClient.fromConfig({ algodConfig })
    const creator = algorand.account.random()

    console.log(creator.addr)
    console.log(creator.account.sk)
      
    // dispense testnet algo
    const dispenser_url = `https://bank.testnet.algorand.network/?account=${creator.addr}`;
    console.log(`Fund the wallet via Algorand Dispenser: ${dispenser_url}`);
    console.log("Press any key when the account is funded");
    await keypress();

    const hex = '1d8685adaa9deac53c6bb8c9f3c527538fe138d6419fed0acfb2c9945a496a27';
    const assetMetadataHash = new Uint8Array(Buffer.from(hex, 'hex'));

    //assetcreate
    const asset = await algorand.send.assetCreate({
        sender: creator.addr,
        total: 1n,
        decimals: 0,
        unitName: "AlgoN",
        assetName: "AlgoNFT",
        manager: creator.addr,
        reserve: creator.addr,
        freeze: creator.addr,
        clawback: creator.addr,
        url: "https://ipfs.io/ipfs/bafkreihsbkirdxsdnrqpshcmhlellkhocnxejzcadfwuu5heewu3zh55uy#arc3",
        metadataHash: assetMetadataHash,
        defaultFrozen: false
    })

    //explore the asset_created on Lora explorer
    console.log(`Asset created ${asset.assetName} on testnet with id ${asset.assetId}`)
    
    // Lora explorer
  const url = `https://lora.algokit.io/testnet/asset/${asset.assetId}`;
  console.log(`Asset URL: ${url}`);
    

}

create_asset()