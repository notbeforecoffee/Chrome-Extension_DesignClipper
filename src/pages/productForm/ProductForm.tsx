//External Imports
import { useLocation, useNavigate } from 'react-router-dom';
import  { Fragment, useState } from 'react'
import { FiPlus } from 'react-icons/fi';

//Component Library
import { Button } from '@fulhaus/react.components.button';
import { Select } from '@fulhaus/react.components.select';
import { TextInput } from '@fulhaus/react.components.text-input';


//Local Imports
import {
  saveProduct,
} from '@api-requests/products';
import { modifyProject } from '@api-requests/projects';
import useSetInterval from '@hooks/use-set-interval';
import {
  IDOMMessage,
  TDOMMessageType,
  IFormInformation,
  IVendorDetails,
  ICategoryDetails,
} from 'types';

interface IProductForm {
    draft: any;
      room: any;
      organizationID: any;
      projectID: any;
      storedProject: any;
      unitIndex: any;
      roomIndex: any;
      draftIndex: any;
}


const ProductForm = (
    // draft,
    //   room,
    //   organizationID,
    //   projectID,
    //   storedProject,
    //   unitIndex,
    //   roomIndex,
    //   draftIndex,
) => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const {
      draft,
      room,
      organizationID,
      projectID,
      storedProject,
      unitIndex,
      roomIndex,
      draftIndex,
    }: any = state;
  
    console.log(
      'draft: ',
      draft,
      'room: ',
      room,
      // 'category: ',
      // category,
      'organizationID: ',
      organizationID,
      'projectID: ',
      projectID
    );
  

  
    const [activeInputId, updateActiveInputId, imageURLs, lifeStyleImageURLs] =
      useSetInterval();
  
    const [selectWeightUnit, setSelectWeightUnit] = useState<string>();
    const [selectDimensionUnit, setSelectDimensionUnit] = useState<string>();
    const [selectCurrency, setSelectCurrency] = useState<string>();
  
    const [selectCategory, setSelectCategory] = useState<string>();
    const [categoryDetails, setCategoryDetails] = useState<ICategoryDetails[]>();
  
    const [selectVendor, setSelectVendor] = useState<string>();
    const [vendorDetails, setVendorDetails] = useState<IVendorDetails[]>();
  
    const refreshPage = () => window.location.reload();
  
  
    const handleSendMessageToBrowserListener = async (
      inputName: string,
      inputType: TDOMMessageType
    ) => {
      chrome.storage.local.get(console.log);
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.tabs.sendMessage(tab.id || 0, { msg: inputType } as IDOMMessage);
      updateActiveInputId(inputName);
    };
  
    const getFinalInputValues = () => {
      const finalInputValues: {
        [key: string]: string | undefined | string[] | boolean;
      } = {};
      for (const value of initialInformation) {
        const inputElement = document.getElementById(
          value.name
        ) as HTMLInputElement;
        finalInputValues[value.name] = inputElement.value;
      }
      for (const value of imageInformation) {
        const inputElement = document.getElementById(
          value.name
        ) as HTMLInputElement;
        finalInputValues[value.name] = inputElement.value;
      }
      for (const value of stockInformation) {
        const inputElement = document.getElementById(
          value.name
        ) as HTMLInputElement;
        finalInputValues[value.name] = inputElement.value;
      }
      for (const value of dimensionsInformation) {
        const inputElement = document.getElementById(
          value.name
        ) as HTMLInputElement;
        finalInputValues[value.name] = inputElement.value;
      }
      for (const value of additionalInformation) {
        const inputElement = document.getElementById(
          value.name
        ) as HTMLInputElement;
        finalInputValues[value.name] = inputElement.value;
      }
      finalInputValues.imageURLs = imageURLs ?? [];
      finalInputValues.lifeStyleImageURLs = lifeStyleImageURLs ?? [];
      finalInputValues.currency = selectCurrency;
      finalInputValues.weightUnit = selectWeightUnit;
      finalInputValues.dimensionUnit = selectDimensionUnit;
      finalInputValues.category = selectCategory;
  
      const categoryId = categoryDetails?.filter(
        (categoryDetail) =>
          categoryDetail?.name?.toLowerCase()?.trim() ===
          selectCategory?.toLowerCase()?.trim()
      )?.[0]?._id;
  
      finalInputValues.fulhausCategory = categoryId;
      finalInputValues.clipped = true;
  
      console.log('finalInputValues: ', finalInputValues);
  
      return finalInputValues;
    };
  
    const handleSaveProduct = async () => {
      const productDetails = getFinalInputValues();
      const vendorId = vendorDetails?.filter(
        (vendorDetail) =>
          vendorDetail?.name?.toLowerCase()?.trim() ===
          selectVendor?.toLowerCase()?.trim()
      )?.[0]?._id;
      console.log('vendorID: ', vendorId, 'productDetails: ', productDetails )
    
      if (Object.keys(productDetails).length < 1 || !vendorId) return;
     
  
      const response: any = await saveProduct({
        productDetails: [productDetails],
        vendorId,
      });
      const productsNotUploaded = response?.productsNotUploaded;
      const isUploaded = (productsNotUploaded?.length ?? 1) < 1;
  
      if (!isUploaded) {
  
  
        //TO DO:  Implement chrome notification instead of alert
        // chrome.notifications.create('saveError', {
        //   type: 'basic',
        //   iconUrl: './assets/icon16.png',
        //   title: 'Save Error',
        //   message: `Oops!  Error: ${response?.message, productsNotUploaded[0].error.split()}`,
        //   priority: 2
        //     })
  
        alert(
          `Oops!  Error: ${
            (response?.message, productsNotUploaded[0].error.split())
          }`
        );
        return console.log(
          '!response: ',
          response,
          'error:',
          productsNotUploaded[0].error
        );
      }
      if (isUploaded) {
        alert('New Product Successfully Created!');
      }
      // handleSaveToProject();
    };
  
    const handleSaveToProject = async () => {
      // const newProduct = response[0].id
      // const project = storedProject
      // const productToBeUpdated = storedProject.quote.data[unitIndex].rooms[roomIndex]
  
      //     const projectData = {
      //       ...project,
      //   //  product to be updated
      //     }
  
      //     const modifyProjectResponse = await modifyProject ({
      //       organizationID: organizationID ?? "",
      //       projectID : projectID,
      //       data: projectData,
      //     })
  
      //   if (modifyProjectResponse.success) console.log('edit project success!')
  
      //   // clear form after successful product upload
      //   refreshPage();
    };
  
    // const handleNavigation = () => {
    //   navigate('/roomTray', {
    //     state: {
    //       // draft: draft,
    //       room: room,
    //       organizationID: organizationID,
    //       projectID: projectID,
    //       storedProject: storedProject,
    //       unitIndex: unitIndex,
    //       roomIndex: roomIndex,
    //       draftIndex: draftIndex,
    //     },
    //   });
    // };
  
    const initialInformation: IFormInformation[] = [
      { tag: 'sku', name: 'sku', type: 'number' },
      { tag: 'Product Name', name: 'name', type: 'text' },
    ];
    const imageInformation: IFormInformation[] = [
      { tag: 'Lifestyle Image URL', name: 'lifeStyleImageURLs', type: 'url' },
      { tag: 'Image URL', name: 'imageURLs', type: 'url' },
    ];
  
    const stockInformation: IFormInformation[] = [
      { tag: 'Stock Quantity', name: 'stockQty', type: 'number' },
      { tag: 'Case Pack', name: 'casePackQty', type: 'number' },
      { tag: 'Trade Price', name: 'tradePrice', type: 'number' },
    ];
  
    const dimensionsInformation: IFormInformation[] = [
      { tag: 'Dimensions: H', name: 'height', type: 'number' },
      { tag: 'Dimensions: D', name: 'width', type: 'number' },
      { tag: 'Dimensions: L', name: 'length', type: 'number' },
    ];
  
    const additionalInformation: IFormInformation[] = [
      //map &
      //msrp
      { tag: 'GTIN', name: 'gtin', type: 'text' },
      { tag: 'Warranty Info', name: 'warrantyInfo', type: 'text' },
      { tag: 'Materials', name: 'materials', type: 'text' },
      { tag: 'Care Info', name: 'careInfo', type: 'text' },
      { tag: 'Variants', name: 'variants', type: 'text' },
      { tag: 'Colour', name: 'colorName', type: 'text' },
    ];
  
    const dimensionsUnitOptions = ['in', 'cm', 'mm', 'ft', 'm'];
    const weightOptions = ['lbs', 'kg', 'gr', 'oz'];
    const currencyOptions = ['CAD', 'USD'];
  
    return (
      <div className='' id='page_container'>

<div>
          <form className='px-4 pt-5 text-sm'>
          <div className=' flex justify-end'>
              <Button
                className='w-2/5 border-[#FC4C02] text-[#FC4C02] text-xs bg-[rgba(252,76,2,0.1)]'
                variant={'outlined'}
                onClick={refreshPage}
              >
                Clear Form
              </Button>
            </div>
            <h2 className='font-bold text-lg my-3'>Required Information</h2>

            <section id='required_information_container' className=''>
              {initialInformation.map((item) => (
                <label className=''>
                  {item.tag}
                  <TextInput
                    required
                    className='w-full mb-2 border-solid border-[1px] border-[#5E5E5E] bg-white'
                    variant={'box'}
                    id={item.name}
                    name={item.name}
                    type={'text'}
                    onFocus={(e) =>
                      handleSendMessageToBrowserListener(
                        item.name,
                        'getInnerText'
                      )
                    }
                  />
                </label>
              ))}

              <section id='all_image_urls'>
                {imageInformation.map((item) => (
                  <Fragment>
                    <label className=''>{item.tag}</label>

                    <div
                      id='image_plus_button'
                      className='border-solid border-[1px] border-[#5E5E5E] bg-white w-full  h-fit flex  items-center p-5 gap-2 mb-2'
                    >
                      <FiPlus
                        className='text-2xl text-[#101828] cursor-pointer hover:opacity-50 h-[4rem] w-[4rem] border-solid border-[1px] border-[#5E5E5E]'
                        onClick={(e) =>
                          handleSendMessageToBrowserListener(
                            item.name,
                            'getImageUrl'
                          )
                        }
                      />
                      <div
                        id={item.name}
                        className='flex h-fit flex-1  items-center overflow-scroll gap-2'
                      ></div>
                    </div>
                  </Fragment>
                ))}
              </section>

              <section
                id='dimension_inputs'
                className='gap-3 flex items-end mb-2 text-xs'
              >
                {dimensionsInformation.map((item) => (
                  <label>
                    {item.tag}
                    <div>
                      <TextInput
                        className='border-solid border-[1px] border-[#5E5E5E] bg-white '
                        variant='box'
                        id={item.name}
                        name={item.name}
                        type={'number'}
                        onClick={(e) =>
                          handleSendMessageToBrowserListener(
                            item.name,
                            'getInnerText'
                          )
                        }
                      />
                    </div>
                  </label>
                ))}

                <Select
                  label={selectDimensionUnit ?? 'Unit'}
                  className='text-xs border-solid border-[1px] border-[#5E5E5E] bg-white'
                  options={dimensionsUnitOptions}
                  onSelect={setSelectDimensionUnit}
                />
              </section>

              <section id='weight_input' className='w-1/2 mb-2'>
                <label>Weight</label>
                <div className='flex items-center mb-2'>
                  <TextInput
                    className='w-full border-solid border-[1px] border-[#5E5E5E] bg-white'
                    variant='box'
                    id='weight'
                    name='weight'
                    type='number'
                    onFocus={(e) =>
                      handleSendMessageToBrowserListener(
                        'weight',
                        'getInnerText'
                      )
                    }
                  />

                  <Select
                    label={selectWeightUnit ?? 'Unit'}
                    className='text-xs border-solid border-[1px] border-[#5E5E5E] bg-white'
                    options={weightOptions}
                    onSelect={setSelectWeightUnit}
                  />
                </div>
              </section>

              <section
                id='stock_information'
                className='gap-3 flex text-xs mb-2'
              >
                {stockInformation.map((item) => (
                  <label className=''>
                    {item.tag}
                    <TextInput
                      className='w-full ] mb-2 border-solid border-[1px] border-[#5E5E5E] bg-white'
                      variant='box'
                      id={item.name}
                      name={item.name}
                      type={'number'}
                      onFocus={(e) =>
                        handleSendMessageToBrowserListener(
                          item.name,
                          'getInnerText'
                        )
                      }
                    />
                  </label>
                ))}
              </section>

              <section id='category' className='flex gap-3 mt-3 mb-2'>
                <Select
                  label={selectCategory ?? 'Select A Category'}
                  className='text-xs w-72 border-solid border-[1px] border-[#5E5E5E] bg-white'
                  options={(categoryDetails ?? [])?.map((categoryDetail) =>
                    categoryDetail?.name?.toUpperCase()
                  )}
                  onSelect={setSelectCategory}
                />

                <Select
                  label={selectCurrency ?? 'Currency'}
                  className='text-xs border-solid border-[1px] border-[#5E5E5E] bg-white'
                  options={currencyOptions}
                  onSelect={setSelectCurrency}
                />
              </section>

              <section>
                <label>
                  Description
                  <div>
                    <textarea
                      className='w-full border-solid border-[1px] border-[#5E5E5E] bg-white'
                      rows={5}
                      cols={1}
                      id='description'
                      name='description'
                      required
                      onFocus={(e) =>
                        handleSendMessageToBrowserListener(
                          'description',
                          'getInnerText'
                        )
                      }
                      // className="w-full  border-[#5E5E5E] border mb-2"
                    ></textarea>
                  </div>
                </label>
              </section>
            </section>

            <div id='additional_information_header'>
              <hr
                style={{
                  margin: '1.5em 0 1.5em 0',
                  background: 'grey',
                  height: '2px',
                }}
              />
              <h2 className='font-bold text-lg my-3'>Additional Information</h2>
            </div>

            <section id='additional_information' className=''>
              {additionalInformation.map((item) => (
                <label className='additionalInfo'>
                  {item.tag}
                  <TextInput
                    className='w-full mb-2 border-solid border-[1px] border-[#5E5E5E] bg-white'
                    variant='box'
                    id={item.name}
                    name={item.name}
                    type={'text'}
                    onFocus={(e) =>
                      handleSendMessageToBrowserListener(
                        item.name,
                        'getInnerText'
                      )
                    }
                  />
                </label>
              ))}
            </section>
            
          </form>
          <div className='pt-3'>
            <Button
              className='w-full p-2 bg-[#101828]'
              variant={'filled'}
              onClick={handleSaveProduct}
            >
              Save
            </Button>
          </div>
        </div>
       
      </div>
    );
}



export default ProductForm