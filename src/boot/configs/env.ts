export default (() => {
    return {
        port: process.env.PORT || 4500,
        host: process.env.HOST || 'http://localhost'
    }
})()
