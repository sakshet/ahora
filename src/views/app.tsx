import { AppStateProvider, ServerStateProvider } from '@Context/context';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

export const App = () => {
  return (
    <div>Hey there!</div>
  );
}
// export const App = () => {
//   return (
//     <>
//       <AppStateProvider>
//         <ServerStateProvider>
//           <AppContainer />
//         </ServerStateProvider>
//       </AppStateProvider>
//     </>
//   );
// };

// const AppContainer = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </Router>
//   );
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const handleClick = () => navigate('/about');

//   return (
//     <div>
//       <button onClick={handleClick}>Go to About Page</button>
//     </div>
//   );
// };

// const About = () => {
//   return <div>About Page</div>;
// };