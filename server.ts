import lib from 'pipedrive'
import Appcontroller from "./app"

class Server{
    app = Appcontroller.express;
    lib = lib.Configuration.apiToken = `${process.env.PIPEDRIVE_API_KET}`;
    constructor(){
        this.app = app
        this.lib = lib

    }
}

const app = Appcontroller.express

lib.Configuration.apiToken = `${process.env.PIPEDRIVE_API_KET}`;

app.listen(process.env.PORT || 1800)
app.listen(process.env.PORT || 3000)


export default new Server();