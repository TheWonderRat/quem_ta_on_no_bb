declare namespace Express{
	export interface Request{
		user:{
			inscricao:string
		}
	}
}

declare module 'jsonwebtoken'{
	export interface JwtPayload{
		user:{
			userId:string,
			allowedFiles: string[],
			fileSize: number,
			fileName: string,
		}
	}
}
