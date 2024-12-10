
import express from 'express';
import cors from 'cors';
import { getRoutesFromLifi } from './lifi.mjs';

const app = express();
const port = 3031;

app.use(cors());
app.use(express.json());

const { getQuoteFromLifi } = await import('./lifi.mjs');

app.post('/api/execute-swap', async (req, res) => {
  try {
    const {
      fromAddress,
      originChain,
      destinationChain,
      originToken,
      destinationToken,
      amount
    } = req.body;

    // Validate required parameters
    if (!originChain || !destinationChain || !originToken || !destinationToken || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }

    const quote = await getQuoteFromLifi(fromAddress, originChain, destinationChain, originToken, destinationToken, amount);

    const quoteResult = {
      success: true,
      estimate: quote.estimate,
      type: quote.type, // for debugging purposes
      tool: quote.tool, // for debugging purposes
      includedSteps: quote.includedSteps, // for debugging purposes
      transactionData: quote.transactionRequest
    };

    res.json(quoteResult);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.post('/api/get-routes', async (req, res) => {
  try {
    const {
      originChain,
      destinationChain,
      originToken,
      destinationToken,
      amount
    } = req.body;

    // Validate required parameters
    if (!originChain || !destinationChain || !originToken || !destinationToken || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }

    const routes = await getRoutesFromLifi(originChain, destinationChain, originToken, destinationToken, amount);

    const routesResult = {
      success: true,
      routes: routes
    };

    res.json(routesResult);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Swap API service running on http://localhost:${port}`);
});
