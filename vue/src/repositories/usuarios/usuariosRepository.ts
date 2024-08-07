import axiosService from "../../services/http/axiosService";
import IUsuario from "../../types/usuarios/IUsuario";

export class UsuariosRepository {
    static async get(id: number): Promise<IUsuario> {
        const { data } = await axiosService.get(`usuario/${id}`);
        return data.data;
    }

    static async getAll(): Promise<IUsuario[]> {
        const { data } = await axiosService.get(`usuario`);
        return data.data;
    }
}