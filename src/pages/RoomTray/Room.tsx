//External Imports
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../state/index';
import { FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react';

//Local Imports
import Logout from '@components/Logout';
import ToggleRoomInfo from '@components/ToggleRoomInfo';
import ToolTipText from '@components/tool-tip-text';

//Component Library
import { Button } from '@fulhaus/react.components.button';


const RoomTray = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    roomIndex,
    room,
    organizationID,
    projectID,
    storedProject,
    unitIndex,
  }: any = state;

  // console.log(
  //   'room: ',
  //   room,
  //   'unitIndex: ',
  //   unitIndex,
  //   'roomIndex: ',
  //   roomIndex
  // );

  const [hideRoomInfo, setHideRoomInfo] = useGlobalState('hideRoomInfo');
  // const [storedSelectedCategory, setStoredSelectedCategory] =
  //   useState<string>();

 
  const handleUnloadRoom = () => {
    //'unload room' button included in Figma; no known purpose
  };

  const handleGoToForm = () => {
    //navigate to product form, based on category selected
    navigate('/productForm', {
      state: {
        // draft: draft,
        room: room,
        organizationID: organizationID,
        projectID: projectID,
        storedProject: storedProject,
        unitIndex: unitIndex,
        roomIndex: roomIndex,
        // draftIndex: draftIndex,
      },
    });
  };
  const [currentlySelectedItems, setCurrentlySelectedItems] = useState();

  //TODO: add all items in a room, to display in app
  // const calculateCurrentlySelectedItems = () => {
    // setCurrentlySelectedItems (room.categories.products.reduce((a:any, b:any) => a + b))
    // setCurrentlySelectedItems(room.categories.map((product:any)=> product.reduce((a:any, b:any) => a+b)))
  //   setCurrentlySelectedItems(for (i = 0; i < room.      categories.products.length; i++) {
  //     const test1=room.categories.products[i]
  //     console.log(test1)
  //   });
    // const test1 = room.categories.products
  //   console.log(currentlySelectedItems)

  // }

  // calculateCurrentlySelectedItems()

  const isRoomInfoOpen = () => {
    if (!hideRoomInfo) {
      return 'flex flex-wrap overflow-hidden transform scale-y-[100%] origin-top transition duration-200';
    }
    return 'flex flex-wrap overflow-hidden transform scale-y-[0%] origin-top transition duration-200';
  };

  return (
    <div>
      <header className='p-3 h-[100%] flex justify-between bg-[#101828] text-white text-med  items-center'>
        <Link to='../' className='h-[100%] w-10 text-2xl '>
          <FiArrowLeft className='' />
        </Link>
        <p className='font-semibold'> Room Tray</p>

        {/* Button hidden currently, because functionality is not defined in Figma */}
        <Button
          className='text-xs font-normal px-2 py-1 ml-auto mr-4 text-[#101828] w-fit invisible bg-[#F3F3F1] '
          variant={'filled'}
          onClick={handleUnloadRoom}
        >
          Unload {room.name}
        </Button>

        {/* //TODO: Fix Feature. Logout feature useful for testing, but buggy for users - requires user to logout twice, for some reason */}
        {/* <ToolTipText tooltip='Logout of Product Clipper'>
          <Logout />
        </ToolTipText> */}
      </header>

      <div className='flex justify-between items-center bg-white border-solid border-y border-[1px] border-[#5E5E5E] py-2 px-4'>
        <div className='text-2xl'>{room.name}</div>
        <Button
          className='text-xs rounded-full border-sand w-fit py-1 px-2 cursor-auto'
          variant={'outlined'}
        >
          Qty:{room.qty}
        </Button>

        <div className='text-right font-medium'>
        //TODO: add all items in a room, to display in app
          {/* { 
          room.categories.map ((category:any) => {const productTotal = category.products.reduce((a:any, b:any) => a + b) */}
          <>
            <p className='font-semibold text-base'>
              {currentlySelectedItems} /{room.totalItems} items
            </p>
          </>
          {/* })
            } */}

            {/* //TODO: was meant to be cost spent vs what's left in the budget, maybe? */}
          <p className='text-base'>$cost/$cost</p>
        </div>

        <div>
          <ToggleRoomInfo />
        </div>
      </div>

      <div className={isRoomInfoOpen()}>
        {room.categories.map((category: any) => (
          <>
            {category.products.map((product: any) => (
              <>
                <div className='flex justify-between items-center bg-white px-3 py-4 w-[50%] border-solid border-[#5E5E5E] border'>
                  <div className='items-center border-dashed border border-[#5E5E5E] w-[88px] h-[88px] mr-6'>
                    <img src={product.imageURLs[0] ?? ''} className=''></img>
                  </div>
                  <div className='mr-auto'>
                    <p>{category.name}</p>

                    {/* Button can exist as part of cards, but then will disappear if room info is toggled */}
                    {/* <Button
                className='text-xs w-fit px-2 py-1'
                variant={'outlined'}
                onClick={() => {
                    handleGoToForm(category.name);
                }}
                >
                Enter info
                </Button> */}
                  </div>
                </div>
              </>
            ))}
          </>
        ))}
        <div className='flex justify-between items-center bg-white px-3 py-4 w-[50%] border-solid border-[#5E5E5E] border'>
          <div className='items-center border-dashed border border-[#5E5E5E] w-[88px] h-[88px] mr-6'>
            <img src={''} className=''></img>
          </div>
        </div>
      </div>

      <div className='flex justify-end m-2'>
        <p>{}</p>
        <Button
          className='text-xs w-fit px-2 py-1'
          variant={'filled'}
          onClick={() => {
            handleGoToForm();
          }}
        >
          Enter New Product Info
        </Button>
      </div>

      {/* <Button
        // className='w-fit absolute bottom-2.5 left-1.5 py-1 px-4 bg-[#101828]'
        className='w-fit m-4 py-1 px-4 bg-[#101828]'
        variant={'filled'}
        // onClick={handleChooseNewDraft}
            >*/}
      {/* //TODO: clicking on this button should allow user to choose a new draft, once multi-drafts are enabled */}
      {/* {draft.name} */}
      {/*} </Button> */}
    </div>
  );
};

export default RoomTray;
