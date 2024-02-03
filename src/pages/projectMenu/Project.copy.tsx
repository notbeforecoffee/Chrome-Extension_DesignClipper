//External Imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Local Imports
import noProduct from '../../../public/assets/images/Vector.png';
import {
  IDraftDetails,
  IProjectDetails,
  IRoomDetails,
  IUnitDetails,
} from 'types';
import ToolTipText from '@components/tool-tip-text';
import Logout from '@components/Logout';
import { getUserOrganizationsAndRoles } from '@api-requests/user';
import { getProject, getProjectList } from '@api-requests/projects';

//Component Library
import { Select } from '@fulhaus/react.components.select';
import { Button } from '@fulhaus/react.components.button';

//TODO:logic to handle if no draft exists, to select 'start a new draft'

const Project = () => {
  const navigate = useNavigate();

  const [organizationID, setOrganizationID] = useState();

  const [projectDetails, setProjectDetails] = useState<IProjectDetails[]>();
  const [selectProject, setSelectProject] = useState<string>();
  const [storedProjectID, setStoredProjectID] = useState<string>();
  const [storedProject, setStoredProject] = useState<any>();
  // const [projectIndice, setProjectIndice] = useState<number>();

  const [selectUnit, setSelectUnit] = useState<string | undefined>();
  const [unitDetails, setUnitDetails] = useState<IUnitDetails[]>();
  const [storedUnitID, setStoredUnitID] = useState<string>();
  // const [storedSelectedUnit, setStoredSelectedUnit] = useState<IUnitDetails>();
  const [unitIndice, setUnitIndice] = useState<number>();

  const [selectRoom, setSelectRoom] = useState<string | undefined>();
  const [roomDetails, setRoomDetails] = useState<IRoomDetails[]>();
  const [storedSelectedRoom, setStoredSelectedRoom] = useState<IRoomDetails>();
  // const [storedRoomID, setStoredRoomID] = useState<string>();
  const [roomIndice, setRoomIndice] = useState<number>();

  // const [selectDraft, setSelectDraft] = useState<string | undefined>();
  // const [draftDetails, setDraftDetails] = useState<IDraftDetails[]>();
  // const [storedSelectedDraft, setStoredSelectedDraft] =
  //   useState<IDraftDetails>();
  // const [draftIndice, setDraftIndice] = useState<number>();

  useEffect(() => {
    //fires on pageload, and then again once organizationID is found
    projectInitialization();
  }, [organizationID]);

  useEffect(() => {
    //fires on pageload, and again once project is selected from dropdown menu
    unitInitialization();
  }, [selectProject]);

  useEffect(() => {
    //fires on pageload, and again once unit is selected from dropdown menu
    roomInitialization();
  }, [selectUnit]);

  useEffect(() => {
    //fires on pageload, and again once unit is selected from dropdown menu
    draftInitialization();
  });

  // useEffect(() => {}, [selectRoom, selectDraft]);

  //resets menus if user changes selections
  const refreshMenu = () => {
    setSelectUnit(undefined);
    setSelectRoom(undefined);
    // setSelectDraft(undefined);
  };

  const projectInitialization = async () => {
    const getUserOrganizationResponse = await getUserOrganizationsAndRoles();

    if (getUserOrganizationResponse?.success)
      setOrganizationID(getUserOrganizationResponse.organizations[0]._id);

    if (organizationID) {
      const projectListResponse = await getProjectList(organizationID);
      const sortedProjects = projectListResponse?.projects.sort(
        (a: any, b: any) =>
          a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
      );
      console.log('newProjectListResponse: ', sortedProjects);
      setProjectDetails(sortedProjects);
      // setProjectDetails(projectListResponse['projects']);
    }
  };

  const unitInitialization = async () => {
    const projectID = projectDetails?.filter(
      (projectDetail) => projectDetail?.title === selectProject
    )[0]?._id;
    setStoredProjectID(projectID);

    // const storeProjectIndice = projectDetails?.findIndex((projectDetail) => {
    //   return projectDetail._id === projectID;
    // });
    //setProjectIndice(storeProjectIndice);

    console.log('projectDetails: ', projectDetails);

    //resets unit menu and room menu when new project is selected
    refreshMenu();

    if (organizationID && projectID) {
      const getProjectResponse = await getProject(organizationID, projectID);
      console.log('getProjectResponse: ', getProjectResponse);
      setStoredProject(getProjectResponse.project);

      setUnitDetails(getProjectResponse.project.quote.data);
    }
  };

  const roomInitialization = () => {
    const unitID = unitDetails?.filter(
      (unitDetail) => unitDetail?.name === selectUnit
    )[0]?.uid;

    if (unitID) setStoredUnitID(unitID);
    console.log('storedProject: ', storedProject);

    const storeUnitIndice = unitDetails?.findIndex((unitDetail) => {
      return unitDetail.uid === unitID;
    });
    setUnitIndice(storeUnitIndice);

    const selectedUnitRooms: any = unitDetails?.filter(
      (unitDetail) => unitDetail?.name === selectUnit
    )[0]?.rooms;
    setRoomDetails(selectedUnitRooms);
  };

  const draftInitialization = () => {
    const roomID = roomDetails?.filter(
      (roomDetail) => roomDetail?.name === selectRoom
    )[0]?.uid;
    // setStoredRoomID(roomID);

    const storeRoomIndice = roomDetails?.findIndex((roomDetail) => {
      return roomDetail.uid === roomID;
    });
    setRoomIndice(storeRoomIndice);

    const selectedRoom = roomDetails?.filter(
      (room) => room.name === selectRoom
    )[0];
    setStoredSelectedRoom(
      (storedSelectedRoom) => (storedSelectedRoom = selectedRoom)
    );

    // const selectedRoomDrafts: any = roomDetails?.filter(
    //   (roomDetail) => roomDetail?.name === selectRoom
    // )[0]?.drafts;
    // setDraftDetails((draftDetails) => (draftDetails = selectedRoomDrafts));

    // const draft = draftDetails?.filter(
    //   (draftDetail) => draftDetail?.name === selectDraft
    // )[0];
    // setStoredSelectedDraft(
    //   (storedSelectedDraft) => (storedSelectedDraft = draft)
    // );

    // const draftID = draftDetails?.filter(
    //   (draftDetail) => draftDetail?.name === selectDraft
    // )[0]?._id;
    // console.log('draftDetails: ', draftDetails)

    // const storeDraftIndice = draftDetails?.findIndex((draftDetail) => {
    //   return draftDetail._id === draftID;
    // });
    //  setDraftIndice(storeDraftIndice);
  };

  const handleLoadDraft = () => {
    navigate('./roomTray', {
      state: {
        // draft: storedSelectedDraft,
        // draftIndex: draftIndice,
        room: storedSelectedRoom,
        organizationID: organizationID,
        projectID: storedProjectID,
        storedProject: storedProject,
        unitIndex: unitIndice,
        roomIndex: roomIndice, 
      },
    });
  };

  return (
    <div className=''>
      <header className='p-3 h-[100%] flex justify-between bg-[#101828] text-white text-med font-semibold'>
        Project Tray
        {/* <ToolTipText tooltip='Logout of Product Clipper'>
          <Logout />
        </ToolTipText> */}
      </header>
      <div className=''>
        <div className='mt-5 w-full'>
          <Select
            label={selectProject ?? 'Select a Project'}
            className='text-xs mx-3 rounded border-solid border-[1px] border-[#5E5E5E]'
            options={(projectDetails ?? [])?.map(
              (projectDetail) => projectDetail?.title
            )}
            onSelect={setSelectProject}
          />
        </div>

        <div className='mt-5'>
          {selectProject && (
            <Select
              label={selectUnit ?? 'Select a Unit'}
              className='text-xs mx-3 rounded border-solid border-[1px] border-[#5E5E5E]'
              options={(unitDetails ?? [])?.map(
                (unitDetail) => unitDetail?.name
              )}
              onSelect={setSelectUnit}
            />
          )}
        </div>

        <div className='mt-5'>
          {selectUnit && (
            <Select
              label={selectRoom ?? 'Select a Room'}
              className='text-xs mx-3 rounded border-solid border-[1px] border-[#5E5E5E]'
              options={(roomDetails ?? [])?.map(
                (roomDetail?) => roomDetail?.name
              )}
              onSelect={setSelectRoom}
            />
          )}
        </div>

        {/* <div className='mt-5'>
          {selectRoom && selectUnit && (
            <Select
              label={selectDraft ?? 'Select a Draft'}
              className='text-xs mx-3 rounded border-solid border-[1px] border-[#5E5E5E]'
              options={(draftDetails ?? [])?.map(
                (draftDetail?) => draftDetail?.name
                //   options= {!draftDetails ? ['Start A New Draft'] : (draftDetails).map(
                //   (draftDetail:any) => draftDetail.name
              )}
              onSelect={setSelectDraft}
            />
          )}
        </div> */}
      </div>

      <h3 className='text-center text-lg mt-6'>
        Load a project from Fülhaus Studio
      </h3>
      <div className='flex justify-center relative'>
        <img className='w-[29%] mt-2' src={noProduct} alt='no project chosen' />
      </div>

      <Button
        className='w-full absolute bottom-0 bg-[#101828]'
        variant={'filled'}
        onClick={() => {
          handleLoadDraft();
        }}
      >
        Load
      </Button>
    </div>
  );
};

export default Project;
