import kvFactory, { SessionStorageEngine } from './kv-storage'
import { RequestBuilder } from './requestBuilder';


const ls = kvFactory('user', {engine: new SessionStorageEngine()})

const request = new RequestBuilder()

request.setUrl('www.example.com')
request.setMethod('POST')
const makeRequest = request.build()

makeRequest.fetch()