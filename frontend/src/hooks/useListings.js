import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
import endpoints from '../lib/endpoints';

const fetchProperties = async () => {
  const { data } = await axiosInstance.get(endpoints.properties);
  return data;
};

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });
};

const fetchPropertyById = async (id) => {
  if (!id) throw new Error('Property ID is required');
  const { data } = await axiosInstance.get(endpoints.propertyById(id));
  return data;
};

export const usePropertyById = (id) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchPropertyById(id),
    enabled: !!id,
  });
};
