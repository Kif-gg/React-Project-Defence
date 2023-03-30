const Fabric = require("../Models/Fabric");
const Stones = require("../Models/Stones");
const Stamp = require("../Models/Stamp");
const Clothes = require("../Models/Clothes");
const Review = require("../Models/Review");


async function getThreeFromTopRated() {

    const collection1 = await Fabric.find({}).populate('reviews').sort({ average: -1 }).limit(3);
    const collection2 = await Stones.find({}).populate('reviews').sort({ average: -1 }).limit(3);
    const collection3 = await Stamp.find({}).populate('reviews').sort({ average: -1 }).limit(3);
    const collection4 = await Clothes.find({}).populate('reviews').sort({ average: -1 }).limit(3);

    let roulette = [collection1, collection2, collection3, collection4];

    const min = 0;
    const max = 3;
    const top3 = [];

    let random = Math.round(Math.random() * (max - min) + min);

    roulette.splice(random, 1);

    for (let collection of roulette) {
        collection.sort((a, b) => (b.average - a.average));
        top3.push(collection[0]);
    }

    console.log(top3);

    for (let one of top3) {
        console.log(one);
    }

    return top3;
};

module.exports = {
    getThreeFromTopRated
};