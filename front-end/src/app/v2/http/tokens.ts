import { HttpContextToken } from '@angular/common/http';

export const TENANT_ID = new HttpContextToken<string | undefined>(() => undefined);
export const TRACE_ID = new HttpContextToken<string | undefined>(() => undefined);
export const API_VERSION = new HttpContextToken<string>(() => 'v2');
