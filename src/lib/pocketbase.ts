import PocketBase from 'pocketbase';

// Default to localhost for development if no URL is provided
const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090';

export const pb = new PocketBase(pocketbaseUrl);

// Add health check endpoint for Render
pb.health = async () => {
  try {
    await pb.health.check();
    return { status: 'healthy' };
  } catch (error) {
    return { status: 'unhealthy', error };
  }
};

export const getCurrentUser = () => {
  return pb.authStore.model;
};

export const isAuthenticated = () => {
  return pb.authStore.isValid;
};