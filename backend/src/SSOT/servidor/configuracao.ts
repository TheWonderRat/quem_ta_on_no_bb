const PORTA_PADRAO_BACKEND: number = 3001;
const HOST_PADRAO_BACKEND: string = 'localhost';

export const HOST_BACK: string = process.env.HOST_BACK || HOST_PADRAO_BACKEND;
export const PORT_BACK: number = Number(process.env.PORT_BACK) || PORTA_PADRAO_BACKEND;
