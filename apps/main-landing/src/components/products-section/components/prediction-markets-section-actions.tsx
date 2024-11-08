import { Button } from '@idriss-xyz/ui/button';
export const PredictionMarketsSectionActions = () => {
  return (
    <>
      <input
        className="flex h-12 w-full flex-[1_0_0] items-center rounded-[12px] border px-3 py-2 shadow-[0_0_0_4px_rgba(242,242,242,0.14)] lg:w-[290px]"
        placeholder="Your email"
      />
      <Button
        intent="secondary"
        size="medium"
        className="w-full text-button2 lg:w-fit lg:text-button1"
        asLink
        href="https://chromewebstore.google.com/detail/idriss/fghhpjoffbgecjikiipbkpdakfmkbmig"
        target="_blank"
        rel="noopener noreferrer"
      >
        GET EARLY ACCESS
      </Button>
    </>
  );
};
