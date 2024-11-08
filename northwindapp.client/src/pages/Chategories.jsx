import { Component, useEffect, useState } from 'react';
import '../css/Chategories.css'
export default function Chategories() {
    const [categories, setCategories] = useState();

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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category =>
                            <tr key={category.categoryId}>
                                <td>{category.categoryId}</td>
                                <td><img src={`data:image/jpg;base64,${category.picture.substring(104)}`} /></td>
                                <td>{category.categoryName}</td>
                                <td>{category.description}</td>
                                <th className="action"><button className="edit">E</button><button className="delete">D</button></th>
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


