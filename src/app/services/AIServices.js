import { GoogleGenAI } from "@google/genai";
class AIServices {
    constructor() {
        this.ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });
    }
    async parseTaskPrompt(prompt) {
        const currentDate = new Date().toISOString();

        const models = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-3.5-flash-lite'];

        for (const model of models) {
            try {
                const response = await this.ai.models.generateContent({
                    model: model,
                    contents: `Data atual de referencia: ${currentDate}. \n Comando do Usuario: "${prompt}"`,
                    config: {
                        systemInstruction: `Você é um assistente que extrai informações de tarefas em linguagem natural.
Extraia:
- task: o título da ação que precisa ser feita.
- due_date: a data e hora de vencimento calculada em formato ISO 8601 UTC (ou null se não informada).
- tag_name: a categoria ou etiqueta mencionada (ou null se não informada).
- tag_color: uma cor em código hexadecimal (#RRGGBB) que combine com o contexto da tag (ou null se tag_name for null).`,
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: 'OBJECT',
                            properties: {
                                task: { type: 'STRING' },
                                due_date: { type: 'STRING', description: 'Data e hora de vencimento em formato ISO 8601 UTC (ou null se não informada).', nullable: true },
                                tag_name: { type: 'STRING', description: 'Nome da tag ou categoria (ou null se não informada).', nullable: true },
                                tag_color: { type: 'STRING', description: 'Código de cor hexadecimal (#RRGGBB) que combine com a tag (ou null se tag_name for null).', nullable: true },
                            },
                            required: ['task'],
                        },
                    },
                });
                return JSON.parse(response.text);
            } catch (err) {
                if (err.status === 503 || err.message?.includes("503")) {
                    console.log(`[Gemini] Modelo ${model} com alta demanda (503). Tentando modelo alternativo...`);
                    continue;
                }
                throw err;
            }
        }
    }


}
export default new AIServices();