const Model = function (Schema) {
    return function () {
        var newSchema = {...Schema}
        return newSchema
    }
}

module.exports = Model;
