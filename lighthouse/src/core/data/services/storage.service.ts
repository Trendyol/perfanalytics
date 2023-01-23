export abstract class IStorageService {
  abstract upload(file: string, id: string): Promise<string>;
}
