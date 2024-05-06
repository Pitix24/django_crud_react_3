import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function EmployeeCard({ employee }) {
    const navigate = useNavigate();

    const {
        employeeid,
        lastname,
        firstname,
        title,
        titleofcourtesy,
        birthdate,
        hiredate,
        address,
        city,
        region,
        postalcode,
        country,
        homephone,
        extension,
        photo,
        notes,
        reportsto,
        photopath
    } = employee;

    return (
        <div className='bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer' onClick={() => navigate(`/employees/${employeeid}`)}>
            <h1 className='font-bold uppercase'>{employeeid}</h1>
            <p className='text-slate-400'>{lastname}</p>
            <p className='text-slate-400'>{firstname}</p>
            <p className='text-slate-400'>{title}</p>
            <p className='text-slate-400'>{titleofcourtesy}</p>
            <p className='text-slate-400'>{birthdate}</p>
            <p className='text-slate-400'>{hiredate}</p>
            <p className='text-slate-400'>{address}</p>
            <p className='text-slate-400'>{city}</p>
            <p className='text-slate-400'>{region}</p>
            <p className='text-slate-400'>{postalcode}</p>
            <p className='text-slate-400'>{country}</p>
            <p className='text-slate-400'>{homephone}</p>
            <p className='text-slate-400'>{extension}</p>
            <p className='text-slate-400'>{photo}</p>
            <p className='text-slate-400'>{notes}</p>
            <p className='text-slate-400'>{reportsto}</p>
            <p className='text-slate-400'>{photopath}</p>
        </div>
    );
}

EmployeeCard.propTypes = {
    employee: PropTypes.shape({
        employeeid: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        firstname: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        titleofcourtesy: PropTypes.string.isRequired,
        birthdate: PropTypes.string.isRequired,
        hiredate: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        region: PropTypes.string.isRequired,
        postalcode: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        homephone: PropTypes.string.isRequired,
        extension: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        notes: PropTypes.string.isRequired,
        reportsto: PropTypes.string.isRequired,
        photopath: PropTypes.string.isRequired,
    }).isRequired,
};
