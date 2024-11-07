import { Closable } from 'shared/ui';
import { useExtensionPopup } from 'shared/extension';

import { TopBar, Footer } from './components';
import { Products } from './views';

export const ExtensionPopup = () => {
  const extensionPopup = useExtensionPopup();

  if (!extensionPopup.isVisible) {
    return null;
  }
  return (
    <Closable
      closeButtonClassName="hidden"
      onClose={extensionPopup.hide}
      className="z-popup fixed right-2 top-2 flex w-[460px] flex-col overflow-hidden p-0 shadow-lg"
      closeOnClickAway
    >
      <TopBar className="rounded-t-xl" />
      <Products />
      <Footer className="z-1 rounded-b-xl" />
      {/* <ScrollArea className="grow overflow-y-auto bg-[#F3F4F6]"> */}
      {/*   <Routes> */}
      {/*     <Route path={EXTENSION_POPUP_ROUTE.HOME} element={<HomeView />} /> */}
      {/*     <Route */}
      {/*       path={EXTENSION_POPUP_ROUTE.SETTINGS_HOME} */}
      {/*       element={<MainSettingsView />} */}
      {/*     /> */}
      {/*     <Route */}
      {/*       path={EXTENSION_POPUP_ROUTE.SETTINGS_CUSTOMIZATION} */}
      {/*       element={<CustomizationSettingsView />} */}
      {/*     /> */}
      {/*     <Route */}
      {/*       path={EXTENSION_POPUP_ROUTE.TRADING_COPILOT} */}
      {/*       element={<TradingCopilotView />} */}
      {/*     /> */}
      {/*   </Routes> */}
      {/* </ScrollArea> */}
      {/**/}
      {/* <Footer /> */}
    </Closable>
  );
};
