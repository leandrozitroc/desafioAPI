import lib from 'pipedrive'
import Appcontroller from "./app"

const app = Appcontroller.express

lib.Configuration.apiToken = `${process.env.PIPEDRIVE_API_KET}`;

app.listen(1800)
app.listen(3000)



