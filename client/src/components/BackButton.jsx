
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Button } from 'flowbite-react';

export default function BackButton() {
 
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Button onClick={handleBack} className=" mt-4 text-white  rounded">
      <IoMdArrowRoundBack size={20} />
    </Button>
  );
};

