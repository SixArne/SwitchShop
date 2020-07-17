import React, {useState} from 'react';
import {useApi} from "../../../services";

import './ProductForm.scss';

const ProductForm = () => {
		const { createProduct } = useApi();

		const [name, setName] = useState('')
		const [desc, setDesc] = useState('')
		const [price, setPrice] = useState('0.0')
		const [rDate, setRDate] = useState('0')
		const [stock, setStock] = useState('0')
		const [brand, setBrand] = useState('')
		const [warranty, setWarranty] = useState('')
		const [developer, setDeveloper] = useState('')
		const [publisher, setPublisher] = useState('')
		const [menuLang, setMenuLang] = useState('')
		const [spokenLang, setSpokenLang] = useState('')
		const [PEGIAge, setPEGIAge] = useState('')
		const [PEGIContent, setPEGIContent] = useState('')
		const [files, setFiles] = useState(null)

		const handleCreate = async (ev) => {
				ev.preventDefault();

				const formData = new FormData();

				// formData.append('productImage', files[0]);

				formData.append("description", desc);
				formData.append("title", name);
				formData.append("price", price);
				formData.append("releaseDate", rDate);
				// formData.append("stock", stock);
				formData.append("brand", brand);
				formData.append("warranty", warranty);
				formData.append("developer", developer);
				formData.append("publisher", publisher);
				formData.append("PEGIage", PEGIAge);
				formData.append("PEGIcontent", PEGIContent);
				formData.append("menuLanguage", menuLang);
				formData.append("spokenLanguage", spokenLang);

				console.log(formData);

				await createProduct(formData);
		}

		const fileSelectedHandler = (ev) => {
				setFiles(ev.target.files);
		}

		return (
				<form onSubmit={handleCreate} className="form my-3" encType="multipart/form-data">
						<div className="form-group">
								<label htmlFor="product-name">Product name</label>
								<input
										type="text"
										onChange={(ev) => setName(ev.target.value)}
								/>
						</div>
						<div className="form-group">
								<label htmlFor="product-desc">Product description</label>
								<input type="text" onChange={(ev) => setDesc(ev.target.value)}/>
						</div>
						<div className="form-group">
								<label htmlFor="product-price">Product price</label>
								<input type="text" onChange={(ev) => setPrice(ev.target.value)}/>
						</div>
						<div className="form-group">
								<label htmlFor="product-price">Product release date</label>
								<input type="text" onChange={(ev) => setRDate(ev.target.value)}/>
						</div>
						<div className="form-group">
								<label htmlFor="product-price">Product stock</label>
								<input type="text" onChange={(ev) => setStock(ev.target.value)}/>
						</div>
						<div className="form-group">
								<label htmlFor="product-price">Product brand</label>
								<input type="text" onChange={(ev) => setBrand(ev.target.value)}/>
						</div>
						<div className="form-group">
								<label htmlFor="product-price">Product warranty</label>
								<input type="text" onChange={(ev) => setWarranty(ev.target.value)}/>
						</div>
						<div className="form-group">
								<label htmlFor="product-price">Product developer</label>
								<input type="text" onChange={(ev) => setDeveloper(ev.target.value)}/>
						</div>
						<div className="form-group">
								<label htmlFor="product-price">Product publisher</label>
								<input type="text" onChange={(ev) => setPublisher(ev.target.value)}/>
						</div>
						<div className="form-group">
								<label htmlFor="product-price">Menu language</label>
								<input type="text" onChange={(ev) => setMenuLang(ev.target.value)}/>
						</div>
						<div className="form-group">
								<label htmlFor="product-price">Spoken language</label>
								<input type="text" onChange={(ev) => setSpokenLang(ev.target.value)}/>
						</div>
						<div className="form-group">
								<label htmlFor="product-price">PEGI Age</label>
								<input type="text" onChange={(ev) => setPEGIAge(ev.target.value)}/>
						</div>
						<div className="form-group">
								<label htmlFor="product-price">PEGI Content</label>
								<input type="text" onChange={(ev) => setPEGIContent(ev.target.value)}/>
						</div>

						<div className="form-group">
								<label htmlFor="">images</label>
								<input type="file" id="multi" multiple onChange={fileSelectedHandler}/>
						</div>
						<button type="submit" className="btn btn-success">Create</button>
				</form>
		)
}

export default ProductForm;