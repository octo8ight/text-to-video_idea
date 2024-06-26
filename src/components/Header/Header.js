import React, { useContext, useState } from 'react'
import {
  Button,
  Input,
  Flex,
  Divider,
  Box
} from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight  } from "react-icons/fa";
import axios from 'axios';
import { GET_DATA_BY_KEYWORD_API } from '../../url';
import { AppContext } from '../../AppProvider';

export default function Header() {
  const [keyword, setKeyword] = useState('');
  const { setIsLoading, setContent, prevData, setPrevData, currentData, setCurrentData, nextData, setNextData } = useContext(AppContext);
  const handleEnter = async (e) => {
    if (e.key === 'Enter') {
      try {
        setIsLoading(true);
        const response = await axios.post(GET_DATA_BY_KEYWORD_API, {keyword});
        const {success} = response.data;
        if (success) {
          setCurrentData(response.data.data);
          setPrevData(response.data.data);
          setNextData(response.data.data);
          setContent(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }

  const handlePrevClick = () => {
    setNextData(currentData);
    setCurrentData(prevData);
  }

  const handleNextClick = () => {
    setPrevData(currentData);
    setCurrentData(nextData);
  }

  return (
    <Box>
      <Flex>
        <Button variant={'outline'} onClick={handlePrevClick}>
          <FaChevronLeft />
        </Button>
        <Input mx={2} placeholder='Search for suggestions here' variant='unstyled' value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => handleEnter(e)}/>
        <Button variant={'outline'} onClick={handleNextClick}>
          <FaChevronRight />
        </Button>
      </Flex>
      <Divider my={2} />
    </Box>
  )
}
