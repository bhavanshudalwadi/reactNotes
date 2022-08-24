import { Button } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import noteContext from '../contexts/notes/noteContext';
import Notes from './Notes';

const Home = () => {
  const { token } = useContext(noteContext)

  return (
    <div className='grid-container'>
      {token?
        <Notes />
      :
        <div>
          <h2>Take Your Notes Safely</h2>
          <Link to="/login">
            <Button
              variant='contained'
            >
              Login Now
            </Button>
          </Link>
        </div>
      }
    </div>
  )
}

export default Home
