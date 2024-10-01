import makeUseProvider from "@/app/contexts/makeUserProvider";
const { Provider: HeaderProvider, useProvider: useHeaderProvider } = makeUseProvider({});

export {HeaderProvider, useHeaderProvider}