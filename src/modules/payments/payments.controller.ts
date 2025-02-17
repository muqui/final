

/*import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':paymentId')
  async getPaymentStatus(@Param('paymentId') paymentId: string) {
    return this.paymentsService.getPaymentStatus(paymentId);
  }

  @Post()
  async createPayment(@Body() createPaymentDto: { orderId: string; price: number }) {
    return this.paymentsService.createPayment(createPaymentDto.orderId, createPaymentDto.price);
  }

  @Post('webhook')
  async handleMercadoPagoWebhook(@Body() payload: any) {
    console.log('Evento recibido de Mercado Pago:', payload);
    
    if (payload.action === 'payment.updated') {
      const paymentId = payload.data.id; 
      await this.paymentsService.processPaymentUpdated(paymentId);
    } else if (payload.type === 'payment.succeeded') {
      console.log(`Pago exitoso: ${payload.data.id}`);
    } else if (payload.type === 'payment.rejected') {
      console.log(`Pago rechazado: ${payload.data.id}`);
    } else {
      console.log('Evento desconocido:', payload);
    }

    return { status: 'success' };
  }
}*/

/*import { Controller, Post, Get, Param, Body, BadRequestException, Query, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':paymentId')
  async getPaymentStatus(@Param('paymentId') paymentId: string) {
    return this.paymentsService.getPaymentStatus(paymentId);
  }

  @Post()
  async createPayment(@Body() createPaymentDto: { orderId: string; price: number }) {
    return this.paymentsService.createPayment(createPaymentDto.orderId, createPaymentDto.price);
  }

  /*@Post('webhook')
  async handleMercadoPagoWebhook(@Body() payload: any) {
    console.log('Evento recibido de Mercado Pago:', payload);
    
    if (payload.action === 'payment.updated') {
      const paymentId = payload.data.id; 
      await this.paymentsService.processPaymentUpdated(paymentId);
    } else if (payload.type === 'payment.succeeded') {
      console.log(`Pago exitoso: ${payload.data.id}`);
    } else if (payload.type === 'payment.rejected') {
      console.log(`Pago rechazado: ${payload.data.id}`);
    } else {
      console.log('Evento desconocido:', payload);
    }

    return { status: 'success' };
  }*/

    
    
     /* @Post('webhook')
      async handleMercadoPagoWebhook(@Query() query: any, @Body() payload: any) {
        console.log('Webhook recibido:', { query, payload });
    
        const { id, topic } = query;
    
        if (topic === 'payment') {
          console.log(`Notificación de pago recibida. ID: ${id}`);
          
          try {
            await this.paymentsService.processPaymentUpdated(id);
          } catch (error) {
            console.error('Error procesando el pago:', error);
          }
        } else {
          console.log(' Evento desconocido:', query);
        }
    
        return { status: 'received' };
      }*/
    
        /*@Post('/webhook')
        async handleMercadoPagoWebhook(@Query() query: any, @Body() payload: any,@Req() req: Request ) {
          console.log('Webhook recibido:', { query, payload: req.body  });
        
          const paymentId = query.id || payload.data?.id; 
        
          console.log('ID del pago recibido:', paymentId);
        
          if (!paymentId) {
            console.warn('No se recibió un ID de pago válido.');
            return { status: 'error', message: 'No payment ID received' };
          }
        
          if (query.topic === 'payment') {
            console.log(`Notificación de pago recibida. ID: ${paymentId}`);
        
            try {
              await this.paymentsService.processPaymentUpdated(paymentId);
            } catch (error) {
              console.error('Error procesando el pago:', error);
            }
          } else {
            console.log('Evento desconocido:', query);
          }
        
          return { status: 'received' };
        }
        

  @Get('/status')
async checkPaymentStatus(@Query('orderId') orderId: string) {
  if (!orderId) throw new BadRequestException('orderId es requerido.');
  return await this.paymentsService.getPaymentStatus(orderId);
}

}*/

