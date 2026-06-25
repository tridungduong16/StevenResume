import { createBrowserRouter } from 'react-router-dom';

import { App } from '@/App';
import { ROUTES } from '@/constants/routes';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { Portfolio } from '@/pages/Portfolio';
import { Pricing } from '@/pages/Pricing';
import { Process } from '@/pages/Process';
import { Services } from '@/pages/Services';

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.services.slice(1),
        element: <Services />,
      },
      {
        path: ROUTES.portfolio.slice(1),
        element: <Portfolio />,
      },
      {
        path: ROUTES.process.slice(1),
        element: <Process />,
      },
      {
        path: ROUTES.pricing.slice(1),
        element: <Pricing />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
