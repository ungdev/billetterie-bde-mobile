import { Injectable } from '@angular/core';

import axios from 'axios'
import { ENV } from '../config/env'

@Injectable()
export class RequestService {
    private api: any
    constructor () {
      this.api = axios.create({ baseURL: ENV.BACKEND_API_URL })
    }

    post(endpoint: string, data: object) {
      return this.api.post(endpoint, data)
    }
    get(endpoint: string) {
      return this.api.get(endpoint)
    }


}
