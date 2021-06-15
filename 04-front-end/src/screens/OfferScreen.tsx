import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import IOffer from '../models/OfferModel';
import { getOffers } from '../API';
import MainMenu from '../components/MainMenu';

function OfferScreen() {
    const [offers, setOffers] = useState<IOffer[]>([])

    useEffect(() => {
        fetchOffers()
    }, [])

    const fetchOffers = (): void => {
        getOffers()
        .then(({ data: { offers } }: IOffer[] | any) => setOffers(offers))
        .catch((err: Error) => console.log(err))
    }
    
    return (
    <>
        
        <MainMenu></MainMenu>
        <h1>Ponude</h1>
        <ul>
            {offers.map((offer: IOffer) => (
                <li>
                    {{offer}}
                </li> 
        ))}
        </ul>
        
    </>
  );
}

export default OfferScreen;