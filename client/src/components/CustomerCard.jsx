import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function CustomerCard({ customer }) {
    const navigate = useNavigate();

    const {
        customerid,
        companyname,
        contactname,
        contacttitle,
        address,
        city,
        region,
        postalcode,
        country,
        phone,
        fax
    } = customer;

    return (
        <div className='bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer' onClick={() => navigate(`/customers/${customerid}`)}>
            <h1 className='font-bold uppercase'>{customerid}</h1>
            <p className='text-slate-400'>{companyname}</p>
            <p className='text-slate-400'>{contactname}</p>
            <p className='text-slate-400'>{contacttitle}</p>
            <p className='text-slate-400'>{address}</p>
            <p className='text-slate-400'>{city}</p>
            <p className='text-slate-400'>{region}</p>
            <p className='text-slate-400'>{postalcode}</p>
            <p className='text-slate-400'>{country}</p>
            <p className='text-slate-400'>{phone}</p>
            <p className='text-slate-400'>{fax}</p>
        </div>
    );
}

CustomerCard.propTypes = {
    customer: PropTypes.shape({
        customerid: PropTypes.string.isRequired,
        companyname: PropTypes.string.isRequired,
        contactname: PropTypes.string.isRequired,
        contacttitle: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        region: PropTypes.string.isRequired,
        postalcode: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        fax: PropTypes.string.isRequired,
    }).isRequired,
};
