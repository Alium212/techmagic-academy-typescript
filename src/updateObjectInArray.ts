const updateObjectInArray = <ObjectShape>(
    initialArray: ObjectShape[],
    key: keyof ObjectShape,
    value: ObjectShape[keyof ObjectShape],
    patch: Partial<ObjectShape>
): ObjectShape[] => {
    const copiedArray = initialArray.map(obj => ({ ...obj }));
    const indexToUpdate = copiedArray.findIndex(obj => (obj[key] === value));

    if (indexToUpdate !== -1) {
        copiedArray[indexToUpdate] = { ...copiedArray[indexToUpdate], ...patch };
    }

    return copiedArray;
};

export { updateObjectInArray };