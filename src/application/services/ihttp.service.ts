export interface IHttpService {
    get<TType>(url: string): Promise<TType>;
}