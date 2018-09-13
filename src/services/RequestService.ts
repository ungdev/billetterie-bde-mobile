import { Injectable } from '@angular/core';

import axios from 'axios'
import { ENV } from '../config/env'

@Injectable()
export class RequestService {
    private api: any
    constructor () {
      this.api = axios.create({ baseURL: ENV.BACKEND_API_URL });
      // TODO this.api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    post(endpoint: string, data: object) {
      return this.api.post(endpoint, { params: data })
    }
    get(endpoint: string, data: object) {
      return this.api.get(endpoint, { params: data })
    }


}
