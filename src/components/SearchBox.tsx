import { Divider, Input } from 'antd';
import { movieActions } from 'features/movie/movieSlice';
import { useAppDispatch } from 'store/hook';

const { Search } = Input;

interface ISearchBoxProps {
  title: string;
  getSearchText?: (text: string) => void;
}

const SearchBox = ({ title, getSearchText }: ISearchBoxProps) => {
  const dispatch = useAppDispatch();
  const onSearch = (textSearch: string) => {
    dispatch(
      movieActions.searchMovie({
        searchText: textSearch,
        typeMovie: title,
        page: 1,
      })
    );
    getSearchText && getSearchText(textSearch);
  };
  return (
    <div className='header-page'>
      <div className='header-heading'>
        <Divider>{title.replace('_', ' ').toUpperCase()}</Divider>
      </div>
      <div className='header-content'>
        <Search
          placeholder='Search Movie'
          onSearch={onSearch}
          enterButton
          size='large'
          className='search-custom'
        />
      </div>
      <Divider dashed />
    </div>
  );
};

export default SearchBox;
