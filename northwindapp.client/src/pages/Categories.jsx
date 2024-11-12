import React, { useEffect, useState } from 'react';
import '../css/Categories.css';

export default function Categories() {
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

    const imagePreview = document.getElementById("file-preview")
    const EditPreview = document.getElementById("edit-preview")


    const handleImageUpload = (e, isEdit) => {
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            if (isEdit) {
                setEditImage(base64String);
                EditPreview.src = imageURL;
            } else {
                setImage(base64String);
                imagePreview.src = imageURL;
            }
        };
    };


    const oldImagesConvertBase64 = (base64Data, id) => {
        if (id <= 8) {
            return base64Data.substring(104);
        }
        return base64Data;
    };

    //CREATE
    const handleAddCategory = async () => {
        const newCategory = {
            categoryName: name,
            description: description,
            picture: image,
        };

        var re = /^[a-zA-Z]+$/;
        if (newCategory.categoryName.length == 0 || !re.test(newCategory.categoryName) || newCategory.categoryName.length > 40) {
            document.getElementById("name").className = "Error";
            return ("");
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

    const EditCategory = async () => {
        const newCategory = {
            categoryName: editName,
            description: editDescription,
            picture: editImage,
        };

        var re = /^[a-zA-Z]+$/;
        if (newCategory.categoryName.length == 0 || !re.test(newCategory.categoryName) || newCategory.categoryName.length > 40) {
            document.getElementById("editname").className = "Error";
            return ("");
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
        setImage('');
        setDescription('');
        imagePreview.src = "/upload.png";
        document.getElementById("name").className = "";
        setEditName('');
        setEditImage('');
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
                                <img className="uploadImg" src="/upload.png" alt="" id="file-preview" />
                                <input type="file" accept="image/*" id="file-upload" onChange={(e) => handleImageUpload(e, false)} />
                                <label for="file-upload">UploadFile</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Enter Name*"
                                    id="name"
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
                                <button onClick={handleAddCategory} className="add">
                                    <img src="/edit.png" alt="edit-icon" />
                                </button>
                            </td>
                        </tr>
                        {categories.map(category => (
                            <tr key={category.categoryId}>
                                <td>{category.categoryId}</td>
                                <td>
                                    {editId === category.categoryId ? (
                                        <div>
                                            <img className="uploadImg" src="/upload.png" alt="" id="edit-preview" />
                                            <input type="file" accept="image/*" id="file-edit" onChange={(e) => handleImageUpload(e, true)} />
                                            <label for="file-edit">UploadFile</label>
                                        </div>

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