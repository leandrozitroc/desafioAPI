import Order from '../../db/models/Order';
import post from 'axios';
import { DealsController } from 'pipedrive';
import { BLING_CONSTANTS } from '../Services/bling';
import xmlDeal from '../Services/converter';

class OrderManager {
  async create(req, res) {
    try {
      const { status = 'won' } = req.query;

      let deal = await DealsController.getAllDeals({ status });
      if (!deal) {
        return res.status(400).json({ message: 'Send a Valid Status' });
      }

      const promises = deal.data.forEach(async deal => {
        const order = {
          name: deal.owner_name,
          code: deal.id,
          title: deal.title,
          unitValue: deal.value,
        };

        const xmlDeal1 = xmlDeal(order);

        await post(
          `${BLING_CONSTANTS.BLING_URL}/pedido/json/?apikey=${BLING_CONSTANTS.BLING_API_KEY}&xml=${xmlDeal1}`
        );

        await Order.create({
          id_order: deal.id,
          customer: {
            company: deal.org_name,
            contact_person: deal.person_name,
          },
          item: {
            code: order.code,
            description: deal.title,
            currency: deal.weighted_value_currency,
            total_value: deal.weighted_value,
          },
        });
      });
      await Promise.all(promises);

      return res.status(200);
    } catch (error) {
      return res.json(error);
    }
  }

  async index(req, res) {
    const deal = await Order.find();

    return res.json({ deal });
  }
}

export default new OrderManager();
