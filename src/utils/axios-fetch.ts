import axios, {
  AxiosError,
  AxiosRequestConfig,
  CancelTokenSource,
} from 'axios';


type TAxiosRequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
interface IAxiosRequest {
  url: string;
  method?: TAxiosRequestMethod;
}

export type TAxiosRequest = IAxiosRequest & AxiosRequestConfig<any>;

export type TAxiosFetchQuery = `?${string}`;
export type TAxiosFetchResponse = Promise<
  {
    success: boolean;
    message: string;
  } & Record<string, any>
>;
export interface IDownload {
  url: string;
  fileName?: string;
}

type TAxiosFetchOptions = Omit<TAxiosRequest, 'method'>;
const axiosFetch = {
  //Get request
  get: async (options: TAxiosFetchOptions): TAxiosFetchResponse =>
    await axiosRequest(options),

  //POST request
  post: async (options: TAxiosFetchOptions): TAxiosFetchResponse =>
    await axiosRequest({ ...options, method: 'POST' }),

  //PATCH request
  patch: async (options: TAxiosFetchOptions): TAxiosFetchResponse =>
    await axiosRequest({ ...options, method: 'PATCH' }),

  //DELETE request
  delete: async (options: TAxiosFetchOptions): TAxiosFetchResponse =>
    await axiosRequest({ ...options, method: 'DELETE' }),
};

export default axiosFetch;

//Generic axios request function
let cancelTokenRecords: Record<string, CancelTokenSource | undefined> = {}; //To cancel ongoing request and send only current request when multiple requests is encountered

const axiosRequest = async ({
  url,
  method = 'GET',
  ...rest
}: TAxiosRequest) => {
  const urlPathOnly = url.split('?')[0]; //To ensure the cancel token key does not include query strings, so that we can also cancel if the query changes, like searches and filters
  const cancelTokenRecordKey = `${method}-${urlPathOnly}`;
 
  const cancelToken = cancelTokenRecords?.[cancelTokenRecordKey];
  if (cancelToken) cancelToken.cancel('Operation canceled due to new request');

  cancelTokenRecords[cancelTokenRecordKey] = axios.CancelToken.source();

  try {
    const config = {
      url,
      method,
      withCredentials: true,
      cancelToken: cancelTokenRecords[cancelTokenRecordKey]?.token,
      ...rest,
    };

    const response = await axios(config);
    cancelTokenRecords[cancelTokenRecordKey] = undefined;

    const { data, ...responseResult } = response;

    const responseObject = {
      success: true,
      message: 'Success!',
      ...data,
      ...responseResult,
    };

    if (response?.request?.responseType === 'blob') responseObject.data = data;
    return responseObject;
  } catch (error) {
    cancelTokenRecords[cancelTokenRecordKey] = undefined;
    const { message: axiosMessage, response } = error as AxiosError;
    const errorMessage = (response as any)?.data?.message ?? axiosMessage;

    if ((error as any)?.name !== 'CanceledError')
      return {
        success: false,
        message: `Error: ${errorMessage}`,
      };
  }
};
