import * as algokit from '@algorandfoundation/algokit-utils';


async function atomic_transaction() {

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



    //explore the asset_created on Lora explorer
    console.log(`Asset created ${asset.assetName} on testnet with id ${asset.assetId}`)
    
    // Lora explorer
    const url = `https://lora.algokit.io/testnet/asset/${asset.assetId}`;
    console.log(`Asset URL: ${url}`);


}