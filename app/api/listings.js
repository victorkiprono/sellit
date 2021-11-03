import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const uid = firebase.auth().currentUser.uid;

import client from './client';

const database = firebase.database();

 
const endpoint = '/listings';
const users = '/users';

const writeUserData = async (userId=uid, listing, onUploadProgress) => {
    await firebase.database().ref(users + userId).set({
      title:listing.title,
      price:listing.price,
      categoryId:listing.category.value,
      description:listing.description,
      images: listing.images,
      location:JSON.stringify(listing.location),
      profile_picture : imageUrl
    });
};

const addListing = (listing,onUploadProgress) => {
    const data = new FormData();
    data.append('title',listing.title);
    data.append('price',listing.price);
    data.append('categoryId',listing.category.value);
    data.append('description',listing.description);

    listing.images.forEach((image,index) => {
        data.append('images',{
            name:'image' + index,
            type:'image/jpeg',
            uri:image
        })        
    });
    if(listing.location)
        data.append('location',JSON.stringify(listing.location));
    return client.post(endpoint,data,{
        onUploadProgress:progress => 
            onUploadProgress(progress.loaded / progress.total)
    });
}

const getListings = () => {
    return client.get(endpoint);
};

export default { 
    getListings,
    addListing,
    writeUserData,
};