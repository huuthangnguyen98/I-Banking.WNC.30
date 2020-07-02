export const thousandsSeparators = num => {
    let numParts = num.toString().split('.');
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return numParts.join('.');
};

export const objectIndexOf = (array, value, keyName) => {
    let index = -1;
    array.map((item, itemIndex) => {
        if (item[keyName] === value) {
            index = itemIndex;
        }
    });
    return index;
};