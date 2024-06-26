import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Center,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button
} from '@chakra-ui/react';
import { MdOutlineChair } from "react-icons/md";
import { AppContext } from '../../AppProvider';

export default function Content() {
  const {content, prevData, setPrevData, currentData, setCurrentData} = useContext(AppContext);

  useEffect(() => {
    setCurrentData(content)
  }, [content]);

  const handleSelectItem = (e, childs) => {
    e.preventDefault();
    const newData = childs.map(item => {
      return {
        text: item,
        childs: []
      }
    });

    setPrevData(currentData);
    setCurrentData(newData);
  }

  return (
    <Box>
      {currentData.length == 0 && <Center height={'25rem'}>
        <Box>
          <MdOutlineChair style={{margin: 'auto', fontSize: '3rem'}} />
          <Text>
            Start typing to see curated list of suggestions
          </Text>
        </Box>
      </Center>}
      {currentData.length != 0 && <Box height={'25rem'} overflowY={'auto'}><Accordion allowMultiple>
        {
          currentData.map((item, index) => {
            return <AccordionItem key={'parent_'+index}>
            <h2>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left' overflow={'hidden'} pr={'1rem'} textOverflow={'ellipsis'} style={{textWrap: 'nowrap'}}>
                  {item.text}
                </Box>
                <Button mr={4} onClick={e => handleSelectItem(e, item.childs)}>Select</Button>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Accordion allowMultiple>
                {item.childs.map((element, idx) => {
                  return <AccordionItem key={'child_'+idx}>
                    <h2>
                      <AccordionButton>
                        <Box as='span' flex='1' textAlign='left' py={'0.5rem'}>
                          {element}
                        </Box>
                        {/* <Button mr={4} onClick={e => e.preventDefault()}>Select</Button> */}
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel></AccordionPanel>
                  </AccordionItem>
                })}
              </Accordion>
            </AccordionPanel>
          </AccordionItem>  
          })
        }
      </Accordion></Box>}
    </Box>
  )
}
