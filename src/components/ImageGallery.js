import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';

import InfiniteScroll from 'react-infinite-scroll-component';

const ImageGallery = () => {
    const [images, setImages] = useState([])


    // 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // infinite scrollbar
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalIsOpen(false);
    };
    // Fetch images from your API
    const fetchImages = async () => {
        try {
            const response = await fetch('https://api.unsplash.com/photos/random?count=1000&client_id=J5F8FPof5K2U8Hg7bZFk3AVqRghu5bwjzywr3JeOP9Q');
            const data = await response.json();
            setImages(data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };
    useEffect(() => {


        fetchImages();
    }, []);
    console.log(images);
    return (
        <>

            <div className="app">
                <h1>Image Gallery</h1>
                <InfiniteScroll
                    dataLength={images.length}
                    next={fetchImages}
                    hasMore={hasMore}
                    endMessage={<p>No More Images to Load</p>}
                >

                    <div className="image-grid">
                        {images.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.urls.regular} alt={image.alt_description} onClick={() => openModal(image)} />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>

            </div>
            {/*  */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="overlay"
            >
                {selectedImage && (
                    <>
                        <img src={selectedImage.urls.regular} alt="images" />
                        {/* <div className="image-details">
                            <h2>{selectedImage.alt_description}</h2>
                            Add additional details here
                        </div> */}
                        <button onClick={closeModal}>Close</button>
                    </>
                )}
            </Modal>
        </>
    )
}

export default ImageGallery