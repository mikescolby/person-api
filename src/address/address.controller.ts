import * as express from 'express';
import { Request, Response, NextFunction } from "express";

import { Controller } from "../controllers/controller.interface";

import { Address } from './address.model';
import { AddressService } from './address.service';
import { AddressValidator} from './address.validator';

export class AddressController implements Controller {
    public router = express.Router();

    private addressService: AddressService = new AddressService();
    private addressValidator: AddressValidator = new AddressValidator();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get("/addresses", this.getAddresses);
        this.router.post("/addresss", this.saveAddress);
    };

    private getAddresses = (req: Request, res: Response<Address[]>, next: NextFunction) => {
        let addresses = this.addressService.getAddresses();
        return res.json(addresses);
    };

    private saveAddress = (req: Request<Address>, res: Response, next: NextFunction) => {
        let address = req.body.address;
        
        // let address: Address = {
        //     street: addressBody.street,
        //     city: addressBody.city,
        //     state: addressBody.state,
        //     zipcode: addressBody.zipcode
        // }

        this.addressValidator.validate(address);

        this.addressService.saveAddress(address);
        return res.status(200).send();
    }
}
