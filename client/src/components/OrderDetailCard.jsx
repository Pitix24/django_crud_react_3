import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function OrderDetailCard({ orderDetail }) {
    const navigate = useNavigate();

    const {
        orderid,
        productid,
        unitprice,
        quantity,
        discount,
    } = orderDetail;

    return (
        <div className='bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer' onClick={() => navigate(`/orderdetails/${orderid}`)}>
            <h1 className='font-bold uppercase'>{orderid}</h1>
            <p className='text-slate-400'>{productid}</p>
            <p className='text-slate-400'>{unitprice}</p>
            <p className='text-slate-400'>{quantity}</p>
            <p className='text-slate-400'>{discount}</p>
        </div>
    );
}

OrderDetailCard.propTypes = {
    orderDetail: PropTypes.shape({
        orderid: PropTypes.string.isRequired,
        productid: PropTypes.string.isRequired,
        unitprice: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        discount: PropTypes.string.isRequired,
    }).isRequired,
};