

/*import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { PaymentsRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
  private mercadoPagoUrl = 'https://api.mercadopago.com/checkout/preferences';
  private mercadoPagoPaymentUrl = 'https://api.mercadopago.com/v1/payments';

  constructor(
    private configService: ConfigService,
    private readonly paymentsRepository: PaymentsRepository,
  ) {}

  async createPayment(orderId: string, price: number) {
    try {
      const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
      console.log('🔍 Access Token:', accessToken);
      
      const response = await axios.post(
        this.mercadoPagoUrl,
        {
          items: [
            {
              title: `Pago por orden ${orderId}`,
              quantity: 1,
              currency_id: 'COP',
              unit_price: price,
            },
          ],
          back_urls: {
            success: 'http://localhost:3000/payments/success',
            failure: 'http://localhost:3000/payments/failure',
            pending: 'http://localhost:3000/payments/pending',
          },
          auto_return: 'approved',
          external_reference: orderId,            
          /*payer: {
            email: 'test_user_12345678@test.com',    
          },*/
       /* },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      await this.paymentsRepository.createPayment(orderId, price);
      return { paymentUrl: response.data.init_point };
    } catch (error) {
      console.log('Error Mercado Pago:', error.response?.data || error.message);
      throw new Error(`Error al crear pago: ${error.message}`);
    }
  }

  async getPaymentStatus(paymentId: string) {
    try {
      const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
      
      const response = await axios.get(
        `${this.mercadoPagoPaymentUrl}/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const status = response.data.status;
      await this.paymentsRepository.updatePaymentStatus(paymentId, status);
      return status;
    } catch (error) {
      throw new Error(`Error al obtener el estado del pago: ${error.message}`);
    }
  }

  async processPaymentUpdated(paymentId: string) {
    console.log(` Evento de pago actualizado recibido. ID: ${paymentId}`);
  

    const updated = await this.paymentsRepository.updatePaymentStatus(paymentId, 'approved');
  
    if (updated) {
      console.log(`Pago con ID ${paymentId} actualizado a estado: approved`);
    } else {
      console.log(`No se encontró pago con ID: ${paymentId} en la base de datos`);
    }
  }  
  
}*/


/*import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { PaymentsRepository } from './payments.repository';
import { v4 as uuidv4 } from 'uuid';
import { OrdersRepository } from '../orders/orders.repository';

@Injectable()
export class PaymentsService {
  private mercadoPagoUrl = 'https://api.mercadopago.com/checkout/preferences';
  private mercadoPagoPaymentUrl = 'https://api.mercadopago.com/v1/payments';

  constructor(
    private configService: ConfigService,
    private readonly paymentsRepository: PaymentsRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  /*async createPayment(orderId: string, price: number) {
    try {
        const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
        console.log('🔍 Access Token:', accessToken);
      
        const response = await axios.post(
            this.mercadoPagoUrl,
            {
                items: [
                    {
                        title: `Pago por orden ${orderId}`,
                        quantity: 1,
                        currency_id: 'COP',
                        unit_price: price,
                    },
                ],
                back_urls: {
                    success: 'http://localhost:3000/payments/success',
                    failure: 'http://localhost:3000/payments/failure',
                    pending: 'http://localhost:3000/payments/pending',
                },
                auto_return: 'approved',
                external_reference: orderId,
                payment_methods: {
                    excluded_payment_types: [],
                    installments: 6 
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        console.log('Respuesta completa de Mercado Pago:', JSON.stringify(response.data, null, 2));

        await this.paymentsRepository.createPayment(orderId, price);
        return { paymentUrl: response.data.init_point };
    } catch (error) {
        console.log('Error Mercado Pago:', JSON.stringify(error.response?.data || error.message, null, 2));
        throw new Error(`Error al crear pago: ${JSON.stringify(error.response?.data)}`);
    }
}*/

/*async createPayment(orderId: string, price: number) { //ACTUAL
  try {
    const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
    console.log('🔍 Access Token:', accessToken);
    
    const response = await axios.post(
      this.mercadoPagoUrl,
      {
        items: [
          {
            title: `Pago por orden ${orderId}`,
            quantity: 1,
            currency_id: 'COP',
            unit_price: price,
          },
        ],
        back_urls: {
          success: 'http://localhost:3000/payments/success',
          failure: 'http://localhost:3000/payments/failure',
          pending: 'http://localhost:3000/payments/pending',
        },
        auto_return: 'approved',
        external_reference: orderId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(`Mercado Pago creó la preferencia con ID: ${response.data.id}`);

    // 🛠 Obtiene la referencia del pedido sin cargar todos los datos
    const orderReference = await this.ordersRepository.findOne(orderId);

    if (!orderReference) {
      throw new Error('Error: No se encontró la orden con el ID proporcionado.');
    }

    // Guarda el ID de Mercado Pago en `externalOrderId`
    await this.paymentsRepository.createPayment({
      id: uuidv4(),
      price,
      invoicePaidAt: new Date(),
      status: 'pending',
      externalOrderId: response.data.id, 
      order: orderReference, 
    });

    return { paymentUrl: response.data.init_point };
  } catch (error) {
    console.error(' Error Mercado Pago:', error.response?.data || error.message);
    throw new Error(`Error al crear pago: ${JSON.stringify(error.response?.data)}`);
  }
}*/

