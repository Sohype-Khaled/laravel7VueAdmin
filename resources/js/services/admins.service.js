import ApiService from '@/js/services/api.service';

export default {
    async getAdmins(filters) {
        return  await ApiService.get('/api/v1/admin/admins?'+filters);
    },
    async deleteAdmin(admin) {
        return await ApiService.delete('/api/v1/admin/admins/' + admin);
    }
};
