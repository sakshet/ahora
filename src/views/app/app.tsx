import { Header } from '@Components';
import { AppStateProvider, ServerStateProvider } from '@Context';
import { createStyleSheet, useStyleSheet } from '@Core/theme';
import { MortgageCalculator } from '@Views';

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AppContainer = () => {
  return (
    <AppStateProvider useMockData={true}>
      <ServerStateProvider>
        <App />
      </ServerStateProvider>
    </AppStateProvider>
  );
};

const appStyleSheet = createStyleSheet('appStyles', () => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  routes: {
    padding: '15px 30px',
    height: '100%',
  },
}));
const App = () => {
  const classes = useStyleSheet(appStyleSheet, null);
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.routes}>
        <Routes>
          <Route path="/" element={<div>Welcome</div>} />

          {/* TODO - Generalise these based on a config */}
          <Route path="/about" element={<div>About</div>} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />

          {/* TODO - Add 404 error path */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

// const generateRoutes = (
//   blurContent: boolean,
//   services: Service[],
// ): JSX.Element[] => {
//   const routes: JSX.Element[] = [];

//   const createRoutes = (services: Service[]) => {
//     services.forEach((service, key) => {
//       routes.push(
//         <Route
//           key={key}
//           path={service.path}
//           element={
//             <StyledComponent blurcontent={blurContent}>
//               <Content />
//             </StyledComponent>
//           }
//         />,
//       );
//       if (service.subServices && service.subServices.length > 0) {
//         createRoutes(service.subServices);
//       }
//     });
//   };

//   createRoutes(services);
//   return routes;
// };

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   flex-wrap: nowrap;
// `;
// const StyledRoute = styled.div<{ $blurcontent: string }>`
//   flex-grow: 1;
//   overflow: auto;
//   background: ${colors.gray010};
//   position: absolute;
//   height: 100%;
//   width: 100%;
//   margin-top: ${HEADER_HEIGHT + 2 * HEADER_PADDING}px;
//   opacity: ${(props) => (props.$blurcontent === 'true' ? '25%' : '100%')};
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const StyledComponent = ({
//   blurcontent,
//   children,
// }: {
//   blurcontent: boolean;
//   children: ReactElement;
// }) => (
//   <StyledRoute $blurcontent={blurcontent.toString()}>{children}</StyledRoute>
// );

// export const AppRoutes = () => {
//   const [blurContent, setBlurContent] = useState<boolean>(false);
//   const { options } = useServicesData();

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const redirectPath = params.get('redirect');
//     options;
//     if (redirectPath) {
//       navigate(redirectPath);
//     }
//   }, [navigate, location.search]);

//   return (
//     <Wrapper>
//       <Header
//         onSubMenuHide={() => setBlurContent(false)}
//         onSubMenuShow={() => setBlurContent(true)}
//       />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <StyledComponent blurcontent={blurContent}>
//               <Content />
//             </StyledComponent>
//           }
//         />
//         <Route
//           path="/mortgage-calculator"
//           element={
//             <StyledComponent blurcontent={blurContent}>
//               <MortgageCalculator />
//             </StyledComponent>
//           }
//         />
//         {generateRoutes(blurContent, options)}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Wrapper>
//   );
// };
