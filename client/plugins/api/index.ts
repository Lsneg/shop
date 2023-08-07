export type ApiFunction = (
  endpoint: string,
  options?: RequestInit
) => Promise<any>;

export const config = {
  api: "api/v1",
  currencies: "api/currencies/v1/latest",
};

export default defineNuxtPlugin(
  (nuxtApp: {
    provide: (
      arg0: string,
      arg1: (endpoint: string, options?: RequestInit) => Promise<any>
    ) => void;
  }) => {
    const customFetch = async (endpoint: string, options: RequestInit = {}) => {
      const baseUrl = "/";
      const url = `${baseUrl}${endpoint}`;

      options.headers = {
        ...options.headers,
      };

      try {
        const response = await fetch(url, options);
        return response.json();
      } catch (error) {
        console.log(error);
      }
    };

    nuxtApp.provide("api", customFetch);
  }
);
