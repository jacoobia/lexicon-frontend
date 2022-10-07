import { item } from '../../helpers/item';
import '../../styles/ItemCard.scss';

type Props = {
    item: item;
}

const ItemCard = (props: Props) => {
    const { item } = props;

    return(
        <div className='card'>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>{new Date(item.added).toLocaleDateString('en-UK')}</span>
        </div>
    );

}

export default ItemCard;