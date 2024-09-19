/// <reference types="vite/client" />
declare module 'react-shell/Store' {
  // interface GeneralStore {
  //   count: number
  //   // Add more properties as needed based on the actual state shape
  // }
  // interface UseGeneralStore {
  //   getState: () => GeneralStore
  //   subscribe: (callback: (state: GeneralStore) => void) => () => void // Returns an unsubscribe function
  //   setState: (newState: Partial<GeneralStore>) => void // Allows partial updates
  // }
  // const useGeneralStore: UseGeneralStore
  // export default {
  //   useGeneralStore
  // }
}

interface ImportMetaEnv {
  readonly VITE_REACT_APP: string
  // readonly VITE_ANGULAR_APP: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
