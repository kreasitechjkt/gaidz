import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';
import { MailerService } from './mailer.service';
import { ConfigService } from 'src/common';

@Global()
@Module({
	imports: [
		NestMailerModule.forRootAsync({
			useFactory: async (config: ConfigService) => ({
				transport: config.get('mailer.transport'),
				defaults: {
					from: `"${config.get('mailer.defaultName')}" <${config.get('mailer.defaultEmail')}>`,
				},
				template: {
					dir: join(__dirname, 'templates'),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [MailerService],
	exports: [MailerService],
})
export class MailerModule { }
