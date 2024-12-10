import { createConfig, getQuote, getRoutes } from '@lifi/sdk'

createConfig({
  integrator: 'IDRISS',
})

export const getQuoteFromLifi = async (fromAddress, originChain, destinationChain, originToken, destinationToken, amount) => {
  const quote = await getQuote({
    fromAddress: fromAddress,
    fromChain: originChain,
    toChain: destinationChain,
    fromToken: originToken,
    toToken: destinationToken,
    fromAmount: amount,
  })

  return quote;

}

export const getRoutesFromLifi = async (originChain, destinationChain, originToken, destinationToken, amount) => {
  try {
    const routes = await getRoutes({
      fromChainId: originChain,
      toChainId: destinationChain,
      fromTokenAddress: originToken,
      toTokenAddress: destinationToken,
      fromAmount: amount,
    })
    return routes;
  } catch (error) {
    console.log(error)
  }

  return null;

}
