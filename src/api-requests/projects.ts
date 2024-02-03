import axiosFetch, { TAxiosFetchQuery } from "../utils/axios-fetch";

export interface IGetProject {
  organizationID: string;
  projectID: string;
  query?: TAxiosFetchQuery;
  data:any;
}

export interface ISaveProject {
  project: any;
  versionName?: string;
}

const { VITE_API_URL } = import.meta.env;


export const getProjectList = async (organizationID:string, searchValue?:string) => 
await axiosFetch.get({
url: `${VITE_API_URL}/api/studio-service/projects/${organizationID}?limit=10000`,

// url: `${VITE_API_URL}/api/studio-service/projects/${organizationID}?${searchValue ?? ''}&limit=1000`,

})



export const getProject = async (
  organizationID: string,
  projectID: string
 ) =>
  await axiosFetch.get({
    url: `${VITE_API_URL}/api/studio-service/project/${organizationID}/${projectID}`,
  });


  export const modifyProject = async ({
    organizationID,
    projectID,
  }: IGetProject) =>
    await axiosFetch.patch({
      url: `${VITE_API_URL}/api/studio-service//project/${organizationID}/${projectID}`,
    });

  
  // export const getAllCanvasDraftsForARoom = async (
  //   organizationID: string,
  //   project_id: string,
  //   quote_id: string,
  //   unitID: string,
  //   roomID: string
  //  ) =>
  //   await axiosFetch.get({
  //     url: `${VITE_API_URL}/api/studio-service/design/${organizationID}/${project_id}/$/${quote_id}/${unitID}/${roomID}/canvases`,
  //   });


    export const saveProject = async ({ project, versionName }: ISaveProject) =>
  await axiosFetch.post({
    url: `${
      import.meta.env.VITE_API_URL
    }/api/project/save?versionName=${versionName}`,
    data: project,
  });