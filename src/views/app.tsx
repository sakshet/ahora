import { AppStateProvider, ServerStateProvider } from '@Context/context';
import { Homepage } from '@Views/homepage';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

export const App = () => {
  return (
    <div style={{height: '100%', width: '100%'}}>
      <AppStateProvider>
        <ServerStateProvider>
          <AppContainer />
        </ServerStateProvider>
      </AppStateProvider>
    </div>
  );
};

const AppContainer = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

// const Home = () => {
//   // const navigate = useNavigate();
//   // const handleClick = () => navigate('/about');

//   // return (
//   //   <div>
//   //     <button onClick={handleClick}>Go to About Page</button>
//   //   </div>
//   // );
//   return (

//   );
// };

// const About = () => {
//   return <div>About Page</div>;
// };