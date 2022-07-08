import KVFacrtory from './factory'
import type { StorageOptions } from './interface';

export {StorageOptions, KVStorageEngine, SerializableValue } from './interface'

export {default as LocalStorageEngine} from './engines/local-storage'
export {default as SessionStorageEngine} from './engines/session-storage'

export default function factory(namespace: string, opt?: StorageOptions): KVFacrtory {
	return new KVFacrtory(namespace, opt)
}