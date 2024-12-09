
import express from 'express';
import cors from 'cors';

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

    const swapCallData = {
      success: true,
      transactionData: quote.transactionRequest
    };

    res.json(swapCallData);
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
