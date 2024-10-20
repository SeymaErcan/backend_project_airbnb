import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpotById, updateSpot } from '../../store/spot';
import './EditSpotForm.css'

function EditSpotFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { spotId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const currSpot = useSelector((state) => state.spot)
    console.log(currSpot)

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getSpotById(spotId)).then(() => setIsLoaded(true));
    }, [dispatch, spotId])

    const [address, setAddress] = useState(currSpot.address);
    const [city, setCity] = useState(currSpot.city);
    const [state, setState] = useState(currSpot.state);
    const [country, setCountry] = useState(currSpot.country);
    const [lat, setLat] = useState(currSpot.lat);
    const [lng, setLng] = useState(currSpot.lng);
    const [name, setName] = useState(currSpot.name);
    const [description, setDescription] = useState(currSpot.description);
    const [price, setPrice] = useState(currSpot.price);
    const [previewImgUrl, setPreviewImgUrl] = useState(currSpot.SpotImages[0].url);
    const [img1Url, setImg1Url] = useState(currSpot.SpotImages[1].url);
    const [img2Url, setImg2Url] = useState(currSpot.SpotImages[2].url);
    const [img3Url, setImg3Url] = useState(currSpot.SpotImages[3].url);
    const [img4Url, setImg4Url] = useState(currSpot.SpotImages[4].url);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currSpot) {
            setName(currSpot.name || '');
            setAddress(currSpot.address || '');
            setCity(currSpot.city || '');
            setState(currSpot.state || '');
            setCountry(currSpot.country || '');
            setLat(currSpot.lat || '');
            setLng(currSpot.lng || '');
            setDescription(currSpot.description || '');
            setPrice(currSpot.price || '');
        }
    }, [currSpot]);

    if (sessionUser) return <Navigate to="/spots/new" replace={true} />

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sessionUser) {
            setErrors({});

            const editedSpot = {
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            }
            //console.log(editedSpot)

            dispatch(
                updateSpot(currSpot.id, editedSpot)
            ).then(spot => {
                navigate(`/spots/${spot.id}`)
            })
                .then(spot => {
                    dispatch(postSpotImage({ spotId: spot.id, url: previewImgUrl, preview: true }))
                    return spot.id
                })
                .then((id) => {
                    dispatch(postSpotImage({ spotId: id, url: img1Url, preview: false }))
                    return id;
                })
                .then((id) => {
                    dispatch(postSpotImage({ spotId: id, url: img2Url, preview: false }))
                    return id;
                })
                .then((id) => {
                    dispatch(postSpotImage({ spotId: id, url: img3Url, preview: false }))
                    return id;
                })
                .then((id) => {
                    dispatch(postSpotImage({ spotId: id, url: img4Url, preview: false }))
                    navigate(`/spots/${id}`)
                    return id;
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.errors) {
                        setErrors(data.errors);
                    }

                });
        }
    };
    return (
        <>
            {isLoaded &&
                <div className='create-spot-container'>
                    <h1>Edit your spot</h1>
                    <h2>Location of your spot</h2>
                    <h3>The open address of your location will be shared once booked.</h3>
                    <form onSubmit={handleSubmit} className='create-spot-form'>
                        <label>Country
                            <input
                                placeholder="Country"
                                className='form-input'
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label>
                        {errors.country && <p>{errors.country}</p>}
                        <label>Street Address
                            <input

                                className='form-input'
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </label>
                        {errors.address && <p>{errors.address}</p>}
                        <label>City
                            <input
                                className='form-input'
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </label>
                        {errors.state && <p>{errors.state}</p>}
                        <label>Latitude
                            <input
                                className='form-input'
                                type="text"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                            />
                        </label>
                        {errors.lat && <p>{errors.lat}</p>}
                        <label>Longtitude
                            <input
                                className='form-input'
                                type="text"
                                value={lng}
                                onChange={(e) => setLng(e.target.value)}
                            />
                        </label>
                        {errors.lng && <p>{errors.lng}</p>}

                        <hr />

                        <h2>Describe your place</h2>
                        <h3>Tell what makes your place special</h3>
                        <textarea
                            placeholder='Minimum 30 characters'
                            className='form-input'
                            type='text'
                            rows='8'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <p>{errors.description}</p>}

                        <hr />

                        <h2>The name of your spot</h2>
                        <h3>The name of your spot makes your spot stands out</h3>
                        <input
                            className='form-input'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p>{errors.name}</p>}

                        <hr />

                        <h2>Base price for your spot</h2>
                        <h3>Right pricing helps your spot stands out</h3>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}> $
                            <input
                                className='form-input'
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                style={{
                                    marginLeft: '5px'
                                }}
                            />
                        </label>
                        {errors.price && <p>{errors.rpice}</p>}

                        <hr />

                        <h2>Liven up your spot with photos</h2>
                        <h3>Submit a link to at least one photo to publish your spot.</h3>
                        <div className='image-url-input'>
                            <input
                                className='form-input'
                                type="url"
                                value={previewImgUrl}
                                onChange={(e) => setPreviewImgUrl(e.target.value)}
                            />
                            <input
                                placeholder='Image URL'
                                className='form-input'
                                type="url"
                                value={img1Url}
                                onChange={(e) => setImg1Url(e.target.value)}
                            />
                            <input
                                placeholder='Image URL'
                                className='form-input'
                                type="url"
                                value={img2Url}
                                onChange={(e) => setImg2Url(e.target.value)}
                            />
                            <input
                                placeholder='Image URL'
                                className='form-input'
                                type="url"
                                value={img3Url}
                                onChange={(e) => setImg3Url(e.target.value)}
                            />
                            <input
                                placeholder='Image URL'
                                className='form-input'
                                type="url"
                                value={img4Url}
                                onChange={(e) => setImg4Url(e.target.value)}
                            />
                        </div>
                        <hr />
                        <div className='create-spot-button-section'>
                            <button type="submit" id='create-spot-button'>Update Spot</button>
                        </div>
                    </form>
                </div>}
        </>
    );
}

export default EditSpotFormPage;