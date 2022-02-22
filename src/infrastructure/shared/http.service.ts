import { IHttpService } from "../../application/services/ihttp.service";
import fetch from 'cross-fetch';
import { Injectable } from "@nestjs/common";

@Injectable()
export class HttpService implements IHttpService {
    
    async get<TType>(url: string): Promise<TType> {
        return await fetch(url)
            .then(resp => resp.json());
    }
}