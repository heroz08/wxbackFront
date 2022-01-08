import { Redirect, Route } from 'react-router-dom';
import { session } from 'utilfc';
import routerConfig from '@/router/routerConfig';

export default function RouterView({ location }) {
  const { pathname, search } = location;
  const isLogin = session.get('isLogin');
  if (!isLogin) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { redirect: pathname + search } }}
      />
    );
  }

  return (
    <>
      {
        routerConfig.map((router) => {
          const Component = router.component;
          return (
            <Route
              path={router.path}
              component={Component}
              key={router.path}
              {...router}
            />
          );
        })
      }
    </>
  );
}
