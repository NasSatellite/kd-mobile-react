export const getApiUrl = () => {
  const apiPrefix = '/api';
  console.log(process.env.REACT_APP_DEV_API_URL!);
  return process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL! + apiPrefix
    : process.env.REACT_APP_PROD_API_URL! + apiPrefix;
};

export const getCloudinaryUrl = () => {
  return `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
};
