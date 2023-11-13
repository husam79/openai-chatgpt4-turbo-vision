import analyzeInvoice from "./invoice-analyzer.js";

const args = process.argv.slice(2);
const filePath = args[0]

const result = await analyzeInvoice(filePath);

console.log(result ? result.message.content : "");