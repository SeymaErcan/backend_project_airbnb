import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot, postSpotImage } from '../../store/spot';
import './CreateSpotForm.css';

function CreateSpotFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [previewImgUrl, setPreviewImgUrl] = useState("");
    const [img1Url, setImg1Url] = useState("");
    const [img2Url, setImg2Url] = useState("");
    const [img3Url, setImg3Url] = useState("");
    const [img4Url, setImg4Url] = useState("");
    const [errors, setErrors] = useState({});

    if (!sessionUser) return <Navigate to="/" replace={true} />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        };

        try {
            const spot = await dispatch(createSpot(newSpot)).unwrap();

            const imageUploads = [
                dispatch(postSpotImage({ spotId: spot.id, url: previewImgUrl, preview: true })),
                img1Url && dispatch(postSpotImage({ spotId: spot.id, url: img1Url, preview: false })),
                img2Url && dispatch(postSpotImage({ spotId: spot.id, url: img2Url, preview: false })),
                img3Url && dispatch(postSpotImage({ spotId: spot.id, url: img3Url, preview: false })),
                img4Url && dispatch(postSpotImage({ spotId: spot.id, url: img4Url, preview: false })),
            ].filter(Boolean); // Filter out any null or undefined values

            await Promise.all(imageUploads);
            navigate(`/spots/${spot.id}`);
        } catch (res) {
            const data = await res.json();
            if (data?.errors) {
                setErrors(data.errors);
            }
        }
    };

    return (
        <div className='create-spot-container'>
            <h1>Create a new Spot</h1>
            <h2>Where's your place located?</h2>
            <h3>The open address of your location will only be shared once booked.</h3>
            <form onSubmit={handleSubmit} className='create-spot-form'>
                {/* Country */}
                <label>Country
                    <input
                        placeholder='Country'
                        className='form-input'
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                {errors.country && <p>{errors.country}</p>}
                {/* Address */}
                <label>Street Address
                    <input
                        placeholder='Address'
                        className='form-input'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                {errors.address && <p>{errors.address}</p>}
                {/* City */}
                <label>City
                    <input
                        placeholder='City'
                        className='form-input'
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                {errors.city && <p>{errors.city}</p>}
                {/* State */}
                <label>State
                    <input
                        placeholder='State'
                        className='form-input'
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                {errors.state && <p>{errors.state}</p>}
                {/* Latitude */}
                <label>Latitude
                    <input
                        placeholder='Latitude'
                        className='form-input'
                        type='text'
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                {errors.lat && <p>{errors.lat}</p>}
                {/* Longitude */}
                <label>Longitude
                    <input
                        placeholder='Longitude'
                        className='form-input'
                        type='text'
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </label>
                {errors.lng && <p>{errors.lng}</p>}

                <hr />
                {/* Description */}
                <h2>Describe your place</h2>
                <h3>Tell what makes your place special</h3>
                <textarea
                    placeholder='Minimum 30 characters'
                    className='form-input'
                    type='text'
                    rows='8'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p>{errors.description}</p>}
                <hr />
                {/* Spot Name */}
                <h2>The name of your spot</h2>
                <h3>The name of your spot makes your spot stand out</h3>
                <input
                    placeholder='The title of your spot'
                    className='form-input'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p>{errors.name}</p>}
                <hr />
                {/* Price */}
                <h2>Base price for your spot</h2>
                <h3>Right pricing helps your spot stand out</h3>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    $
                    <input
                        placeholder='Price per night in USD'
                        className='form-input'
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={{ marginLeft: '5px' }}
                    />
                </label>
                {errors.price && <p>{errors.price}</p>}
                <hr />
                {/* Images */}
                <h2>Share the photos of your spot</h2>
                <h3>Please submit at least one photo of your spot</h3>
                <div className='image-url-input'>
                    <input
                        placeholder='Preview image url'
                        className='form-input'
                        type="url"
                        value={previewImgUrl}
                        onChange={(e) => setPreviewImgUrl(e.target.value)}
                    />
                    <input
                        placeholder='image url'
                        className='form-input'
                        type='url'
                        value={img1Url}
                        onChange={(e) => setImg1Url(e.target.value)}
                    />
                    <input
                        placeholder='image url'
                        className='form-input'
                        type='url'
                        value={img2Url}
                        onChange={(e) => setImg2Url(e.target.value)}
                    />
                    <input
                        placeholder='image url'
                        className='form-input'
                        type='url'
                        value={img3Url}
                        onChange={(e) => setImg3Url(e.target.value)}
                    />
                    <input
                        placeholder='image url'
                        className='form-input'
                        type='url'
                        value={img4Url}
                        onChange={(e) => setImg4Url(e.target.value)}
                    />
                </div>
                <hr />
                {/* Submit Button */}
                <div className='create-spot-button-section'>
                    <button type="submit" id='create-spot-button'>Create a Spot</button>
                </div>
            </form>
        </div>
    );
}

export default CreateSpotFormPage;
