import { Button } from '@idriss-xyz/ui/button';
export const ExtensionSectionActions = () => {
  return (
    <>
      <Button
        intent="secondary"
        size="large"
        className="w-full text-button2 lg:w-fit lg:text-button1"
        asLink
        href="https://chromewebstore.google.com/detail/idriss/fghhpjoffbgecjikiipbkpdakfmkbmig"
        target="_blank"
        rel="noopener noreferrer"
      >
        DOWNLOAD EXTENSION
      </Button>
      <Button
        intent="tertiary"
        size="large"
        className="pl-[28px] text-button2 text-[#E2E2E2] lg:text-button1"
        asLink
        href="https://docs.idriss.xyz/"
        target="_blank"
        rel="noopener noreferrer"
      >
        LEARN MORE
      </Button>
    </>
  );
};
