import { createGlobalState } from 'react-hooks-global-state';


export const { useGlobalState } = createGlobalState ({
    hideRoomInfo: false,
})