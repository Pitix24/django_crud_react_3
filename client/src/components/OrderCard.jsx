import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function OrderCard({ order }) {
    const navigate = useNavigate();

    const {
        orderid,
        customerid,
        employeeid,
        orderdate,
        requireddate,
        shippeddate,
        shipvia,
        freight,
        shipname,
        shipaddress,
        shipcity,
        shipregion,
        shippostalcode,
        shipcountry
    } = order;

    return (
        <div className='bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer' onClick={() => navigate(`/orders/${orderid}`)}>
            <h1 className='font-bold uppercase'>{orderid}</h1>
            <p className='text-slate-400'>{customerid}</p>
            <p className='text-slate-400'>{employeeid}</p>
            <p className='text-slate-400'>{orderdate}</p>
            <p className='text-slate-400'>{requireddate}</p>
            <p className='text-slate-400'>{shippeddate}</p>
            <p className='text-slate-400'>{shipvia}</p>
            <p className='text-slate-400'>{freight}</p>
            <p className='text-slate-400'>{shipname}</p>
            <p className='text-slate-400'>{shipaddress}</p>
            <p className='text-slate-400'>{shipcity}</p>
            <p className='text-slate-400'>{shipregion}</p>
            <p className='text-slate-400'>{shippostalcode}</p>
            <p className='text-slate-400'>{shipcountry}</p>
        </div>
    );
}

OrderCard.propTypes = {
    order: PropTypes.shape({
        orderid: PropTypes.string.isRequired,
        customerid: PropTypes.string.isRequired,
        employeeid: PropTypes.string.isRequired,
        orderdate: PropTypes.string.isRequired,
        requireddate: PropTypes.string.isRequired,
        shippeddate: PropTypes.string.isRequired,
        shipvia: PropTypes.string.isRequired,
        freight: PropTypes.string.isRequired,
        shipname: PropTypes.string.isRequired,
        shipaddress: PropTypes.string.isRequired,
        shipcity: PropTypes.string.isRequired,
        shipregion: PropTypes.string.isRequired,
        shippostalcode: PropTypes.string.isRequired,
        shipcountry: PropTypes.string.isRequired,
    }).isRequired,
};
