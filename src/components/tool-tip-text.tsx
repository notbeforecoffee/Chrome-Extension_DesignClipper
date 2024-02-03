import { FC, ReactNode } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

  // {_id: ObjectId('6398c316a8b52f00162513fb')}
  // {_id: ObjectId('63912f1ee1a9d2901e0721d0')}

interface IToolTipText {
  tooltip: string;
  children: ReactNode;
}

const ToolTipText: FC<IToolTipText> = ({ children, tooltip }) => {
  return (
    <div className='flex items-center justify-end gap-2 w-[9rem]'>
      {children}
      <div className='relative group'>
        <FaQuestionCircle className='text-link-blue' />
        <div className='hidden absolute top-[-.8rem] left-[-8rem] group-hover:block  bg-white w-[9rem]  text-center border text-primary border-light  font-normal'>
          <small>{tooltip}</small>
        </div>
      </div>
    </div>
  );
};

export default ToolTipText;
