export interface SyncDatabaseApi {
    syncDatabase(offset:number, limit:number):Promise<{ [key:string]: string | number | boolean}>
}