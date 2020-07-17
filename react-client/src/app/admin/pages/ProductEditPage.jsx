import React, {Fragment, useEffect, useState} from 'react';
import { useApi } from '../../services';
import { useParams } from 'react-router-dom';

const ProductEditPage = () => {
		const { id } = useParams();

		const { findProduct, product, updateProduct } = useApi();

		const [name, setName] = useState('')
		const [desc, setDesc] = useState('')
		const [price, setPrice] = useState(0.0)
		const [rDate, setRDate] = useState(0)
		const [stock, setStock] = useState(0)
		const [brand, setBrand] = useState('')
		const [warranty, setWarranty] = useState('')
		const [developer, setDeveloper] = useState('')
		const [publisher, setPublisher] = useState('')
		const [menuLang, setMenuLang] = useState('')
		const [spokenLang, setSpokenLang] = useState('')
		const [PEGIAge, setPEGIAge] = useState('')
		const [PEGIContent, setPEGIContent] = useState('')
		const [images, setImages] = useState()

		useEffect(() => {
				const getProduct = async () => {
						await findProduct(id);
				}

				getProduct();
		}, [])

		useEffect(() => {
				if (product) {
						setName(product.title);
						setDesc(product.description);
						setPrice(product.price);
						setRDate(product.releaseDate);
						setStock(product.amountBought);
						setBrand(product.specifications.brand);
						setWarranty(product.specifications.warranty);
						setDeveloper(product.specifications.developer);
						setPublisher(product.specifications.publisher);
						setMenuLang(product.specifications.menuLanguage);
						setSpokenLang(product.specifications.spokenLanguage);
						setPEGIAge(product.specifications.PEGIage);
						setPEGIContent(product.specifications.PEGIcontent);
						setImages(product.images);
				}
		}, [product])

		const handleUpdate = async (ev) => {
				ev.preventDefault();

				const updatedProduct = {
						title: name,
						description: desc,
						price: price,
						releaseDate: rDate,
						stock: stock,
						specifications: {
								brand,
								warranty,
								developer,
								publisher,
								menuLanguage: menuLang,
								spokenLanguage: spokenLang,
								PEGIage: PEGIAge,
								PEGIcontent: PEGIContent,
						}
				}

				console.log(updatedProduct);

				await updateProduct(id, updatedProduct);
		}

		return (
				<div className="container-fluid my-3">
						<div className="row">
								<div className="col-12">
										{
												(product)? (
														<form className="form" onSubmit={handleUpdate}>
																<div className="form-group">
																		<label htmlFor="product-name">Product name</label>
																		<input
																				type="text"
																				value={name}
																				onChange={(ev) => setName(ev.target.value)}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-desc">Product description</label>
																		<input
																				type="text"
																				value={desc}
																				onChange={(ev) => setDesc(ev.target.value)}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-price">Product price</label>
																		<input
																				type="text"
																				value={price}
																				onChange={(ev) => setPrice(parseInt(ev.target.value,10 ))}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-price">Product release date</label>
																		<input
																				type="text"
																				value={rDate}
																				onChange={(ev) => setRDate(parseInt(ev.target.value,10))}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-price">Product stock</label>
																		<input
																				type="text"
																				value={stock}
																				onChange={(ev) => setStock(parseInt(ev.target.value,10))}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-price">Product brand</label>
																		<input
																				type="text"
																				value={brand}
																				onChange={(ev) => setBrand(ev.target.value)}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-price">Product warranty</label>
																		<input
																				type="text"
																				value={warranty}
																				onChange={(ev) => setWarranty(ev.target.value)}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-price">Product developer</label>
																		<input
																				type="text"
																				value={developer}
																				onChange={(ev) => setDeveloper(ev.target.value)}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-price">Product publisher</label>
																		<input
																				type="text"
																				value={publisher}
																				onChange={(ev) => setPublisher(ev.target.value)}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-price">Menu language</label>
																		<input
																				type="text"
																				value={menuLang}
																				onChange={(ev) => setMenuLang(ev.target.value)}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-price">Spoken language</label>
																		<input
																				type="text"
																				value={spokenLang}
																				onChange={(ev) => setSpokenLang(ev.target.value)}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-price">PEGI Age</label>
																		<input
																				type="text"
																				value={PEGIAge}
																				onChange={(ev) => setPEGIAge(ev.target.value)}
																		/>
																</div>
																<div className="form-group">
																		<label htmlFor="product-price">PEGI Content</label>
																		<input
																				type="text"
																				value={PEGIContent}
																				onChange={(ev) => setPEGIContent(ev.target.value)}
																		/>
																</div>
																{
																		(product.images)? (
																				product.images.map((image) => {
																						return (
																								<img src={image} alt="image"/>
																								)
																						
																				})
																		) : <Fragment/>
																}
																<div className="form-group">
																		<input type="file" id="multi" multiple/>
																</div>
																<button type="submit" className="btn btn-success">Update</button>
														</form>
												): <Fragment/>
										}
								</div>
						</div>
				</div>
		)
};

export default ProductEditPage;