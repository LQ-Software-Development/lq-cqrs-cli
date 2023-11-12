export interface IUseCase<ReceivedData, ResponseData> {
  execute(data: ReceivedData): Promise<ResponseData>;
}
