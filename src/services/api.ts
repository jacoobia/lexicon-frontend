import axios from 'axios';
import { item } from '../helpers/item';

export interface ApiResponse {
    success: boolean;
    data?: item[];
    error?: object;
}

export const post = async(url: string, params?: object): Promise<ApiResponse> => {
    try {
        const { data } = await axios.post(url, params);
        return { success: data.success, data: data.data };
    } catch(err: any) {
        return { success: false, error: { type: 'error', message: err.message } };
    }
}

export const get = async(url: string, params?: object): Promise<ApiResponse> => {
    try {
        const { data } = await axios.get(url, { params: params });
        return { success: data.success, data: data.data };
    } catch(err: any) {
        return { success: false, error: { type: 'error', message: err.message } };
    }
}