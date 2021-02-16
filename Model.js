const Model = function (Schema) {
    return function () {
        var newSchema = {...Schema}
        return newSchema
    }
}
