import React, {createContext, FC, ReactNode} from 'react';
import getConfig from "next/config";
import { Config } from '@interfaces';


type ConfigProviderProps = {
  children: ReactNode;
};

const ConfigContext = createContext<Config>({} as Config );

export const useConfig = () : Config => {
  return React.useContext(ConfigContext);
};

export const getConfigWithTypes = () : Config => {
  const { publicRuntimeConfig } = getConfig();
  return publicRuntimeConfig as Config;
};

const ConfigProvider: FC<ConfigProviderProps> = ({ children}) => {
  const { publicRuntimeConfig } = getConfig();
  return <ConfigContext.Provider value={publicRuntimeConfig}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
