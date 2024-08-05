export const getUploadDirectory = (url: string) => {
    const BASE_UPLOAD_PATH = 'uploads/';
    if(url.includes('posts')) 
        return BASE_UPLOAD_PATH + 'posts/';
    
    if(url.includes('users')) 
        return BASE_UPLOAD_PATH + 'users/';

    return BASE_UPLOAD_PATH;
}