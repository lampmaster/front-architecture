import kvFactory, {SessionStorageEngine} from './kv-storage'

const ls = kvFactory('user', {engine: new SessionStorageEngine()})