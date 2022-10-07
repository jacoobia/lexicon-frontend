import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { get, post } from './services/api';
import { Icon } from '@iconify/react';

import './styles/General.scss';
import { item } from './helpers/item';
import ItemCard from './components/items/ItemCard';

const url = process.env.REACT_APP_API_URL;

const Home = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<any>({});

  const [search, setSearch] = useState<item[]>([]);
  const [items, setItems] = useState<item[]>([]);

  useEffect(() => {
    getFirstPage();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setName(value);
    if(!value.length) {
      getFirstPage();
    }
    else {
      if(!search.length) {
        getFilterList();
      }
      else if(search.length) {
        const filtered = search.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        setItems(filtered);
      }
    }
  }

  const getFirstPage = async() => {
    const {success, data, error } = await get(url!);
    if(success) {
      setItems(data!);
      setSearch([]);
    } else {
      if(error)
        setError(error);
    }
  }

  const getFilterList = async() => {
    const {success, data, error } = await post(`${url}/search`, { name });
    if(success) {
      setSearch(data!);
      setItems(data!);
    } else {
      if(error)
        setError(error);
    }
  }

  return (
    <div className='app'>
      <div className='app-header'>
        <form className='search-form' onSubmit={handleSubmit}>
          <div className='item-search-box'>
            <input name='name' type='text' onChange={handleChange}/>
            <button type='submit'>
              <Icon icon="akar-icons:search" width="26" height="26" />
            </button>
          </div>
        </form>
        
        <button>Add</button>
      </div>
      <div className='app-body'>
            {items &&
            <ul className='item-container no-scroll'>
                {items &&
                items.map((item: any) => {
                    return <ItemCard item={item} key={item._id}/>
                })}
            </ul>}
        </div>
    </div>
  );
}

export default Home;
