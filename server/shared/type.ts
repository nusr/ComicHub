export interface UrlConfigItem {
  base: string;
  name: string;
  enabled: boolean;
}

export interface MysqlConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export interface SharedConfig {
  language: string;
  serverPort: number;
  userAgent: number;
  requestRetry: number;
  debugInfo: boolean;
  blacklist: string[];
  whitelist: string[];
  downloadBase: string;
  mysql: MysqlConfig;
}
