export const getApiUrl = () => {
  const apiPrefix = '/api';
  return process.env.NODE_ENV == 'development'
    ? process.env.NEXT_PUBLIC_DEV_API_URL! + apiPrefix
    : process.env.NEXT_PUBLIC_PROD_API_URL! + apiPrefix;
};

export const getCloudinaryUrl = () => {
  return `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
};
