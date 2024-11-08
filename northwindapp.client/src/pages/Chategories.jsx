import { Component, useEffect, useState } from 'react';
import '../css/Chategories.css'
export default function Chategories() {
    const [categories, setCategories] = useState();

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        populateChategoryData();
    }, []);


    const contents2 = categories === undefined
        ? <p>Error</p>
        :
        <main className="table">
            <section className="table__head">
                <h1>Chategories-List:</h1>
            </section>
            <section className="table_body">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th></th>
                            <th>Name</th> 
                            <th>Description</th>
                            <th></th>

                        </tr>   
                    </thead>
                    <tbody>
                        <tr>
                            <td>#</td>
                            <td><input type="text" placeholder="Upload Image" value={image }></input></td>
                            <td><input type="text" placeholder="Enter Name" value={name}></input></td>
                            <td><input type="text" placeholder="Add Description" value={description}></input></td>
                            <th className="action">
                                <button onClick={() => { value.onAdd(category.categoryId) }} className="add"><img src="../public/edit.png" alt="logo" /></button>
                            </th>
                        </tr>
                        {categories.map(category =>
                            <tr key={category.categoryId}>
                                <td>{category.categoryId}</td>
                                <td>                                            <img
                                    src={`data:image/jpeg;base64,${(category.picture).substring(104)}`}
                                    alt="category"
                                /></td>
                                <td>{category.categoryName}</td>
                                <td>{category.description}</td>
                                <th className="action">
                                    <button onClick={() => { value.onEdit(category.categoryId) }} className="edit"><img src="../public/edit.png" alt="logo" /></button>
                                    <button onClick={() => { value.onDelete(category.categoryId) }} className="delete"><img src="../public/delete.png" alt="logo" /></button>
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </main>            ;




    return (
            <div>
            <h1 id="tabelLabel">Category List</h1>
            <p>This component demonstrates chategories data from the server.</p>
            {contents2}
        </div>

    )


    async function populateChategoryData() {
        const response = await fetch('api/Categories');
        const data = await response.json();
        setCategories(data);
    }
}


