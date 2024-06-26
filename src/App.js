import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import { useContext } from 'react';
import { AppContext } from './AppProvider';
import {
  Center,
  CircularProgress
} from '@chakra-ui/react';

function App() {
  const { isLoading } = useContext(AppContext);
  return (
    <div className="App">
      {isLoading && <Center position={'absolute'} width={'full'} height={'full'} left={0} top={0} zIndex={1} background={'#ffffffa8'}>
        <CircularProgress isIndeterminate color='green.300'/>
      </Center>}
      <Header />
      <Content />
    </div>
  );
}

export default App;
