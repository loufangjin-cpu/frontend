import http from '../http/http'

export const addUsers = async (data) => {
    try {
        let { result } = await http({
            url: '/api/users',
            data,
            type: 'post'
        })
        return result
    } catch (err) {
        console.log(err);
    }
}
