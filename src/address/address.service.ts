import { Address } from './address.model';

export class AddressService {
    addresses: Address[];

    constructor() {
        console.log('addressService.constructor()');
        this.addresses = [
            {
                street: '5104 W 34th Street N',
                city: 'Sioux Falls',
                state: 'South Dakota',
                zipcode: '57107'
            }
        ];
    }

    public getAddresses(): Address[] {
        return this.addresses;
    }

    public saveAddress(address: Address): Address {
        this.addresses.push(address);
        return address;
    }
}