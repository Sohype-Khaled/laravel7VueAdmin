import ApiService from '@/js/services/api.service';

export default {
    async getRoles(filters) {
        return await ApiService.get('/api/v1/admin/roles?' + filters);
    },
    async getRole(id) {
        return await ApiService.get('/api/v1/admin/roles/' + id);
    },
    async createRole(form) {
        return await ApiService.post('/api/v1/admin/roles', form);
    },
    updateRole(id, form) {
        return ApiService.put('/api/v1/admin/roles/' + id, form);
    },
    async deleteRole(role) {
        return await ApiService.delete('/api/v1/admin/roles/' + role);
    },
};
