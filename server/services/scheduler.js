import cron from 'node-cron';
import { generateArticleDb } from '../controllers/articlesController.js';



export function scheduleArticleGenerator() {
    cron.schedule('0 0 * * *', async () => {
        try {
            console.log("Starting daily article generation...");
            await generateArticleDb();
            console.log("Article generated successfully!");
        } catch (err) {
            console.error("Failed to generate article in cron:", err);
        }
    }, {
        timezone: 'Europe/Lisbon'
    });
}
