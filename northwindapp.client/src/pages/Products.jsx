import React, { useEffect, useState } from 'react';
import '../css/Chategories.css';

export default function Produts() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editImage, setEditImage] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        populateChategoryData();
    }, []);

    const handleImageUpload = (e, isEdit = false) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            if (isEdit) {
                setEditImage(base64String);
            } else {
                setImage(base64String);
            }
        };

        const imagePreview = document.getElementById("file-preview")
        const imageURL = URL.createObjectURL(file)
        imagePreview.src = imageURL;
    };

    const oldImagesConvertBase64 = (base64Data, id) => {
        if (id <= 8) {
            return base64Data.substring(104);
        }
        return base64Data; 
    };

    //CREATE
    const handleAddOrEditCategory = async () => {
        const newCategory = {
            categoryName: editId ? editName : name,
            description: editId ? editDescription : description,
            picture: editId ? editImage : image,
        };
        if (newCategory.categoryName.length == 0) {
            return("");
        }
        try {
            const response = await fetch(`api/Categories/${editId || ""}`, {
                method: editId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory),
            });
            if (response.ok) {
                await populateChategoryData();
                resetForm();
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
        setEditImage(category.picture);
        setEditDescription(category.description);
    };
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
        setImage('');
        setDescription('');
        setEditName('');
        setEditImage('');
        setEditDescription('');
    };

    const contents2 = categories.length === 0
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
                            <td>
                                <img src="#" alt="" id="file-preview" />
                                <input type="file" accept="image/*" id="file-upload" onChange={(e) => handleImageUpload(e)} />
                                <label for="file-upload">UploadFile</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Add Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </td>
                            <td className="action">
                                <button onClick={handleAddOrEditCategory} className="add">
                                    {editId ? "Save" : "Add"}
                                </button>
                            </td>
                        </tr>
                        {categories.map(category => (
                            <tr key={category.categoryId}>
                                <td>{category.categoryId}</td>
                                <td>
                                    {editId === category.categoryId ? (
                                        <input
                                            type="file"
                                            onChange={(e) => handleImageUpload(e, true)}
                                        />
                                    ) : (
                                            <img
                                                src={`data:image/jpeg;base64,${oldImagesConvertBase64(category.picture, category.categoryId)}`}
                                                alt="category"
                                            />
                                    )}
                                </td>
                                <td>
                                    {editId === category.categoryId ? (
                                        <input
                                            type="text"
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
                                            type="text"
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                        />
                                    ) : (
                                        category.description
                                    )}
                                </td>
                                <td className="action">
                                    {editId === category.categoryId ? (
                                        <>
                                            <button onClick={handleAddOrEditCategory} className="save">
                                                Save
                                            </button>
                                            <button onClick={resetForm} className="cancel">
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditCategory(category)} className="edit">
                                                <img src="../public/edit.png" alt="edit-icon" />
                                            </button>
                                            <button onClick={() => handleDeleteCategory(category.categoryId)} className="delete">
                                                <img src="../public/delete.png" alt="delete-icon" />
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
            {contents2}
        </div>
    );


}