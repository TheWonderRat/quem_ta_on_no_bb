const DEFAULT_BACK_PORT: number = 3001;
const DEFAULT_BACK_HOST: string = 'localhost';

export const HOST_BACK: string = process.env.HOST_BACK || DEFAULT_BACK_HOST;
export const PORT_BACK: number = Number(process.env.PORT_BACK) || DEFAULT_BACK_PORT;
