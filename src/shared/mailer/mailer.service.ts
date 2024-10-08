import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailerService {

	constructor(private readonly service: NestMailerService) { }

	async sendEmailTemplate(email: string): Promise<void> {
		const url = "google.com";

		await this.service.sendMail({
			to: email,
			subject: "test",
			template: "email-verification",
			context: {
				email: email,
				url,
			},
		});
	}

}

