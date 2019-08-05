export interface UrlConfigItem {
  readonly base: string;
  readonly name: string;
  readonly enabled: boolean;
}

export interface MysqlConfig {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly database: string;
}

export interface SharedConfig {
  language: string;
  readonly serverPort: number;
  readonly userAgent: number;
  readonly requestRetry: number;
  readonly debugInfo: boolean;
  readonly blacklist: string[];
  readonly whitelist: string[];
  readonly downloadBase: string;
  readonly mysql: MysqlConfig;
}
