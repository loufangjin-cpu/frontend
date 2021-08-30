import http from '../http/http'

export const userList = async () => {
    try {
        let { result } = await http({
          url: '/api/users/list'
        })
        return result
    } catch (err) {
        console.log(err);
    }
}
