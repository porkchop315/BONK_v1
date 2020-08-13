import Web3 from 'web3'
export function setProvider () => {
  if (window.ethereum) {
    const ethereum = window.ethereum
    const web3Provider = new Web3(ethereum)
    
    /* make web3Provider available to your entire app now */
  }
}