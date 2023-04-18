import { TranslationServiceClient } from '@google-cloud/translate';

export class GoogleService {
  client: TranslationServiceClient;
  serviceAccount: { project_id: string };
  constructor() {
    this.serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_JSON);
    this.client = new TranslationServiceClient({
      projectId: this.serviceAccount.project_id,
      credentials: this.serviceAccount as any,
    });
  }

  async translate(
    text: string,
    targetLanguage: string,
    sourceLanguage?: string,
  ) {
    const [translation] = await this.client.translateText({
      parent: this.client.locationPath(
        this.serviceAccount.project_id,
        'global',
      ),
      contents: [text],
      mimeType: 'text/plain',
      sourceLanguageCode: sourceLanguage,
      targetLanguageCode: targetLanguage,
    });
    return translation;
  }
}
