import Home from './container/home/index';
import About from './container/about/index';
import Topics from './container/topics/index';
import Topic from './container/topics/Topic';
import Form from './container/form/index';


const routes = [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/about',
        component: About,
      },
      {
        path: '/topics',
        component: Topics,
        routes:[
          {
            path: '/topics/detail/:id',
            component: Topic,
          },
        ],
      },
      {
        path: '/form',
        component: Form,
      },
    ];

export default routes
