import pdf2table from 'pdf2table';
import { OpenAI } from "openai"
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import transactionDummy from '../data/transactions.js';
import moment from "moment"
import cache from "../services/cache.service.js"
import telegramService from "../services/telegram.service.js"

export const parsePDF = async (req, res) => {

	// const pdfParsed = await extractPdfTable(req.body)
	try {
		pdf2table.parse(req.body, async function(err, rows, rowsdebug) {
			if(err) {
				console.log(err);
				res.json([]);
			}

			let string = ''
			rows.forEach(row => {
				if(string) string += '\n'
				string += row.join(' || ')
			})

			const limitError = checkLimit(req.headers['financista']);

			if(limitError) {
				res.status(429).json(limitError);
				return;
			}

			// console.log(string)

			const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

			const TransactionItem = z.object({
				date: z.string(),
				amount: z.number(),
				type: z.enum(['income', 'expense']),
				description: z.string(),
				category: z.string().optional().nullable(),
			});

			const TransactionsList = z.object({
				transactions: z.array(TransactionItem),
			});

			const openAICompletion = await openai.chat.completions.parse({
				model: "gpt-4o-2024-08-06",
				messages: [
					{
						role: "system",
						content: "You are a financial data extractor. Extract bank transactions from provided text (not all provided text might be relevant). Each transaction starts with new line (even though not all lines are transactions). Each field is separated by  ' || '. Return dates in YYYY-MM-DD format.",
					},
					{
						role: "user",
						content: string
					},
				],
				response_format: zodResponseFormat(TransactionsList, 'transactions_list'),
			});

			const finalData = openAICompletion?.choices?.[0]?.message?.parsed?.transactions || [];

			// const finalData = transactionDummy;

			finalData.map(item => {
				item.date = moment(item.date).format('YYYY-MM-DD');
			})

			// await sleep(2000);

			// console.log(finalData);

			res.json(finalData);
		});
	} catch (error) {
		console.log(error.message);
		res.json([]);
	}


	// const pdfParser = new PDFParser();
	//
	// pdfParser.on("pdfParser_dataReady", (pdfData) => {
	// 	const allText = [];
	// 	pdfData.Pages.forEach((page, pageIndex) => {
	// 		page.Texts.forEach((text) => {
	// 			const str = decodeURIComponent(text.R[0].T);
	// 			console.log(str);
	// 			allText.push(`[p${pageIndex + 1}] ${str}`);
	// 		});
	// 	});
	//
	// 	res.json({
	// 		raw: pdfData,
	// 		textLines: allText,
	// 	});
	// });
	//
	// pdfParser.on("pdfParser_dataError", (err) => {
	// 	res.status(500).send("Error parsing PDF: " + JSON.stringify(err));
	// });
	//
	// pdfParser.parseBuffer(req.body);



};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const checkLimit = (userId) => {
	const key = `${userId}_count`

	const counter = Number(cache.get(key) || 0)

	console.log(key, counter)

	telegramService.sendMessage(`user ${userId} used pdf to table ${counter + 1} times`).then().catch()

	if(counter >= 3) {
		return 'Limit exceeded';
	}

	const days = 2

	cache.set(key , (counter + 1), 60*60*24*days )

	return null
}

export default { parsePDF };
