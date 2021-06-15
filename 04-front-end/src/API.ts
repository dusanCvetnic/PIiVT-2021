import axios, { AxiosResponse } from 'axios'
import IOffer from './models/OfferModel';

const baseUrl: string = 'http://localhost:5000'

export const getOffers = async (): Promise<AxiosResponse<IOffer[]>> => {
    try {
      const todos: AxiosResponse<IOffer[]> = await axios.get(
        baseUrl + '/offer'
      )
      return todos
    } catch (error) {
      throw new Error()
    }
}