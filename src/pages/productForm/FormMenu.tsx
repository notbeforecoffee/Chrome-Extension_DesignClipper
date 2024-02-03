import { useLocation, useNavigate } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react'
import { FiArrowLeft, FiPlus } from 'react-icons/fi';

//Component Library
import { Button } from '@fulhaus/react.components.button';
import { Select } from '@fulhaus/react.components.select';
import { TextInput } from '@fulhaus/react.components.text-input';


//Local Imports
import chair from '../../../public/assets/images/Vector3.png';
import lamp from '../../../public/assets/images/Vector4.png';
import {
  getCategoryList,
  getVendorList,
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
import ProductForm from './ProductForm';


type Props = {}

const FormMenu = ({}: Props) => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const {
      draft,
      room,
      // category,
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
  
    useEffect(() => {
      productInitialization();
      chrome.storage.local.clear();
      const productToBeUpdated =
        storedProject.quote.data[unitIndex].rooms[roomIndex].drafts[draftIndex]
          .categories;
      console.log('productToBeUpdated: ', productToBeUpdated);
    }, []);
  
    const [activeInputId, updateActiveInputId, imageURLs, lifeStyleImageURLs] =
      useSetInterval();
  
    const [categoryDetails, setCategoryDetails] = useState<ICategoryDetails[]>();
  
    const [selectVendor, setSelectVendor] = useState<string>();
    const [vendorDetails, setVendorDetails] = useState<IVendorDetails[]>();
  

  
    const productInitialization = async () => {
      const [getVendorResponse, getCategoryResponse] = await Promise.all([
        getVendorList(),
        getCategoryList(),
      ]);
      //returns values sorted alphabetically to be used in dropdown menus
      const vendorData = getVendorResponse.data;
      vendorData.sort((a: any, b: any) => {
        return a.name > b.name ? 1 : -1;
      });
      const categoryData = getCategoryResponse.data;
      categoryData.sort((a: any, b: any) => {
        return a.name > b.name ? 1 : -1;
      });
      if (getVendorResponse?.success) setVendorDetails(vendorData);
      if (getCategoryResponse?.success) setCategoryDetails(categoryData);
    };
  
    // //populates the Vendor List Dropdown
    const handleNavigation = () => {
      navigate('/roomTray', {
        state: {
          // draft: draft,
          room: room,
          // category: category,
          organizationID: organizationID,
          projectID: projectID,
          storedProject: storedProject,
          unitIndex: unitIndex,
          roomIndex: roomIndex,
          // draftIndex: draftIndex,
        },
      });
    };
  
   
  
    return (
      <div className='' id='page_container'>
        <header className='p-3 flex items-center bg-[#101828] text-white'>
          <FiArrowLeft
            onClick={() => handleNavigation()}
            className=' w-10 text-2xl cursor-pointer'
          />
          {/* <h3 className='text-med font-semibold'>{category}</h3> */}
          <h3 className='text-med font-semibold text-center'>
            Clipped Product Info
          </h3>
        </header>
  
        <section className='' id='vendor_selection'>
          <p className='text-center m-3 mt-5 border-solid border-[#5E5E5E]'>
            {' '}
            Select A Vendor
          </p>
  
          <Select
            label={selectVendor ?? 'Select a Vendor'}
            optionClassName='text-left text-xs m-3'
            className='text-xs m-3 rounded border-solid border-[1px] border-[#5E5E5E]'
            options={(vendorDetails ?? [])?.map((vendorDetail) =>
              vendorDetail?.name?.toUpperCase()
            )}
            onSelect={setSelectVendor}
          />
  
          {!selectVendor && (
            <div className='flex justify-between h-[calc(100vh-10rem)]'>
              <img
                className='h-4/6 ml-1 mt-auto'
                src={chair}
                alt='no product chosen'
              />
  
              <img
                className='h-4/6 mr-1 mt-auto'
                src={lamp}
                alt='no product chosen'
              />
            </div>
          )}
        </section>
  
        {selectVendor && (
            <ProductForm 
            // draft={draft}
            // room={room}
            // organizationID={ organizationID}
            // projectID={projectID}
            // storedProject={storedProject}
            // unitIndex={unitIndex}
            // roomIndex={roomIndex}
            // draftIndex={draftIndex} 
            />
        )}
      </div>
    );
}

export default FormMenu