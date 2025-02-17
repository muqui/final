import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { config as envConfig } from 'dotenv';
envConfig({
    path: '.env',
  });


@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  }

  async createPaymentIntent(amount: number, currency: string, reference: string) {
   const session =  await this.stripe.checkout.sessions.create({
    client_reference_id: reference, // Aquí va tu número de orden único
      line_items: [
        {
          price_data: {
            product_data: {
              name: 'lap',
              description: 'descr',
            },
            currency: 'usd',
            unit_amount: amount, // Corregido aquí
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
     // success_url: 'http://localhost:3000', // Agregamos http://
     success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',

    });

    

    return session;
    

  }

  async getSessionInfo(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    return {
      paymentIntentId: session.payment_intent,
      clientReferenceId: session.client_reference_id,
      amountTotal: session.amount_total,
      currency: session.currency,
    };
  }

  

}
