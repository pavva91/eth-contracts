import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test Hero", function() {
  async function createHero() {
    const Hero = await ethers.getContractFactory("TestHero");
    const hero = await Hero.deploy();
    await hero.deployed();

    return hero;
  }

  let hero;

  before(async function() {
    hero = await createHero();
  });

  it("Should fail at creating hero cause of payment too low", async () => {
    let e;

    try {
      await hero.createHero(0, {
        value: ethers.utils.parseEther("0.0499999"),
      });
    } catch (err) {
      e = err;
    }

    expect(e.message.includes("Please send more money")).to.equal(true);
    expect(e.message.includes("Please send more money")).to.be.true;
  });

  it("Should get a zero hero array", async () => {
    const emptyArray = [];
    expect(await hero.getHeroes()).to.deep.equal(emptyArray);
  });
  it("Should get Hero correctly", async () => {
    const hero = await createHero();

    await hero.setRandom(69);
    await hero.createHero(0, {
      value: ethers.utils.parseEther("0.05"),
    });
    const h = (await hero.getHeroes())[0];

    expect(await hero.getStrength(h)).to.equal(6);
    expect(await hero.getHealth(h)).to.equal(2);
    expect(await hero.getDexterity(h)).to.equal(14);
    expect(await hero.getIntellect(h)).to.equal(10);
    expect(await hero.getMagic(h)).to.equal(16);
  });
});