/*async createPayment(orderId: string, price: number) {
  try {
    const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
    if (!accessToken) throw new Error('Error: MERCADOPAGO_ACCESS_TOKEN no está configurado.');

    console.log('🔍 Access Token:', accessToken);
    
    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      {
        items: [
          {
            title: `Pago por orden ${orderId}`,
            quantity: 1,
            currency_id: 'COP',
            unit_price: price,
          },
        ],
        back_urls: {
          success: 'http://localhost:3000/payments/success?orderId=${orderId}',
          failure: 'http://localhost:3000/payments/failure?orderId=${orderId}',
          pending: 'http://localhost:3000/payments/pending?orderId=${orderId}',
        },
        auto_return: 'approved',
        external_reference: orderId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(` Mercado Pago creó la preferencia con ID: ${response.data.id}`);

    // Obtiene la referencia del pedido sin cargar todos los datos innecesarios
    const orderReference = await this.ordersRepository.findOne(orderId);

    if (!orderReference) {
      throw new Error(' Error: No se encontró la orden con el ID proporcionado.');
    }

    // Guarda el ID de Mercado Pago en `externalOrderId`
    await this.paymentsRepository.createPayment({
      id: uuidv4(),
      price,
      invoicePaidAt: null, 
      status: 'pending',
      externalOrderId: response.data.id, 
      order: orderReference,
    });
   
    console.log(` Mercado Pago creó la preferencia con ID: ${response.data.id}`);

    // 🔍 Log del ID de pago antes de guardarlo en la base de datos
    console.log('ID de pago enviado a Mercado Pago:', response.data.id);


    return { paymentUrl: response.data.init_point };
  } catch (error) {
    console.error(' Error Mercado Pago:', error.response?.data || error.message);
    throw new Error(`Error al crear pago: ${JSON.stringify(error.response?.data || error.message)}`);
  }
}




/*async createPayment(orderId: string, price: number) {
  try {
      const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
      console.log('🔍 Access Token:', accessToken);
      
      const response = await axios.post(
          this.mercadoPagoUrl,
          {
              items: [
                  {
                      title: `Pago por orden ${orderId}`,
                      quantity: 1,
                      currency_id: 'COP',
                      unit_price: price,
                  },
              ],
              back_urls: {
                  success: 'http://localhost:3000/payments/success',
                  failure: 'http://localhost:3000/payments/failure',
                  pending: 'http://localhost:3000/payments/pending',
              },
              auto_return: 'approved',
              external_reference: orderId,    
          },
          {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
              },
          },
      );

      console.log(` Mercado Pago creó la preferencia con ID: ${response.data.id}`);

      // Guarda el ID de Mercado Pago en la base de datos
      await this.paymentsRepository.createPayment(response.data.id, price);

      return { paymentUrl: response.data.init_point };
  } catch (error) {
      console.error(' Error Mercado Pago:', error.response?.data || error.message);
      throw new Error(`Error al crear pago: ${JSON.stringify(error.response?.data)}`);
  }
}*/


  /*async getPaymentStatus(paymentId: string) {
    try {
      const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
      
      const response = await axios.get(
        `${this.mercadoPagoPaymentUrl}/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const status = response.data.status;
      await this.paymentsRepository.updatePaymentStatus(paymentId, status);
      return status;
    } catch (error) {
      throw new Error(`Error al obtener el estado del pago: ${error.message}`);
    }


  }*/

    /*async getPaymentStatus(paymentId: string) {
      try {
          const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
          
          console.log(`🔍 Consultando estado de pago para ID: ${paymentId}`);
  
          const response = await axios.get(
              `${this.mercadoPagoPaymentUrl}/${paymentId}`,
              {
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                  },
              },
          );
  
          console.log(` Respuesta de Mercado Pago:`, response.data);
  
          const status = response.data.status;
          await this.paymentsRepository.updatePaymentStatus(paymentId, status);
          return status;
      } catch (error) {
          console.error(` Error al obtener el estado del pago:`, error.response?.data || error.message);
          throw new Error(`Error al obtener el estado del pago: ${JSON.stringify(error.response?.data)}`);
      }
  }*/

   //  Obtener estado del pago directamente con orderId
   /*async getPaymentStatus(orderId: string) {
    try {
      const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');

      //  Buscamos el pago usando el `orderId` (que está en `external_reference`)
      const response = await axios.get(
        'https://api.mercadopago.com/v1/payments/search',
        {
          params: { external_reference: orderId },
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const payments = response.data.results;

      if (payments.length === 0) {
        return { message: 'El pago aún no ha sido realizado o no se encontró.', status: 'pending' };
      }

     
      const payment = payments[0];
      const paymentId = payment.id;
      const status = payment.status;

      
      await this.paymentsRepository.updatePaymentStatus(paymentId, status);

      return { paymentId, status };
    } catch (error) {
      console.error(' Error al obtener el estado del pago:', error.response?.data || error.message);
      throw new Error(`Error al obtener el estado del pago: ${JSON.stringify(error.response?.data)}`);
    }
  }
  

  async processPaymentUpdated(paymentId: string) {
    console.log(`🔍 Evento de pago actualizado recibido. ID: ${paymentId}`);
  
    const updated = await this.paymentsRepository.updatePaymentStatus(paymentId, 'approved');
  
    if (updated) {
      console.log(`Pago con ID ${paymentId} actualizado a estado: approved`);
    } else {
      console.log(`No se encontró pago con ID: ${paymentId} en la base de datos`);
    }
  }  
}*/




