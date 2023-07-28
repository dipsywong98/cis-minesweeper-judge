import packageJson from '../../../package.json';

const { version, name } = packageJson;

type EnvType = string | Promise<string> | number | string[] | boolean;

function env(key: string, fallback: string): string;
function env(key: string, fallback: Promise<string>): Promise<string>;

function env(key: string, fallback: number): number;

function env(key: string, fallback: string[]): string[];

function env(key: string, fallback: boolean): boolean;

function env(key: string, fallback: EnvType): EnvType {
  const value = process.env[key];
  if (typeof fallback === 'string') {
    return value ?? fallback;
  }
  if (typeof fallback === 'number') {
    return Number.parseFloat(env(key, fallback.toString()));
  }
  if (typeof fallback === 'boolean') {
    return value !== undefined ? value === 'true' : fallback
  }
  if (Array.isArray(fallback)) {
    return value?.split(',') ?? fallback;
  }
  return Promise.resolve(value ?? fallback);
}

const config = {
  APP_NAME: env('APP_NAME', name),
  APP_URL: env('APP_URL', `https://${env('VERCEL_URL', 'localhost:3000')}`),
  MINESWEEPER_UI_URL: env('MINESWEEPER_UI_URL', 'http://localhost:5173/cis-minesweeper'),
  COORDINATOR_TOKEN: env('COORDINATOR_TOKEN', ''),
  API_KEY: env('API_KEY', 'api-key'),
  ENABLE_FAKE_STUDENT: env('ENABLE_FAKE_STUDENT', false),
  APP_VERSION: version,
};

export default config;