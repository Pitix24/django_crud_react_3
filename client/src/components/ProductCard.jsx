import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function ProductCard({ product }) {
    const navigate = useNavigate();

    const {
        productid,
        productname,
        supplierid,
        categoryid,
        quantityperunit,
        unitprice,
        unitsinstock,
        unitsonorder,
        reorderlevel,
        discontinued,
    } = product;

    return (
        <div className='bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer' onClick={() => navigate(`/products/${productid}`)}>
            <h1 className='font-bold uppercase'>{productid}</h1>
            <p className='text-slate-400'>{productname}</p>
            <p className='text-slate-400'>{supplierid}</p>
            <p className='text-slate-400'>{categoryid}</p>
            <p className='text-slate-400'>{quantityperunit}</p>
            <p className='text-slate-400'>{unitprice}</p>
            <p className='text-slate-400'>{unitsinstock}</p>
            <p className='text-slate-400'>{unitsonorder}</p>
            <p className='text-slate-400'>{reorderlevel}</p>
            <p className='text-slate-400'>{discontinued}</p>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        productid: PropTypes.string.isRequired,
        productname: PropTypes.string.isRequired,
        supplierid: PropTypes.string.isRequired,
        categoryid: PropTypes.string.isRequired,
        quantityperunit: PropTypes.string.isRequired,
        unitprice: PropTypes.string.isRequired,
        unitsinstock: PropTypes.string.isRequired,
        unitsonorder: PropTypes.string.isRequired,
        reorderlevel: PropTypes.string.isRequired,
        discontinued: PropTypes.string.isRequired,
    }).isRequired,
};
