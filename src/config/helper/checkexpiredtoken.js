import axios from 'axios';
import * as constants from '../../constants'

export const checkExpiredTokenAdmin = async(expired) => {
    var array = [];
    var token = '';
    var statusExp = false;

    const response = await axios.get(`${constants.base_url}/auth/get-time-server`);
    if(expired * 1000 <= response.data.time) {
        const refreshtoken = await axios.get(`${constants.base_url}/auth/token`);
        token = refreshtoken.data.token;
        statusExp = true;
    }

    array = [
        {
            status_expired : statusExp,
            data_token : token,
            tgl_exp : expired
        }
    ];

    return array;
}

export const checkExpiredTokenCustomer = async(expired) => {
    var array = [];
    var token = '';
    var statusExp = false;

    const response = await axios.get(`${constants.base_url}/auth/get-time-server`);
    if(expired * 1000 <= response.data.time) {
        const refreshtoken = await axios.get(`${constants.base_url}/auth/token`);
        token = refreshtoken.data.token;
        statusExp = true;
    }

    array = [
        {
            status_expired : statusExp,
            data_token : token,
            tgl_exp : expired
        }
    ];

    return array;
}

