import axiosFetch, { TAxiosFetchQuery } from "../utils/axios-fetch";

const { VITE_API_URL } = import.meta.env;

export const getDesign = async (
    organizationID: string,
    projectID: string,
    quoteID: string,
    studioDesignID: string
   ) =>
    await axiosFetch.get({
      url: `${VITE_API_URL}/api/studio-service/project/${organizationID}/${projectID}${quoteID}/${studioDesignID}/`,
    });