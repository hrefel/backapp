let port = '5000';
let host = '127.0.0.1';

module.exports = {
    database: `mongodb://${host}:${port}/expressdb`,
    secret: 'your secret',
    port:port,
    host:host
}