function lastFirst(array) {
    let sortedArray = [];

    array.forEach((element) => {
        sortedArray.unshift(element)
    });

    return sortedArray;
}

module.exports = lastFirst;