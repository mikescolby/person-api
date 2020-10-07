import { body, ValidationChain, checkSchema } from 'express-validator';

interface Validate {
    validate(): ValidationChain[];
}

export class PersonValidator implements Validate {
    public validate = () => {
        let validationChain: ValidationChain[] = [];
        validationChain.push(this.validateFirstName());
        validationChain.push(this.validateLastName());
        validationChain.push(this.validateAddress());

        return validationChain;
    }

    private validateFirstName = () => {
        return body('firstName')
            .notEmpty().withMessage('firstName cannot be null or empty')
            .isAlpha().withMessage('firstName cannot contain any numbers or symbols');
    }

    private validateLastName = () => {
        return body('lastName')
            .notEmpty().withMessage('lastName cannot be null or empty')
            .isAlpha().withMessage('lastName cannot contain any numbers or symbols');
    }

    private validateAddress = () => {
        return body('address')
            .notEmpty().withMessage('address cannot be null or empty');
    }

    private validateFirstName2 = () => {
        
    }
}