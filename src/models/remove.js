import http from '../http/http'

export const removeModel = async ({ url, id }) => {
    try {
        let { result } = await http({
            url,
            type: 'delete',
            data: { id }
        })
        return result
    } catch (err) {
        console.log(err);
    }
}