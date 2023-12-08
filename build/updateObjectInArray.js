var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var updateObjectInArray = function (initialArray, key, value, patch) {
    var copiedArray = initialArray.map(function (obj) { return (__assign({}, obj)); });
    var indexToUpdate = copiedArray.findIndex(function (obj) { return (obj[key] === value); });
    if (indexToUpdate !== -1) {
        copiedArray[indexToUpdate] = __assign(__assign({}, copiedArray[indexToUpdate]), patch);
    }
    return copiedArray;
};
export { updateObjectInArray };
