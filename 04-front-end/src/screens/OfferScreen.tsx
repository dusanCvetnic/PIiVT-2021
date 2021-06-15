import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import axios, { CancelTokenSource } from 'axios';
import MainMenu from '../components/MainMenu';

interface Offer {
    offerId?: number;
    price: number;
    userId?: number;
    cityId?: number;
    subjectId?: number;
}

const defaultOffers: Offer[] = []

function OfferScreen() {
    const [offers, setOffers]: [Offer[], (posts: Offer[]) => void] = React.useState(
        defaultOffers
    )
    
    const [loading, setLoading]: [
        boolean,
        (loading: boolean) => void
      ] = React.useState<boolean>(true);

    const [error, setError]: [string, (error: string) => void] = React.useState(
        ''
    )  

    const cancelToken = axios.CancelToken

    const [cancelTokenSource, setCancelTokenSource]: [
        CancelTokenSource,
        (cancelTokenSource: CancelTokenSource) => void
      ] = React.useState(cancelToken.source())

    React.useEffect(() => {
        axios
          .get<Offer[]>('localhost:5000/offer', {
            cancelToken: cancelTokenSource.token,
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          })
          .then((response) => {
            setOffers(response.data);
            setLoading(false);
          })
          .catch((ex) => {
            let error = axios.isCancel(ex)
              ? 'Resource Not Found'
              : 'An unexpected error has occurred';
    
            setError(error);
            setLoading(false);
          });
    }, []);
    return (
    <>
        
        <MainMenu></MainMenu>
        <h1>Ponude</h1>
        <ul className="posts">
        {offers.map((offer) => (
          <li key={offer.offerId!}>
            <p>{offer.price}</p>
            <p>{offer.userId}</p>
          </li>
            ))}
        </ul>
        
    </>
  );
}

export default OfferScreen;