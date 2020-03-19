import ApiService from '@/js/services/api.service';

export default {
    async getRoles(filters) {
        return await ApiService.get('/api/v1/admin/roles?' + filters);
    },
    async deleteRole(role) {
        return await ApiService.delete('/api/v1/admin/roles/' + role);
    }
};
