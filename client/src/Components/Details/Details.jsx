import React, { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogDetails, clearDetails } from '../../Redux/Actions';
import { useParams } from 'react-router-dom';

export function Details() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const dogDetail = useSelector(state => state.details)

    useEffect(() => {
        dispatch(getDogDetails(id));
        return () => {
            dispatch(clearDetails())
        }
    }, [dispatch, id])


    return (
        <div >
        { dogDetail.length > 0 ?
            (dogDetail.map(d => (
                <div key={d.id}>
                    <div>
                        <img src={d.image} alt={d.name} 
                            width={165} height={190}
                            onError={e => {
                                e.target.onerror = null;
                                e.target.src = "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ce8b1e76965389.5c7945b0cffef.gif";    
                            }}
                        />
                    </div>
                    <div>
                            <h3>{d.name.toUpperCase()}</h3>
                            <p><strong>Temperaments:</strong> {d.temperaments} Kg.</p>
                            <p><strong>Weight:</strong> {d.weight} Kg.</p>
                            <p><strong>Height:</strong> {d.height} cm.</p>
                            <p><strong>Years:</strong> {d.years}</p>
                    </div>
                </div>
            )
            )): <p>Loading...</p>}
    </div>
    )
}