import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { useGlobalState }  from '../state/index'


const ToggleRoomInfo= () => {

const [hideRoomInfo, setHideRoomInfo] = useGlobalState('hideRoomInfo');


  return (
    <div className='cursor-pointer' onClick={() =>setHideRoomInfo(!hideRoomInfo)}>
      
      {!hideRoomInfo ? (
        <BiUpArrow 
        className="text-xs" 
        />
      ):(
      <BiDownArrow 
      className="text-xs" 
      />
      )}
    </div>
  );
};

export default ToggleRoomInfo;