export interface IQueueService {
    send(msg: any): Promise<void>;
}