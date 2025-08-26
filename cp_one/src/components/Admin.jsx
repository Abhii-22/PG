import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import areasData from '../data/pgData.js';
import './Admin.css';

const Admin = () => {
  const [pgs, setPgs] = useState([]);
  const [form, setForm] = useState({
    name: '',
    images: [],
    price: '',
    sharing: '',
    rating: '',
    gender: 'Boys',
    location: '',
    description: '',
    facilities: '',
    area: areasData[0]?.name || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPgId, setCurrentPgId] = useState(null);

  useEffect(() => {
    fetchPgs();
  }, []);

  const fetchPgs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pgs');
      setPgs(response.data);
    } catch (error) {
      console.error('Error fetching PGs:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setForm(prevForm => ({ ...prevForm, images: [...prevForm.images, response.data.imageUrl] }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const removeImage = (index) => {
    setForm(prevForm => ({
        ...prevForm,
        images: prevForm.images.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setForm({
      name: '', images: [], price: '', sharing: '', rating: '', gender: 'Boys',
      location: '', description: '', facilities: '', area: areasData[0]?.name || ''
    });
    setIsEditing(false);
    setCurrentPgId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pgData = {
      ...form,
      facilities: Array.isArray(form.facilities) ? form.facilities : form.facilities.split(',').map(s => s.trim()),
      price: Number(form.price),
      rating: Number(form.rating)
    };

    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:5000/api/pgs/${currentPgId}`, pgData);
        setPgs(pgs.map(pg => (pg._id === currentPgId ? response.data : pg)));
        alert('PG updated successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/api/pgs', pgData);
        setPgs([...pgs, response.data]);
        alert('New PG added!');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving PG:', error);
      alert('Failed to save PG.');
    }
  };

  const handleEdit = (pg) => {
    setForm({
        ...pg,
        images: pg.images || [],
        facilities: Array.isArray(pg.facilities) ? pg.facilities.join(', ') : pg.facilities,
    });
    setIsEditing(true);
    setCurrentPgId(pg._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this PG?')) {
        try {
            await axios.delete(`http://localhost:5000/api/pgs/${id}`);
            setPgs(pgs.filter(pg => pg._id !== id));
            alert('PG deleted successfully');
        } catch (error) {
            console.error('Error deleting PG:', error);
            alert('Failed to delete PG.');
        }
    }
  };

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <h2>Admin Menu</h2>
        <nav>
          <ul>
            <li className="active">Manage PGs</li>
            <li>Users</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main-content">
        <div className="form-container">
          <h2>{isEditing ? 'Edit PG' : 'Add a New PG'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label>PG Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter PG Name" required />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Enter Location" required />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
                </div>
                <div className="form-group">
                    <label>Sharing</label>
                    <input type="text" name="sharing" value={form.sharing} onChange={handleChange} placeholder="e.g., 1, 2, 3" required />
                </div>
                 <div className="form-group">
                    <label>Rating</label>
                    <input type="number" step="0.1" name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange}>
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                 <div className="form-group">
                    <label>Area</label>
                    <select name="area" value={form.area} onChange={handleChange}>
                        {areasData.map(area => (
                            <option key={area.name} value={area.name}>{area.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-group">
              <label>Images</label>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <div className="image-previews">
                {form.images.map((url, index) => (
                  <div key={index} className="image-preview">
                    <img src={url} alt={`preview ${index}`} />
                    <button type="button" onClick={() => removeImage(index)} className="btn-remove-img">Remove</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
                <label>Facilities</label>
                <input type="text" name="facilities" value={form.facilities} onChange={handleChange} placeholder="Facilities (comma-separated)" />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description"></textarea>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-submit">{isEditing ? 'Update PG' : 'Add PG'}</button>
                {isEditing && <button type="button" className="btn-cancel" onClick={resetForm}>Cancel</button>}
            </div>
          </form>
        </div>
        <div className="pg-list-container">
          <h2>Existing PGs</h2>
          <div className="pg-list-admin">
            {pgs.map(pg => (
              <div key={pg._id} className="pg-card-admin">
                <img src={pg.images[0] || 'https://via.placeholder.com/150'} alt={pg.name} className="pg-card-admin-img" />
                <div className="pg-card-admin-body">
                    <h4>{pg.name}</h4>
                    <p>{pg.location}</p>
                    <div className="pg-card-admin-actions">
                        <button onClick={() => handleEdit(pg)} className="btn-edit">Edit</button>
                        <button onClick={() => handleDelete(pg._id)} className="btn-delete">Delete</button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
