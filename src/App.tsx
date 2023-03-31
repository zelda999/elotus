import { Layout, Menu, theme } from 'antd';
import { movieActions } from 'features/movie/movieSlice';
import MovieDetail from 'pages/MovieDetail';
import Movies from 'pages/Movies';
import NotFound from 'pages/NotFound';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hook';

const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onMenuClick = (event: any) => {
    const { key } = event;
    navigate(key);
    dispatch(movieActions.resetSearch());
  };
  const menuItems = [
    {
      key: '/top-rated',
      label: 'Top Rated',
    },
    {
      key: '/now-playing',
      label: 'Now Playing',
    },
  ];

  useEffect(() => {
    dispatch(movieActions.fetchConfig());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Header>
          <div className='logo' onClick={() => navigate('/')} />
          <Menu
            theme='dark'
            mode='horizontal'
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={onMenuClick}
          />
        </Header>
        <Layout>
          <Content className='wrapper-content'>
            <div
              style={{
                padding: 24,
                minHeight: 'calc(100vh - 177px)',
                background: colorBgContainer,
              }}
            >
              <Routes>
                <Route path='/' element={<Movies typeMovie='popular' />} />
                <Route
                  path='/top-rated'
                  element={<Movies typeMovie='top_rated' />}
                />
                <Route
                  path='/now-playing'
                  element={<Movies typeMovie='now_playing' />}
                />
                <Route path='/movie/:id' element={<MovieDetail />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Movies App</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
