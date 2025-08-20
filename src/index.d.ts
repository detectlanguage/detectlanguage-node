export interface Options {
  timeout?: number,
  protocol?: string,
  host?: string,
  apiVersion?: string,
}

export interface DetectionResult {
  language: string,
  score: number,
}

export interface Language {
  code: string,
  name: string,
}

export interface AccountStatus {
  status: string,
  date: string,
  requests: number,
  bytes: number,
  plan: string,
  plan_expires?: string,
  daily_requests_limit: number,
  daily_bytes_limit: number,
}

export interface Client {
  get(path: string): Promise<any>;
  post(path: string, data: any): Promise<any>;
}

export default class DetectLanguage {
  client: Client;
  constructor (apiKey: string, options?: Options);
  detect(text: string): Promise<DetectionResult[]>
  detectBatch(texts: string[]): Promise<DetectionResult[][]>;
  detectCode(text: string): Promise<string | null>;
  languages(): Promise<Language[]>;
  accountStatus(): Promise<AccountStatus>;
}
