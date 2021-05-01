import http from '../http/http'
export const login = async (data) => {
    try {
        let { result: res, jqXHR } = await http({
            url: '/api/users/login',
            data,
            type: 'post'
        })
        return {
            res,
            jqXHR
        }
    } catch (err) {
        console.log(err);
    }
}
