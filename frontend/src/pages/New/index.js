import React, {useState, useMemo } from 'react';
import api from '../../services/api'; 

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({history}) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company,setCompany] = useState('');
    const [tech,settech] = useState('');
    const [price,setPrice] = useState('');

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null; 
        }, [thumbnail]
    )

    async function handleSubmit(event) {
        event.preventDefault();
        
        const data = new FormData();
        const user_id = localStorage.getItem('user');
        
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('tech', tech);
        data.append('price', price);
        
        await api.post('/spots', data, {
            headers: {user_id}
        })

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>

            <label id="thumbnail" className={thumbnail ? 'has-thumbnail' : ''} style={{backgroundImage: `url(${preview})`}}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select IMG"/>
            </label>

            <label htmlFor="company">EMPRESA*</label>
            <input 
            value={company} 
            id="company" 
            placeholder="sua empresa incrível" 
            onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="tech">Tecnologias * <span>(separadas por vírgula)</span></label>
            <input 
            value={tech} 
            id="tech" 
            placeholder="Quais tecnologias usam? " 
            onChange={event => settech(event.target.value)}
            />

<label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUÍTO)</span> </label>
            <input 
            value={price} 
            id="price" 
            placeholder="Valor cobrado pro dia? " 
            onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )

}