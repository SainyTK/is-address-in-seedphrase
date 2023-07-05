import { ethers } from 'ethers';

const seedPhrase = "";
const addressToCheck = '';

// Generate the HD wallet from the seed phrase
const mnemonic = seedPhrase.normalize('NFKD');
const seed = ethers.utils.mnemonicToSeed(mnemonic);
const hdNode = ethers.utils.HDNode.fromSeed(seed);

// Derive addresses from the HD wallet
const numAddressesToCheck = 10000;
let found = false;

for (let i = 0; i < numAddressesToCheck; i++) {
    const derivedNode = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
    const derivedWallet = new ethers.Wallet(derivedNode.privateKey);
    const derivedAddress = derivedWallet.address.toLowerCase();

    if (derivedAddress === addressToCheck.toLowerCase()) {
        console.log("Found!!!", derivedAddress);
        found = true;
        break;
    }
}

if (!found) {
    console.log("Address not found.");
}
