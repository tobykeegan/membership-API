import mongodb from 'mongodb';

export const client = mongodb.MongoClient;

export const db = `mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb/db`;
