import boot from './index'
import env from './boot/configs/env'

boot.then(app => {
    app.listen(env.port, () => {
        console.log(`${env.host}:${env.port}`)
    })
}).catch(console.error)
