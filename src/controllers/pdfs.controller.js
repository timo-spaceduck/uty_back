// import fs from "fs";
// import pdfTableExtractor from "../services/pdf.service.js"
// import PDFParser from "pdf2json";
import pdf2table from 'pdf2table';
import { OpenAI } from "openai"
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export const parsePDF = async (req, res) => {

	// const pdfParsed = await extractPdfTable(req.body)
	try {
		pdf2table.parse(req.body, async function(err, rows, rowsdebug) {
			if(err) {
				console.log(err);
				res.json(false);
			}

			// console.log(rows);

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

			console.log(rows.join('||'));

			res.json(rows);

			return;

			const openAICompletion = await openai.chat.completions.parse({
				model: "gpt-4o-2024-08-06",
				messages: [
					{
						role: "system",
						content: "You are a financial data extractor. Extract bank transactions from provided text (not all provided text might be relevant). Each line is divided by '||' string (even though sometimes lines might be interconnected).",
					},
					{
						role: "user",
						content: rows.join('||')
					},
				],
				response_format: zodResponseFormat(TransactionsList, 'transactions_list'),
			});

			console.log(openAICompletion);

			res.json(openAICompletion?.choices?.[0]?.message?.parsed?.transactions || []);
		});
		// const pdfParsed = await extractPdfTable(req.body)
		// console.log(pdfParsed);
	} catch (error) {
		console.log(error.message);
		res.json(true);
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



	// console.log('req');
	// console.log(req.body);
	//
	// res.json({
	// 	'message': 'PDF parsed successfully',
	// 	'data': {
	// 		'title': 'Sample PDF Title',
	// 		'author': 'John Doe1',
	// 		'pages': 10,
	// 		'content': 'This is a sample content extracted from the PDF.'
	// 	}
	// });
};

export default { parsePDF };
