import React, { useEffect, useState } from 'react';
import '../css/Categories.css';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        populateChategoryData();
    }, []);

    //CREATE
    const handleAddCategory = async () => {
        const newCategory = {
            categoryName: name,
            description: description,
        };
        document.getElementById("createerror").innerHTML = "";
        document.getElementById("name").className = "";
        document.getElementById("description").className = "";

        var errorText = "";

        var re = /^[a-zA-Z''-'\s]{1,40}$/;
        if (newCategory.categoryName == "") {
            errorText += "Field is required! <br>";
        }
        else if (newCategory.categoryName.length > 40) {
            errorText += "Name cannot be over 40 characters!<br>"
        }
        else if (!re.test(newCategory.categoryName)) {
            errorText += "Characters are not allowed!<br>";
        }
        if (newCategory.description.length > 100) {
            errorText += "Description cannot be over 100 characters!<br>"
        }
        if (newCategory.description.length > 100) {
            errorText += "Description cannot be over 100 characters!<br>"
            document.getElementById("description").className = "Error";
        }
        if (errorText.length > 0) {
            document.getElementById("createerror").innerHTML = errorText;
            document.getElementById("name").className = "Error";
            return;
        }


        try {
            const response = await fetch(`api/Categories/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory),
            });
            if (response.ok) {
                await populateChategoryData();
                resetForm();
                document.getElementById("createerror").innerHTML = "";
            } else {
                const errorResponse = await response.json(); 
                if (errorResponse.errors) {
                    const errors = Object.entries(errorResponse.errors) // Object.entries az errors mezőhöz
                        .map(([field, messages]) => `${messages.join("<br>")}`) // Mezők és üzenetek
                        .join("<br>"); // Újsorral elválasztott hibalista

                    document.getElementById("createerror").innerHTML = `Hiba: ${response.status}<br>${errors}`;
                } else {
                    document.getElementById("createerror").innerHTML = `Hiba: ${response.status} - ${errorResponse.title}`;
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    //READ
    async function populateChategoryData() {
        try {
            const response = await fetch('api/Categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                console.error("Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    //UPDATE
    const handleEditCategory = (category) => {
        setEditId(category.categoryId);
        setEditName(category.categoryName);
        setEditDescription(category.description);
    };

    const EditCategory = async () => {
        const newCategory = {
            categoryName: editName,
            description: editDescription,
        };

        document.getElementById("editerror").innerHTML = "";
        var errorText = "";

        var re = /^[a-zA-Z''-'\s]{1,40}$/;
        if (newCategory.categoryName == "") {
            errorText += "Field is required! <br>";
        }
        else if (newCategory.categoryName.length > 40) {
            errorText += "Name cannot be over 40 characters!<br>"
        }
        else if (!re.test(newCategory.categoryName)) {
            errorText += "Characters are not allowed!<br>";
        }
        if (newCategory.description.length > 100) {
            errorText += "Description cannot be over 100 characters!<br>"
            document.getElementById("editdescription").className = "Error";
        }
        if (errorText.length > 0) {
            document.getElementById("editerror").innerHTML = errorText;
            document.getElementById("editname").className = "Error";
            return;
        }

        try {
            const response = await fetch(`api/Categories/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory),
            });
            if (response.ok) {
                await populateChategoryData();
                resetForm();
                document.getElementById("editerror").innerHTML = "";
            } else {
                const errorResponse = await response.json();
                if (errorResponse.errors) {
                    const errors = Object.entries(errorResponse.errors) // Object.entries az errors mezőhöz
                        .map(([field, messages]) => `${messages.join(", ")}`) // Mezők és üzenetek
                        .join("<br>"); // Újsorral elválasztott hibalista

                    document.getElementById("editerror").innerHTML = `Hiba: ${response.status}<br>${errors}`;
                } else {
                    document.getElementById("editerror").innerHTML = `Hiba: ${response.status} - ${errorResponse.title}`;
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    //DELETE
    const handleDeleteCategory = async (categoryId) => {
        try {
            const response = await fetch(`api/Categories/${categoryId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                await populateChategoryData();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const resetForm = () => {
        setEditId(null);
        setName('');
        setDescription('');
        document.getElementById("name").className = "";
        document.getElementById("editname").className = "";
        document.getElementById("editdescription").className = "";
        setEditName('');
        setEditDescription('');
    };

    const contents = categories.length === 0
        ? <p>Error</p>
        :
        
        <main className="table">
            <section className="table__head">
                <h1>Categoriy - List:</h1>
            </section>
            <section className="table_body">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#</td>
                            <td>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    placeholder="Enter Name*"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="description"
                                    placeholder="Add Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </td>
                            <td id="createerror"></td>
                            <td className="action">
                                <button onClick={handleAddCategory} className="add"><img src="/edit.png" alt="add-icon" /></button>
                            </td>
                        </tr>
                        {categories.map(category => (
                            <tr key={category.categoryId}>
                                <td>{category.categoryId}</td>
                                <td>
                                    {editId === category.categoryId ? (
                                        <input
                                            id="editname"
                                            type="text"
                                            placeholder="Enter Name*"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                        />
                                    ) : (
                                        category.categoryName
                                    )}
                                </td>

                                <td>
                                    {editId === category.categoryId ? (
                                        <input
                                            id="editdescription"
                                            type="text"
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                        />
                                    ) : (
                                        category.description
                                    )}
                                </td>
                                <td>
                                    {editId === category.categoryId ? (
                                        <div id="editerror"></div>
                                    ) : (
                                        ""
                                    )}
                                </td>

                                <td className="action">
                                    {editId === category.categoryId ? (
                                        <>
                                            <button onClick={EditCategory} className="add">
                                                Save
                                            </button>
                                            <button onClick={resetForm} className="delete">
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditCategory(category)} className="edit">
                                                <img src="/edit.png" alt="edit-icon" />
                                            </button>
                                            <button onClick={() => handleDeleteCategory(category.categoryId)} className="delete">
                                                <img src="/delete.png" alt="delete-icon" />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>;

    return (
        <div>
            <h1 id="tabelLabel">Category List</h1>
            <p>This component demonstrates categories data from the server.</p>
            {contents}
        </div>
    );


}