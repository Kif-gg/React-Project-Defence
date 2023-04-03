const Fabric = require("../Models/Fabric");
const Stones = require("../Models/Stones");
const Stamp = require("../Models/Stamp");
const Clothes = require("../Models/Clothes");
const Review = require("../Models/Review");


async function getThreeFromTopRated() {

    const collection1 = await Fabric.find({}).populate('reviews').sort({ average: -1 }).limit(4);
    const collection2 = await Stones.find({}).populate('reviews').sort({ average: -1 }).limit(4);
    const collection3 = await Stamp.find({}).populate('reviews').sort({ average: -1 }).limit(4);
    const collection4 = await Clothes.find({}).populate('reviews').sort({ average: -1 }).limit(4);

    const roulette = [collection1, collection2, collection3, collection4];

    const threeRandom = [];

    let max = 0;
    let bullet = 0;

    for (let i = 0; i < 3; i++) {
        for (let collection of roulette) {
            max = collection.length - 1;
            bullet = Math.round(Math.random() * max);
            if (collection.length > 1) {
                collection.splice(bullet, 1);
            }
        }
    }

    max = 3;
    bullet = Math.round(Math.random() * max);

    roulette.splice(bullet, 1);

    for (let collection of roulette) {
        threeRandom.push(collection[0]);
    }

    // CHANGE LATER BECAUSE THERE WILL BE ENOUGH PRODUCTS TO NOT FILTER!
    return threeRandom.filter(prod => prod != '' && prod != null && prod != undefined);
};

module.exports = {
    getThreeFromTopRated
};