import { item } from '../../helpers/item';
import ItemCard from './ItemCard';
import { useLocation } from 'react-router-dom';

import '../../styles/General.scss';

const ItemList = () => {
    const location = useLocation();
    const state = location.state;

    const items: item[] = state.items;

    return(
        <div className='app-body'>
            {items &&
            <ul className='item-container no-scroll'>
                {items &&
                items.map((item: any) => {
                    return <ItemCard item={item} key={item._id}/>
                })}
            </ul>}
        </div>
    );
}

export default ItemList;