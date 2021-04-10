import { Router } from 'express';
import OrderManager from './OrderControl';

class Routes{
        routes = Router()
    constructor(){
        this.routes.post('/comprar', OrderManager.create);
        this.routes.get('/comprar', OrderManager.index);    
    }
}




export default Routes;