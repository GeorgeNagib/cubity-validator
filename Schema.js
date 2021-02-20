class ValidatorClass {
    constructor() {
        this.__MODEL__ = {};
        this.__ERRORS__ = [];
        this.__IS_VALID__ = true;
        this.__MODES__ = {default: []}
        
    }

   
    newField = function(name, fn) {
        this[`__FIELD__${name}`] = fn;
        this.__MODES__.default.push(name);
    }

    newMood = function (name, values) {
        
        if(!name) throw new Error("Please provide the name of the mood.");
        if(!values) throw new Error("Please provide the feild of the mood.");
        if(!Array.isArray(values)) throw new Error("Please pass the feild to validate in an array form.")
        this.__MODES__[name] = [...values];
    }
    

    validate = async (Instanse, mode = this.__MODES__.default) => {
        this.__MODEL__ = Instanse;
        
        if(typeof mode == 'string') {
            mode = this.__MODES__[mode];
            if(mode == undefined) throw new Error("You cannot use mode isn't defined, define on using (newMode) method.")
        }
        for(var i = 0; i < mode.length; i++) {
            var el = mode[i];
            const validatorFunction = this[`__FIELD__${el}`];
            if(!validatorFunction) throw new Error(`There is no valid feild function with the key ${el}, it must be a string typed or and int, please double check the field validators and moods.`)
            if(typeof validatorFunction != 'function') throw new Error(`validation function must be [Function] typed, got ${typeof validatorFunction} which is invalid,  please double check the field validator [${el}].`)

            const result = await this[`__FIELD__${el}`]() || [];
            if(result.length > 0) {
                this.__IS_VALID__ = false;
                this.__ERRORS__.push({ [`${el}`]: result});
            }
        }
        return {
            isValid: this.__IS_VALID__,
            errors: this.__ERRORS__
        }
    }

}

module.exports = ValidationClass;
