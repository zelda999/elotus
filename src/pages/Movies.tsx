import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Skeleton, Typography } from 'antd';
import SearchBox from 'components/SearchBox';
import {
  movieActions,
  selectConfigImg,
  selectIsSearch,
  selectListMovies,
  selectLoading,
  selectPageCurrent,
  selectTotalResults,
} from 'features/movie/movieSlice';
import { ListMoviesResponse } from 'features/movie/movieTypes';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { convertToDate } from 'utils/functions';

const { Link: LinkCustom, Text } = Typography;

interface IMoviesProps {
  typeMovie: string;
}

enum ActionIcon {
  LIST,
  GRID,
}

const Movies = ({ typeMovie }: IMoviesProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const configImg = useAppSelector(selectConfigImg);
  const isLoading = useAppSelector(selectLoading);
  const isSearch = useAppSelector(selectIsSearch);
  const pageCurrent = useAppSelector(selectPageCurrent);
  const listMovies = useAppSelector(selectListMovies);
  const totalResults = useAppSelector(selectTotalResults);

  const [currPage, setCurrPage] = useState(pageCurrent);
  const [currPageSearch, setCurrPageSearch] = useState(2);

  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    if (typeMovie) {
      dispatch(
        movieActions.fetchListMovies({
          type: typeMovie,
          page: currPage,
        })
      );
    }
  }, [currPage, dispatch, typeMovie]);

  const [isList, setIsList] = useState(false);
  const [isActiveIcon, setIsActiveIcon] = useState<ActionIcon>(ActionIcon.GRID);
  const handleActiveIcon = (format: ActionIcon) => {
    setIsList(ActionIcon.LIST === format);
    setIsActiveIcon(format);
  };

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListMoviesResponse[]>([]);
  const [list, setList] = useState<ListMoviesResponse[]>([]);

  const prevTypeMovieRef = useRef<string>();
  const [typeName, setTypeName] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    prevTypeMovieRef.current = typeName;
  }, [typeName]);

  useEffect(() => {
    if (isLoadMore && totalResults > 0) return;

    if (prevTypeMovieRef.current !== typeMovie) {
      setInitLoading(false);
      setData(listMovies);
      setList(listMovies);
      setTypeName(typeMovie);
    } else {
      setList(() => [...[], ...listMovies]);
      setData(() => [...[], ...listMovies]);
    }
    if (totalResults === 0) {
      setList([]);
      setData([]);
    }
  }, [typeMovie, listMovies, isLoadMore, totalResults]);

  useEffect(() => {
    if (prevTypeMovieRef.current !== typeMovie) {
      setIsLoadMore(false);
      setCurrPage(1);
      setCurrPageSearch(2);
    }
    if (isSearch) {
      setIsLoadMore(false);
    }
  }, [typeMovie, isSearch]);

  const onLoadMore = () => {
    setCurrPage((prevCurrent) => prevCurrent + 1);
    setLoading(true);
    const newData = data.concat(listMovies);
    setData(newData);
    setList(newData);
    setLoading(false);
    setIsLoadMore(true);
  };

  const onLoadMoreSearch = () => {
    setCurrPageSearch((prevCurrent) => prevCurrent + 1);
    setLoading(true);
    const newData = data.concat(listMovies);
    setData(newData);
    setList(newData);
    setLoading(false);
    setIsLoadMore(true);
    dispatch(
      movieActions.searchMovie({
        searchText,
        typeMovie,
        page: currPageSearch,
      })
    );
  };

  const loadMore =
    !initLoading && !loading && totalResults > 0 ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={isSearch ? onLoadMoreSearch : onLoadMore}>
          Loading more...
        </Button>
      </div>
    ) : null;

  return (
    <>
      <SearchBox
        title={typeMovie}
        getSearchText={(value) => setSearchText(value)}
      />

      <div className='group-actions'>
        <LinkCustom
          onClick={() => handleActiveIcon(ActionIcon.LIST)}
          className={`${isActiveIcon === ActionIcon.LIST ? 'active-icon' : ''}`}
        >
          <UnorderedListOutlined style={{ fontSize: 22, marginRight: 8 }} />
        </LinkCustom>
        <LinkCustom
          onClick={() => handleActiveIcon(ActionIcon.GRID)}
          className={`${isActiveIcon === ActionIcon.GRID ? 'active-icon' : ''}`}
        >
          <AppstoreOutlined style={{ fontSize: 22 }} />
        </LinkCustom>
      </div>

      {!isList ? (
        <List
          className='list-movie'
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 }}
          style={{ marginTop: 12 }}
          loading={initLoading}
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item) => (
            <List.Item onClick={() => navigate(`/movie/${item.id}`)}>
              <Skeleton avatar title={false} loading={isLoading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={150}
                      shape='square'
                      src={`${
                        item.poster_path
                          ? configImg.images.base_url +
                            'w300' +
                            item.poster_path
                          : 'error'
                      }`}
                      srcSet={`${
                        item.poster_path
                          ? configImg.images.base_url +
                            'w220_and_h330_face' +
                            item.poster_path +
                            ' 1x, ' +
                            configImg.images.base_url +
                            'w440_and_h660_face' +
                            item.poster_path +
                            ' 2x'
                          : ''
                      }`}
                    />
                  }
                  title={
                    <Link to={`/movie/${item.id}`}>{item.original_title}</Link>
                  }
                  description={
                    <Text style={{ width: 100, opacity: 0.4 }} ellipsis>
                      {convertToDate(item.release_date)}
                    </Text>
                  }
                />
              </Skeleton>
            </List.Item>
          )}
        />
      ) : (
        <List
          className='list-movie'
          loading={initLoading}
          itemLayout='horizontal'
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item) => (
            <List.Item onClick={() => navigate(`/movie/${item.id}`)}>
              <Skeleton avatar title={false} loading={isLoading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={150}
                      shape='square'
                      src={`${
                        item.poster_path
                          ? configImg.images.base_url +
                            'w300' +
                            item.poster_path
                          : 'error'
                      }`}
                      srcSet={`${
                        item.poster_path
                          ? configImg.images.base_url +
                            'w220_and_h330_face' +
                            item.poster_path +
                            ' 1x, ' +
                            configImg.images.base_url +
                            'w440_and_h660_face' +
                            item.poster_path +
                            ' 2x'
                          : ''
                      }`}
                    />
                  }
                  title={
                    <Link to={`/movie/${item.id.toString()}`}>
                      {item.original_title}
                    </Link>
                  }
                  description={
                    <Text style={{ opacity: 0.4 }}>
                      {convertToDate(item.release_date)}
                    </Text>
                  }
                />
              </Skeleton>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default Movies;
