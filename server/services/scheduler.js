import cron from 'node-cron';
import { generateArticleDb } from '../controllers/articlesController.js';
import { getAllArticles } from './articleService.js';


function getLeastUsedCategory(articles) {
    const allowed = [
        "Technology",
        "Security",
        "Gaming",
        "Business",
        "Development",
        "Science"
    ];

    const counts = allowed.reduce((acc, cat) => {
        acc[cat] = 0;
        return acc;
    }, {});

    for (const article of articles) {
        if (allowed.includes(article.category)) {
            counts[article.category]++;
        }
    }

    return Object.entries(counts).sort((a, b) => a[1] - b[1])[0][0];
}

export function scheduleArticleGenerator() {
    cron.schedule('0 0 * * *', async () => {
        try {
            console.log("Starting scheduled article generation...");

            const articles = getAllArticles();
            const category = getLeastUsedCategory(articles)
            const titles = articles.map(a => a.title);
            await generateArticleDb(titles, category);

            console.log("Article generated successfully!");
        } catch (err) {
            console.error("Failed to generate article in cron:", err);
        }
    }, {
        timezone: 'Europe/Lisbon'
    });
}
