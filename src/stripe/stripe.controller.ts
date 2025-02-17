import { Controller, Post, Body, Get, Query, Headers, Req, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';
import { IncomingMessage } from 'http';
import { config as envConfig } from 'dotenv';
import { Request, Response } from 'express';
envConfig();  // Asegúrate de llamar a dotenv antes de cualquier cosa que dependa de las variables de entorno

@Controller('stripe')
export class StripeController {
  private stripe: Stripe;
  private endpointSecret: string;

  constructor(
    private readonly stripeService: StripeService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    this.endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  }

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number; currency: string; reference: string }) {
    return this.stripeService.createPaymentIntent(body.amount, body.currency, body.reference);
  }

  @Get('success')
  async getSessionInfo(@Query('session_id') sessionId: string) {
    return this.stripeService.getSessionInfo(sessionId);
  }

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    console.log("webhook")
    console.log(req.body)
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(req.body, sig, this.endpointSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }

    if (!['payment_link.created', 'payment_link.updated'].includes(event.type)) {
      res.send();
      return;
    }

    const paymentLink = event.data.object;
    console.log(paymentLink);

    res.status(200).send();

    
  }


}
