export interface KVStorageEngine {
	get(key: string): CanPromise<Nullable<string>>
	set(key: string, value: string): CanPromise<void>
	remove(key: string): CanPromise<void>
}