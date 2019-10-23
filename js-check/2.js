const USER = {
    firstName: 'John',
    lastName: 'Doe',
    rate: 0.86,
    address: {
        line1: '15 Macon St',
        line2: '',
        city: 'Gotham'
    },
    phoneNumbers: [
        {
            type: 'MOBILE',
            number: '(555) 555-1234'
        },
        {
            type: 'LINE',
            number: '(555) 555-5678'
        }
    ]
};

function checkObjectProperties(object) {
    let propsErrors = [];
    const phoneMask = /^(\()+\d{3}(\))+(\s)+\d{3}(-)\d{4}$/;

    function checkDeepProps(obj) {
        Object.entries(obj)
            .forEach(([propertyName, propertyValue]) => {
                switch (propertyName) {
                    case 'rate':
                        return !(typeof propertyValue === 'number' && (0 <= propertyValue <= 1))
                            && addFieldError(propertyName);
                    case 'address':
                        return typeof propertyValue === 'object' && Object.keys(propertyValue).length
                            ? checkDeepProps(propertyValue)
                            : addFieldError(propertyName);
                    case 'phoneNumbers':
                        return Array.isArray(propertyValue) && propertyValue.length >= 1
                            ? propertyValue.forEach(itemObj => checkDeepProps(itemObj))
                            : addFieldError(propertyName);
                    case 'type':
                        return !(propertyValue === 'MOBILE' || propertyValue === 'LINE' || propertyValue === 'VOIP')
                            && addFieldError(propertyName);
                    case 'number':
                        return !(typeof propertyValue === 'string' && phoneMask.test(propertyValue))
                            && addFieldError(propertyName);
                    default:
                        return typeof propertyValue !== 'string' && addFieldError(propertyName)
                }
            });
    }

    function addFieldError(fieldName) {
        propsErrors.push(`The property ${fieldName} value is invalid`)
    }

    checkDeepProps(object);

    propsErrors.length
        ? console.table(propsErrors)
        : console.log('All objects properties are valid')
}

checkObjectProperties(USER);
