import axiosFetch from "../utils/axios-fetch";

interface IProductDetails {
  productDetails: any[]
  vendorId: string
 }

const { VITE_API_URL } = import.meta.env;

export const getCategoryList = async () => 
  await axiosFetch.get({ url: `${VITE_API_URL}/api/products-service/categories`})

  
  export const getVendorList = async () => 
  await axiosFetch.get({ 
    url: `${VITE_API_URL}/api/products-service/vendors`
  })


export const saveProduct = async ({productDetails, vendorId}:IProductDetails) => 
await axiosFetch.post({
  url: `${VITE_API_URL}/api/products-service/products/onboarding/${vendorId}`,
  data: productDetails
});


// export const updateProduct = async (projectDetails: any) => 
// await axiosFetch.patch({
//   url: `${VITE_API_URL}/api/products-service/clipper`,
//   data: projectDetails,
// });

export interface IGetProducts {
  sku: string;
}


const getProductBySKU = async ( {sku}: IGetProducts) => {
  await axiosFetch.get({ 
    url: `${VITE_API_URL}/api/products-service/products/sku/${sku}`
  })
};

export default getProductBySKU;

export const getProductsFromIDs = async (productIDs: string[]) =>
  await axiosFetch.post({
    url: `${VITE_API_URL}/api/products-service/products/IDs`,
    data: productIDs,
  });
