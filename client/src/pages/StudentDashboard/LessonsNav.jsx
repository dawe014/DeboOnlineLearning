import { Sidebar } from 'flowbite-react';
import {
  
} from 'react-icons/hi';
// import { useState } from 'react';
// import { MdMenu } from 'react-icons/md';

export default function LessonsNav() {
  // const [isOpen, setIsOpen] = useState(true);
  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="flex min-h-screen">
     
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example"
          className="sticky top-12 z-10 w-64 h-screen" // Ensure it takes full height and is sticky
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              
              <Sidebar.Collapse  label="Lesson 1">
                <Sidebar.Item href="1">Sub content 1</Sidebar.Item>
                <Sidebar.Item href="2">Sub content 2</Sidebar.Item>
                <Sidebar.Item href="3">Sub content 3</Sidebar.Item>
                <Sidebar.Item href="4">Sub content 4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse  label="Lesson 2">
                <Sidebar.Item href="#">Sub content 1</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 2</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 3</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse  label="Lesson 3">
                <Sidebar.Item href="#">Sub content 1</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 2</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 3</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse  label="Lesson 4">
                <Sidebar.Item href="#">Sub content 1</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 2</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 3</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse  label="Lesson 5">
                <Sidebar.Item href="#">Sub content 1</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 2</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 3</Sidebar.Item>
                <Sidebar.Item href="#">Sub content 4</Sidebar.Item>
              </Sidebar.Collapse>
              
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      

      
    
    </div>
  );
}
