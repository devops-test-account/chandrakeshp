import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const fetchItems = async () => {
        const response = await axios.get('http://localhost:5000/items');
        setItems(response.data);
    };
    const createItem = async () => {
        await axios.post('http://localhost:5000/items', { name, description });
        fetchItems();
    };
    const updateItem = async (id) => {
        await axios.put(`http://localhost:5000/items/${id}`, { name, description });
        fetchItems();
    };
    const deleteItem = async (id) => {
        await axios.delete(`http://localhost:5000/items/${id}`);
        fetchItems();
    };
    useEffect(() => {
        fetchItems();
    }, []);
    return (
        <div>
            <h1>CRUD App</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={createItem}>Add Item</button>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} 
                        <button onClick={() => updateItem(item.id)}>Update</button>
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default App;