import http from '../http/http'

export const positionsList = async () => {
    try {
        let { result } = await http({
            url: '/api/positions'
        })
        return result
    } catch (err) {
        console.log(err);
    }
}