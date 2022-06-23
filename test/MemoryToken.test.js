const { assert } = require('chai');

const MemoryToken = artifacts.require('./MemoryToken.sol');


require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Memory Token', (accounts) => {
  let token;

  before(async () => {
    token = await MemoryToken.deployed();
  });

  describe('deployment', async () => {
    it('deploys correctly', async () => {
      token = await MemoryToken.deployed();
      const address = token.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('has name', async () => {
      const name = await token.name();
      assert.equal(name, 'Memory Token');
    });

    it('has symbol', async () => {
      const name = await token.symbol();
      assert.equal(name, 'MEMORY');
    });
  })
  describe('token distribution', async () => {
    let result;
    it('mint tokens', async () => {
      await token.mint(accounts[0], 'http://test.com/nft');

      result = await token.totalSupply();
      assert.equal(result.toString(), '1', 'amount is correct');

      result = await token.balanceOf(accounts[0]);
      assert.equal(result.toString(), '1', 'owner amount is correct');

      result = await token.ownerOf('1');
      assert.equal(result.toString(), accounts[0].toString(), 'owner is correct');

      let balanceOf = await token.balanceOf(accounts[0]);
      let tokenIds = [];
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.tokenOfOwnerByIndex(accounts[0], i);
        tokenIds.push(id);
      }

      let expected = ['1'];
      assert.equal(tokenIds.toString(), expected.toString(), 'tokensIDs are correct');

      let tokenURI = await token.tokenURI('1');
      assert.equal(tokenURI, 'http://test.com/nft', 'URI is correct');
    })
  })
})
